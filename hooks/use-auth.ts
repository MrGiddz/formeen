import { User, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";

// interface AuthProps {
//   name: string | null | undefined;
//   firstname: string | null | undefined;
//   lastname: string | null | undefined;
//   email: string | null | undefined;
//   image: string | null | undefined;
//   id: string | null | undefined;
//   role: string | null | undefined;
// }

interface AuthProps {
  user: {
    role: UserRole;
  } & DefaultSession["user"] &
    User;
}

export const useAuth = (): AuthProps["user"] | null => {
  const session = useSession({ required: true });
  if (session.data) return session.data.user;
  return null;
};
