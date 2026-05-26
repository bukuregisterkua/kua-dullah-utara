export interface Penyuluh {
  id: string;
  name: string;
  nip: string;
  pangkat: string;
  jabatan: string;
  tempat: string;
  kua: string;
  avatar: string;
  contact: string;
  schedule: string;
  specialty: string;
  phone?: string;
  photo?: string;
  fallbackPhoto?: string;
  role?: string;
  gender?: "male" | "female";
}

export interface GuestBookEntry {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  purpose: string;
  message: string;
}

export interface EvaluationData {
  catinPria: string;
  catinWanita: string;
  phone: string;
  tahun: string;
  kegiatan: string;
  tema: string;
  hariTanggal: string;
  penyuluhId: string;
  ratings: Record<string, string>;
  comments: Record<string, string>;
  sigPria: string;
  sigWanita: string;
  sigPenyuluh: string;
}

export interface Layanan {
  id: string;
  category: "nikah" | "wakaf" | "muallaf" | "penyuluhan" | string;
  type: "info" | "flow" | "link" | "whatsapp" | "youtube" | string;
  icon?: string;
  title: string;
  description?: string;
  content?: string[];
  image?: string;
  url?: string;
}

export interface Pengumuman {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "aktif" | "arsip" | string;
  image?: string;
}

export interface Settings {
  whatsappNumber: string;
  whatsappText: string;
  youtubeNikahUrl?: string;
  youtubeWakafUrl?: string;
  googleFormNikah?: string;
  googleFormRekomendasi?: string;
  googleFormWakaf?: string;
  googleFormMuallaf?: string;
  googleFormBukuTamu?: string;
  googleFormPenyuluhan?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
  address?: string;
  email?: string;
  phone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  kepalaKuaName?: string;
  kepalaKuaImg?: string;
  statistikImg?: string;
  berkasNikahImg?: string;
  alurNikahImg?: string;
  alurProsesNikahImg?: string;
  logoImg?: string;
  secondaryLogoImg?: string;
  heroBgImg?: string;
}

export interface DBState {
  layanan: Layanan[];
  pengumuman: Pengumuman[];
  settings: Settings;
  penyuluh: Penyuluh[];
}
