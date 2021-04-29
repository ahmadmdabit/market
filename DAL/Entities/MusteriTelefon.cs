namespace DAL.Entities
{
    /// <summary>
    /// çoklu eklenebilir)
    /// </summary>
    public class MusteriTelefon : BaseEntity
    {
        public long MusteriID { get; set; }
        /// <summary>
        /// (Phone no validation
        /// </summary>
        public string Telefon { get; set; }
    }
}