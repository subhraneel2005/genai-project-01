"use client";

import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";

export enum ActiveModal {
  SIGNUP = "signup",
  SIGNIN = "signin",
}

export default function AuthModals() {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  return (
    <div className="">
      <Signup activeModal={activeModal} setActiveModal={setActiveModal} />
      <Signin activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
}
