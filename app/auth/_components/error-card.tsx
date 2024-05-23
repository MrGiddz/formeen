
import CardWrapper from "./auth-card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerTitle="Error"
      headerLabel="Oops!! Something went wrong"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center ">
        <ExclamationTriangleIcon className=" text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
