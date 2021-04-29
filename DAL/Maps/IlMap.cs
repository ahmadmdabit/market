using DAL.Entities;
using NHibernate;
using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace DAL.Maps
{
    public class IlMap : ClassMapping<Il>
    {
        public IlMap()
        {
            Lazy(false);

            Id(x => x.ID, x =>
            {
                x.Generator(Generators.Identity);
                x.Type(NHibernateUtil.Int64);
                x.Column("ID");
                x.UnsavedValue(0);
            });

            Property(b => b.Ad, x =>
            {
                x.Length(128);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(true);
            });

            Property(b => b.Enlem, x =>
            {
                x.Length(128);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(false);
            });

            Property(b => b.Boylam, x =>
            {
                x.Length(128);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(false);
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

            Table("Iller");
        }
    }
}