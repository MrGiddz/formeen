"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // some actions before siging out
  await signOut();
};
