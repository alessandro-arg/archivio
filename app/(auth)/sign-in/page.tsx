import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type="sign-in" />
    </Suspense>
  );
};

export default SignIn;
