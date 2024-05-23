"use client"

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

const Social = () => {
  const onClick = async (provider: "google") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex flex-col items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full ring-2"
        variant="ghost-outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
