using DAL.Entities;
using NHibernate;
using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace DAL.Maps
{
    public class MusteriMap : ClassMapping<Musteri>
    {
        public MusteriMap()
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

            Property(b => b.Soyad, x =>
            {
                x.Length(128);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(true);
            });

            Property(b => b.Cinsiyet, x =>
            {
                x.Type(NHibernateUtil.Boolean);
                x.NotNullable(true);
            });

            Property(b => b.Meslegi, x =>
            {
                x.Length(128);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(true);
            });

            Property(b => b.DogumTarihi, x =>
            {
                x.Type(NHibernateUtil.Date);
                x.NotNullable(false);
            });

            Property(b => b.MailAdresi, x =>
            {
                x.Length(256);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(true);
            });

            Property(b => b.WebSitesi, x =>
            {
                x.Length(256);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(false);
            });

            Property(b => b.ReklamMailleri, x =>
            {
                x.Type(NHibernateUtil.Boolean);
                x.NotNullable(true);
            });

            Property(b => b.AdresBilgisi, x =>
            {
                x.Length(512);
                x.Type(NHibernateUtil.StringClob);
                x.NotNullable(false);
            });

            Property(b => b.IlID, x =>
            {
                x.Type(NHibernateUtil.Int64);
                x.NotNullable(false);
            });

            Property(b => b.Notlar, x =>
            {
                x.Length(512);
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

            Bag(s => s.MusteriTelefonlar, x =>
            {
                x.Key(t => t.Column("MusteriID"));
                x.Cascade(Cascade.All | Cascade.DeleteOrphans);
            }, a => a.OneToMany());

            Table("Musteriler");
        }
    }
}