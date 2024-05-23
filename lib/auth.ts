// import { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { User, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { z } from "zod";


interface AuthProps {
  user: {
    role: UserRole;
  } & DefaultSession["user"] &
    User;
}

// type CurrentRoleProps = UserRole;

export const currentUser = async (): Promise<AuthProps["user"] | null> => {
  const session = await auth();
  if (session?.user) return session.user;
  return null;
};

// To get role in server components
// export const currentRole = async (): Promise<CurrentRoleProps | null> => {
//   const session = await auth();
//   return session?.user?.role;
// };
