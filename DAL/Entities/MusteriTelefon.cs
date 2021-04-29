using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    /// <summary>
    /// çoklu eklenebilir)
    /// </summary>
    public class MusteriTelefon : BaseEntity
    {
        [Required]
        public long MusteriID { get; set; }
        /// <summary>
        /// (Phone no validation
        /// </summary>
        [Required]
        public string Telefon { get; set; }

        public virtual Musteri Musteri { get; set; }
    }
}