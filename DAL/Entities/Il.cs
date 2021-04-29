using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Il : BaseEntity
    {
        [Required]
        public string Ad { get; set; }
        /// <summary>
        /// Latitude
        /// </summary>
        public string Enlem { get; set; }
        /// <summary>
        /// Longitude
        /// </summary>
        public string Boylam { get; set; }
    }
}
