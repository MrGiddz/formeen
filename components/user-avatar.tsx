"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { AvatarIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { string } from "zod";

interface UserAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  forAuth: boolean;
  title?: string;
}

export const UserAvatar = React.forwardRef<HTMLSpanElement, UserAvatarProps>(
  ({ className, src, alt, forAuth, title, ...props }, ref) => {
    const [fallback, setFallback] = useState<
      null | string | React.ReactElement
    >(null);
    const user = useAuth();

    useEffect(() => {
      if (forAuth) {
        if (user) {
          const { firstname, lastname } = user;
          if (firstname && lastname)
            setFallback(`${firstname[0]}${lastname[0]}`);
        }
      } else {
        if (title) {
          const splittedTitle = title.split(" ");
          if (splittedTitle.length > 1) {
            setFallback(`${splittedTitle[0][0]}${splittedTitle[1][0]}`);
          } else {
            setFallback(`${splittedTitle[0]}${splittedTitle[1]}`);
          }
        }
      }
    }, [user, forAuth, title]);

    useEffect(() => {
      console.log({ fallback });
    }, [fallback]);

    return (
      <Avatar
        className={cn("h-5 w-5 md:h-10 md:w-10 pointer-events-auto", className)}
        {...props}
      >
        <AvatarImage
          width={3000}
          height={3000}
          src={""}
          alt={alt}
          className="pointer-events-auto"
        />
        <AvatarFallback className="text-white bg-primary text-sm md:text-base pointer-events-auto">
          <AvatarIcon className="w-5 h-5 text-happi-blue" />
        </AvatarFallback>
      </Avatar>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
