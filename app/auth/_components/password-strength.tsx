"use client";

import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import { BiCheckbox, BiCheckSquare } from "react-icons/bi";
import { cn } from "@/lib/utils";

type PasswordStrengthProps = {
  showSteps: boolean;
  password: string;
  validate: (error: boolean) => void;
};

type PasswordStrength = {
  contains: string[];
  length: number;
  value: string;
  id: number;
};

const PasswordStrength = ({
  showSteps = true,
  password,
  validate,
}: PasswordStrengthProps) => {
  const [passStrength, setPassStrength] = useState<PasswordStrength>({
    length: 0,
    value: "",
    contains: [],
    id: 0,
  });

  useEffect(() => {
    setPassStrength(passwordStrength(password));
  }, [password]);

  useEffect(() => {
    if (passStrength.id < 2) {
      validate(true);
    } else {
      validate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passStrength]);

  if (password === null || password === "") {
    return null;
  }

  return (
    <div className="pb-5">
      {showSteps ? (
        <div className="flex justify-between gap-3 items-center">
          <div className="flex items-center gap-1">
            {Array(passStrength.id + 1)
              .fill(null)
              .map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-14 h-1 rounded-md",
                    passStrength.id === 0 && "bg-rose-600",
                    passStrength.id === 1 && "bg-rose-400",
                    passStrength.id === 2 && "bg-orange-300",
                    passStrength.id === 3 && "bg-green-500"
                  )}
                />
              ))}{" "}
          </div>
          <p
            className={cn(
              "text-xs font-medium",
              passStrength.id === 0 && "text-rose-600",
              passStrength.id === 1 && "text-rose-400",
              passStrength.id === 2 && "text-orange-300",
              passStrength.id === 3 && "text-green-500"
            )}
          >
            {passStrength.value}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          <div className="flex justify-start items-center">
            {passStrength?.length < 6 ? (
              <BiCheckbox className="w-5 h-5 mr-2 text-rose-500" />
            ) : (
              <BiCheckSquare className="w-5 h-5 mr-2 text-green-500" />
            )}
            <p
              className={cn(
                "text-sm font-normal",
                passStrength?.length < 8
                  ? "text-rose-500"
                  : "text-green-500"
              )}
            >
              Password should be a minimum of eight characters
            </p>
          </div>
          <div className="flex justify-start items-center">
            {passStrength?.contains.every((item) => item !== "uppercase") ? (
              <BiCheckbox className="w-5 h-5 mr-2 text-rose-500" />
            ) : (
              <BiCheckSquare className="w-5 h-5 mr-2 text-green-400" />
            )}

            <p
              className={cn(
                "text-sm font-normal",
                passStrength?.contains.every((item) => item !== "uppercase")
                  ? "text-rose-500"
                  : "text-green-500"
              )}
            >
              Password should contain an upper case
            </p>
          </div>
          <div className="flex justify-start items-center">
            {passStrength?.contains.every((item) => item !== "lowercase") ? (
              <BiCheckbox className="w-5 h-5 mr-2 text-rose-500" />
            ) : (
              <BiCheckSquare className="w-5 h-5 mr-2 text-green-500" />
            )}

            <p
              className={cn(
                "text-sm font-normal",
                passStrength?.contains.every((item) => item !== "lowercase")
                  ? "text-rose-500"
                  : "text-green-500"
              )}
            >
              Password should contain a lower case
            </p>
          </div>
          <div className="flex justify-start items-center">
            {passStrength?.contains.every((item) => item !== "number") ? (
              <BiCheckbox className="w-5 h-5 mr-2 text-rose-500" />
            ) : (
              <BiCheckSquare className="w-5 h-5 mr-2 text-green-500" />
            )}
            <p
              className={cn(
                "text-sm font-normal",
                passStrength?.contains.every((item) => item !== "number")
                  ? "text-rose-500"
                  : "text-green-500"
              )}
            >
              Password should contain a number
            </p>
          </div>
          <div className="flex justify-start items-center">
            {passStrength?.contains.every((item) => item !== "symbol") ? (
              <BiCheckbox className="w-5 h-5 mr-2 text-rose-500" />
            ) : (
              <BiCheckSquare className="w-5 h-5 mr-2 text-green-500" />
            )}
            <p
              className={cn(
                "text-sm font-normal",
                passStrength?.contains.every((item) => item !== "symbol")
                  ? "text-rose-500"
                  : "text-green-500"
              )}
            >
              Password should have special character
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
