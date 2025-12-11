import Layaout from "@/components/Layaout";
import { Password } from "@/components/MainComponents/settings/Password";
import React from "react";

function PasswordPage() {
  return (
    <Layaout textpage="Cambiar contraseña">
      <Password />
    </Layaout>
  );
}

export default PasswordPage;
