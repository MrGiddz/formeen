"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const SignUpButton = ({ children, mode, asChild }: LoginButtonProps) => {
    const router = useRouter();


  const onClick = () => {
    router.push("/auth/sign-in")
  };

  if(mode === "modal") {
    console.log("TODO: IMPLEMEMENT MODAL"); 

    return <span>TODO: IMPLEMEMENT MODAL</span>
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default SignUpButton;
