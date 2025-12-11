import Layaout from "@/components/Layaout";
import { SecurityCopy } from "@/components/MainComponents/settings/SecurityCopy";
import React from "react";

function SecurityCopyPage() {
  return (
    <Layaout textpage="Copias de seguridad">
      <SecurityCopy />
    </Layaout>
  );
}

export default SecurityCopyPage;
