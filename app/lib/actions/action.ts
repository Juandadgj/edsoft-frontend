"use server";

import serverApi from "../api/server-api";
import { Auth } from "@/app/types";
import { createSession } from "../session/session";

export async function login(input: {
  user: string;
  password: string;
  id_institution: number;
}) {
  const { user, password, id_institution } = input;
  try {
    const data = await serverApi.post<Auth>("/users/login", {
      user,
      password,
      id_institution,
    });
    await createSession({
      token: data.token!,
      role: data.role!,
    });
    return {
      status: 200,
      message: "Sesión iniciada correctamente.",
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return {
      status: 500,
      message: "Error al iniciar sesión.",
    };
  }
}
