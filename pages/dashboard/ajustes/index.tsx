import Layaout from "@/components/Layaout";
import { SettingsList } from "@/components/MainComponents/settings/Settings";
import React, { useState } from "react";

function Settings() {
  return (
    <Layaout textpage="Ajustes">
      <SettingsList />
    </Layaout>
  );
}

export default Settings;
