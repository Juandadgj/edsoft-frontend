'use client';

import React, { useRef, useState, useActionState } from 'react';
import { Button } from '@/app/components/ui/button';
import { ContainerComponents } from '@/app/components/shared/container';
import { Check, Upload, X } from 'lucide-react';
import { DEFAULT_LOGO_BANNER_SETTINGS, type LogoBannerSettings } from './constants';
import { updateLogoAction, updateBannerAction, removeLogoAction } from './actions';

interface LogoBannerFormProps {
  initialSettings?: LogoBannerSettings;
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

export function LogoBannerForm({ 
  initialSettings = DEFAULT_LOGO_BANNER_SETTINGS,
  revalidatePath = '/dashboard/ajustes/logo-banner',
}: LogoBannerFormProps) {
  const [settings, setSettings] = useState<LogoBannerSettings>(initialSettings);
  const [tempLogo, setTempLogo] = useState<string | null>(settings.logoUrl);
  const [tempBanner, setTempBanner] = useState(settings.bannerText);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [logoState, logoAction, isLogoUpdating] = useActionState(updateLogoAction, initialState);
  const [bannerState, bannerAction, isBannerUpdating] = useActionState(updateBannerAction, initialState);

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

  const handleRemoveLogo = () => {
    setTempLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setSettings({
      logoUrl: tempLogo,
      bannerText: tempBanner,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempLogo(settings.logoUrl);
    setTempBanner(settings.bannerText);
    setIsEditing(false);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">Logo y banner</strong>
        </h3>
      </div>

      <div className="space-y-6">
        {/* Logo Upload Section */}
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
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Cambiar Logo
              </Button>
              {tempLogo && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemoveLogo}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Eliminar
                </Button>
              )}
            </div>

            {/* Logo Preview */}
            {tempLogo && (
              <div className="border border-dashed border-muted-foreground p-4 rounded-lg">
                <img
                  src={tempLogo}
                  alt="Logo preview"
                  className="max-h-32 object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Banner Text Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Texto del Banner
          </label>
          <textarea
            value={tempBanner}
            onChange={(e) => setTempBanner(e.target.value)}
            className="w-full p-3 border border-muted-foreground rounded-md bg-base-100 text-foreground min-h-24"
            placeholder="Ingrese el texto del banner..."
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            {tempBanner.length}/500 caracteres
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLogoUpdating || isBannerUpdating}
            className="bg-main-blue hover:bg-main-blue/90 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>

        {/* Status Messages */}
        {logoState.message && (
          <div className={`p-3 rounded-md ${logoState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {logoState.message}
          </div>
        )}
        {bannerState.message && (
          <div className={`p-3 rounded-md ${bannerState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {bannerState.message}
          </div>
        )}
      </div>
    </ContainerComponents>
  );
}
