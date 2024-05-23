import { UserRole, User } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { DefaultSession } from "next-auth";


declare module "next-auth" {

  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"] & User
  }
}


// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";
import { ReactNode } from "react";

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}

export interface SidebarItems {
  links: Array<{
      label: string
      href: string
      icon?: LucideIcon
  }>,
  extras? : ReactNode
}
