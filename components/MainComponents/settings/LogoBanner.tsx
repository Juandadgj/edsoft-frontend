import { ContainerComponents } from "@/components/ContainerComponents";
import React, { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Check, Upload, X } from "lucide-react";

interface InstitutionSettings {
  logo: string | null;
  banner: string;
}

export const LogoBanner = () => {
  const [settings, setSettings] = useState<InstitutionSettings>({
    logo: null,
    banner: "Bienvenido a nuestra institución educativa",
  });
  const [image, setImage] = useState<string>("");
  const [tempLogo, setTempLogo] = useState<string | null>(settings.logo);
  const [tempBanner, setTempBanner] = useState(settings.banner);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado - reemplazar con API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSettings({
      logo: tempLogo,
      banner: tempBanner,
    });
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setTempLogo(settings.logo);
    setTempBanner(settings.banner);
    setIsEditing(false);
  };
  const handleRemoveLogo = () => {
    setTempLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">Logo y banner</strong>
        </h3>
      </div>
      <div>
        <div className="flex flex-row items-center justify-between">
          {/* <div>
            <CardTitle>Editar Logo y Banner</CardTitle>
            <CardDescription>
              Personaliza la identidad de tu institución
            </CardDescription>
          </div> */}
          {/* {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Editar
            </Button>
          )} */}
        </div>
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Logo de la Institución
            </label>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 bg-transparent rounded-btn hover:bg-transparent"
                  variant={"outline"}
                >
                  <Upload className="h-4 w-4" />
                  Cambiar Logo
                </Button>
                {tempLogo && (
                  <Button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-destructive bg-transparent rounded-btn hover:bg-transparent"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {tempLogo && (
                <div className="rounded-box border border-border p-4">
                  <img
                    src={tempLogo || "/placeholder.svg"}
                    alt="Vista previa del logo"
                    className="h-24 w-24 rounded object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
              </p>
            </div>
          </div>

          {/* Banner Text */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Banner Descriptivo
            </label>
            <textarea
              maxLength={500}
              value={tempBanner}
              onChange={(e) => setTempBanner(e.target.value)}
              className="min-h-24 resize-none w-full"
            />
            <p className="text-xs text-muted-foreground">
              {tempBanner.length}/500 caracteres
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6">
            {/* <Button onClick={handleCancel} variant={"outline"}>Cancelar</Button> */}
            <Button onClick={handleSave} disabled={isSaving} className="gap-2 hover:bg-transparent" variant={"outline"}>
              <Check className="h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>
      </div>
    </ContainerComponents>
  );
};
