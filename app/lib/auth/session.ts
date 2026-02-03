"use server";

import { deleteSession } from "@/app/lib/session/session";
import { redirect } from "next/navigation";



export async function logout() {
  await deleteSession();
  return redirect("/institutions");
}