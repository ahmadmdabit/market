import { MusteriTelefon } from './MusteriTelefon';
export interface Musteri {
  id: number;
  ad: string;
  soyad: string;
  cinsiyet: boolean;
  meslegi: string;
  dogumTarihi?: Date;
  mailAdresi: string;
  webSitesi?: string;
  reklamMailleri: boolean;
  adresBilgisi?: string;
  ilID?: number;
  notlar: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;

  musteriTelefonlar: MusteriTelefon[];
}
