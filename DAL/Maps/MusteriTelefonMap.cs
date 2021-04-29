using DAL.Entities;
using NHibernate;
using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace DAL.Maps
{
    public class MusteriTelefonMap : ClassMapping<MusteriTelefon>
    {
        public MusteriTelefonMap()
        {
            Lazy(false);

            Id(x => x.ID, x =>
                {
                    x.Generator(Generators.Identity);
                    x.Type(NHibernateUtil.Int64);
                    x.Column("ID");
                    x.UnsavedValue(0);
                });

            Property(b => b.MusteriID, x =>
            {
                x.Type(NHibernateUtil.Int64);
                x.NotNullable(true);
            });

            Property(b => b.Telefon, x =>
            {
                x.Length(56);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(true);
            });

            Property(b => b.CreatedAt, x =>
            {
                x.Type(NHibernateUtil.DateTime);
                x.NotNullable(false);
            });

            Property(b => b.UpdatedAt, x =>
            {
                x.Type(NHibernateUtil.DateTime);
                x.NotNullable(false);
            });

            Property(b => b.IsDeleted, x =>
            {
                x.Type(NHibernateUtil.Boolean);
                x.NotNullable(false);
            });

            Table("MusteriTelefonlari");
        }
    }
}