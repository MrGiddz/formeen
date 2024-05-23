import { UserButton } from "@/components/user-button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/75 to-white/55 dark:from-slate-900 dark:to-gray-950 w-full h-full overflow-hidden flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
