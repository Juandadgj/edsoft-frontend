'use client';

import { useState, useActionState } from 'react';
import { Eye, EyeOff, Check, X, Shield } from 'lucide-react';
import { ContainerComponents } from '@/app/components/shared/container';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { PASSWORD_REQUIREMENTS, PASSWORD_REQUIREMENT_LABELS } from './constants';
import { changePasswordAction } from './actions';

interface PasswordFormProps {
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

export function PasswordForm({ 
  revalidatePath = '/dashboard/ajustes/contrasena',
}: PasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);

  // Validar requisitos en tiempo real
  const checkRequirement = (req: string): boolean => {
    switch (req) {
      case 'minLength':
        return newPassword.length >= PASSWORD_REQUIREMENTS.minLength;
      case 'uppercase':
        return /[A-Z]/.test(newPassword);
      case 'lowercase':
        return /[a-z]/.test(newPassword);
      case 'number':
        return /\d/.test(newPassword);
      default:
        return false;
    }
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const allRequirementsMet = PASSWORD_REQUIREMENT_LABELS.every(req => checkRequirement(req.id));
  const isFormValid = currentPassword && newPassword && confirmPassword && passwordsMatch && allRequirementsMet;

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">
            Cambiar Contraseña
          </strong>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <Card className="rounded-box">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Nueva Contraseña
            </CardTitle>
            <CardDescription>
              Ingresa tu contraseña actual y la nueva contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="revalidatePath" value={revalidatePath} />
              <input type="hidden" name="currentPassword" value={currentPassword} />
              <input type="hidden" name="newPassword" value={newPassword} />
              <input type="hidden" name="confirmPassword" value={confirmPassword} />

              {/* Contraseña actual */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 pr-10 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Nueva contraseña */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 pr-10 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 pr-10 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-600">Las contraseñas no coinciden</p>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isPending}
                  className="flex-1 bg-main-blue hover:bg-main-blue/90 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {isPending ? 'Cambiando...' : 'Cambiar Contraseña'}
                </Button>
              </div>

              {/* Mensaje de estado */}
              {state.message && (
                <div className={`p-3 rounded-md text-sm ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {state.message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Requisitos */}
        <Card className="rounded-box">
          <CardHeader>
            <CardTitle>Requisitos de Contraseña</CardTitle>
            <CardDescription>
              Tu nueva contraseña debe cumplir con los siguientes requisitos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {PASSWORD_REQUIREMENT_LABELS.map((req) => {
                const isMet = checkRequirement(req.id);
                return (
                  <li 
                    key={req.id} 
                    className={`flex items-center gap-2 text-sm ${isMet ? 'text-green-600' : 'text-muted-foreground'}`}
                  >
                    {isMet ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                    {req.label}
                  </li>
                );
              })}
              <li 
                className={`flex items-center gap-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-muted-foreground'}`}
              >
                {passwordsMatch ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                Las contraseñas coinciden
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ContainerComponents>
  );
}
