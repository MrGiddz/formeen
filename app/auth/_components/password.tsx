import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type PasswordProps = {
  isPending: boolean;
  field: {};
};

const Password = ({ isPending, field }: PasswordProps) => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  return (
    <div className="group relative">
      <div className="flex items-center justify-center pr-3 rounded-md space-x-2 shadow-sm border border-input focus-within:border-primary focus-within:rounded-e-none focus-within:shadow-sm dark:bg-black dark:outline-none dark:focus-within:border-black">
        <Input
          type={isVisiblePass ? "text" : "password"}
          placeholder="********"
          disabled={isPending}
          {...field}
          className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-ring dark:focus-visible:ring-0 shadow-none"
        />
        {isVisiblePass ? (
          <EyeSlashIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsVisiblePass(!isVisiblePass)}
          />
        ) : (
          <EyeIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsVisiblePass(!isVisiblePass)}
          />
        )}
      </div>
    </div>
  );
};

export default Password;
