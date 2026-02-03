// Tipos para ajustes de logo y banner
export type ActionState = {
  success: boolean;
  message: string;
  data?: unknown;
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/ajustes/logo-banner';

export interface LogoBannerSettings {
  logoUrl: string | null;
  bannerText: string;
}

export const DEFAULT_LOGO_BANNER_SETTINGS: LogoBannerSettings = {
  logoUrl: null,
  bannerText: 'Bienvenido a nuestra institución educativa',
};
