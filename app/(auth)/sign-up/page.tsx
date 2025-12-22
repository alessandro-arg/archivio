import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

const SignUp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type="sign-up" />
    </Suspense>
  );
};

export default SignUp;
