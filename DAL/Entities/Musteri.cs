using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Musteri : BaseEntity
    {
        /// <summary>
        /// zorunlu alan
        /// </summary>
        [Required]
        public string Ad { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        [Required]
        public string Soyad { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        [Required]
        public bool Cinsiyet { get; set; }

        /// <summary>
        /// zorunlu alan
        /// </summary>
        [Required]
        public string Meslegi { get; set; }

        /// <summary>
        /// date pickup
        /// </summary>
        public DateTime? DogumTarihi { get; set; }

        /// <summary>
        /// zorunlu alan) (mail validation
        /// </summary>
        [Required]
        [EmailAddress]
        public string MailAdresi { get; set; }

        /// <summary>
        /// domain name validation
        /// </summary>
        [Url]
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