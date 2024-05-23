import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
    newUser: "/auth/sign-up",
    verifyRequest: "/auth/verify-request",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // Prevent signin without email verification
      if (!existingUser?.emailVerified) return false;

      // 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // delete existing two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && token.role && session.user) {
        session.user.id = token.sub;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.email = token.email as string;
      }

      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existinUser = await getUserById(token.sub);

      if (!existinUser) return token;

      token.role = existinUser.role;
      token.firstname = existinUser.firstname;
      token.lastname = existinUser.lastname;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
