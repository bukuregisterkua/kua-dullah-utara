export interface Layanan {
  id: string;
  title: string;
  category: "nikah" | "wakaf" | "muallaf";
  type: "flow" | "info" | "link" | "whatsapp" | "youtube";
  content?: string[];
  image?: string;
  url?: string;
  description?: string;
  icon?: string;
}

export interface Pengumuman {
  id: string;
  title: string;
  date: string;
  content: string;
  status: string;
}

export interface Settings {
  whatsappNumber: string;
  whatsappText: string;
  youtubeNikahUrl: string;
  youtubeWakafUrl: string;
  googleFormNikah: string;
  googleFormRekomendasi: string;
  googleFormWakaf: string;
  googleFormMuallaf: string;
  bannerTitle: string;
  bannerSubtitle: string;
  address: string;
  email: string;
  phone: string;
  berkasNikahImg?: string;
  alurNikahImg?: string;
  berkasWakafImg?: string;
  alurWakafImg?: string;
  alurProsesNikahImg?: string;
  logoImg?: string;
  secondaryLogoImg?: string;
  heroBgImg?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}

export interface DBState {
  layanan: Layanan[];
  pengumuman: Pengumuman[];
  settings: Settings;
}
