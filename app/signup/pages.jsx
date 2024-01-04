import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Signup = () => {
  return (
    <>
      <div className="container py-80">
        <div className="m-auto max-w-[500px]">
          <Input palceholder="Enter your anynomous name :)" className="my-10" />
          <Input
            palceholder="We need password to keep you safe..."
            type="password"
          />
          <div className="m-auto my-10">
            <Button>Let&apos;s goo!!!</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
