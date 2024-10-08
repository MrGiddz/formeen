"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  error: Error;
};

function ErrorPage({ error }: Props) {
  return (
    <div className="flex flex-col gap-y-4 w-full h-full items-center justify-center">
      <h2 className=" text-destructive text-base">Something went wrong</h2>
      <Button asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
