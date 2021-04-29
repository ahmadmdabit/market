using System;

namespace DAL.Entities
{
    public class Musteri : BaseEntity
    {
        /// <summary>
        /// zorunlu alan
        /// </summary>
        public string Ad { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        public string Soyad { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        public bool Cinsiyet { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        public string Meslegi { get; set; }

        /// <summary>
        /// date pickup
        /// </summary>
        public DateTime? DogumTarihi { get; set; }

        /// <summary>
        /// zorunlu alan) (mail validation
        /// </summary>
        public string MailAdresi { get; set; }

        /// <summary>
        /// domain name validation
        /// </summary>
        public string WebSitesi { get; set; }

        /// <summary>
        /// checkbox
        /// </summary>
        public bool ReklamMailleri { get; set; }

        public string AdresBilgisi { get; set; }

        /// <summary>
        /// Select list box
        /// </summary>
        public long? IlID { get; set; }

        /// <summary>
        /// multitext box
        /// </summary>
        public string Notlar { get; set; }

        public virtual Il Il { get; set; }
    }
}