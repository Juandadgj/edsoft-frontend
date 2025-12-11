"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { ContainerComponents } from "@/components/ContainerComponents";
import { Input } from "@/components/Input";

export function Password() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = (): string | null => {
    if (!formData.currentPassword) {
      return "Ingrese la contraseña actual";
    }

    if (!formData.newPassword) {
      return "Ingrese la nueva contraseña";
    }

    if (formData.newPassword.length < 6) {
      return "La nueva contraseña debe tener al menos 6 caracteres";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    if (formData.currentPassword === formData.newPassword) {
      return "La nueva contraseña debe ser diferente a la actual";
    }

    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Simular cambio de contraseña - reemplazar con API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess("Contraseña cambiada exitosamente");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Error al cambiar la contraseña. Intente nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Cambiar contraseña del administrador
          </strong>
        </h3>
      </div>
      {/* Mensaje de éxito */}
      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex gap-3 pt-6">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p className="font-medium text-green-900">{success}</p>
          </CardContent>
        </Card>
      )}
      {/* Mensaje de error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <p className="font-medium text-red-900">{error}</p>
          </CardContent>
        </Card>
      )}
      {/* Formulario de cambio de contraseña */}
      <Card className="border-0 shadow-none py-0">
        <CardContent className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo contraseña actual */}
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Ingrese la contraseña a cambiar
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => handleTogglePassword("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo nueva contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Ingrese la nueva contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => handleTogglePassword("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.newPassword && (
                <p className="text-xs text-gray-600">Mínimo 6 caracteres</p>
              )}
            </div>

            {/* Campo confirmar contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Ingrese nuevamente la contraseña nueva
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => handleTogglePassword("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 justify-center pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 bg-main-blue text-white hover:bg-main-blue/90 font-medium"
              >
                {isLoading ? "Cambiando..." : "Cambiar contraseña"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </ContainerComponents>
  );
}
