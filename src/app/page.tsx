import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <>
      <SignedIn>{redirect("/dashboard")}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
