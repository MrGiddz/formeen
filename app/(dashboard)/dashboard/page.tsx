import { currentUser } from "@/lib/auth";
import { redirectToSignIn } from "@/lib/redirect-to-signin";


export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }
  return (
    <div>
      <h1 className="text-2xl">Home page</h1>
    </div>
  );
}
