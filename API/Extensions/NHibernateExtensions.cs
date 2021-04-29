using BLL;
using DAL.Entities;
using DAL.Maps;
using DAL.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NHibernate.Cfg;
using NHibernate.Cfg.MappingSchema;
using NHibernate.Dialect;
using NHibernate.Mapping.ByCode;

namespace API.Extensions
{
    public static class NHibernateExtensions
    {
        public static IServiceCollection AddNHibernate(this IServiceCollection services, string connectionString)
        {
            var mapper = new ModelMapper();
            mapper.AddMappings(typeof(NHibernateExtensions).Assembly.ExportedTypes);

            #region Maps

            mapper.AddMapping<IlMap>();
            mapper.AddMapping<MusteriMap>();
            mapper.AddMapping<MusteriTelefonMap>();

            #endregion Maps

            HbmMapping domainMapping = mapper.CompileMappingForAllExplicitlyAddedEntities();

            var configuration = new Configuration();
            configuration.DataBaseIntegration(c =>
            {
                c.Dialect<MsSql2012Dialect>();
                c.ConnectionString = connectionString;
                c.KeywordsAutoImport = Hbm2DDLKeyWords.AutoQuote;
                c.SchemaAction = SchemaAutoAction.Validate;
                c.LogFormattedSql = true;
                c.LogSqlInConsole = true;
            });
            configuration.AddMapping(domainMapping);

            var sessionFactory = configuration.BuildSessionFactory();

            services.AddSingleton(sessionFactory);
            services.AddScoped(factory => sessionFactory.OpenSession());

            #region Entities

            services.AddScoped<Il>();
            services.AddScoped<Musteri>();
            services.AddScoped<MusteriTelefon>();

            #endregion Entities

            #region Repositories

            services.AddScoped<BaseRepository<Il>, IlRepository>();
            services.AddScoped<BaseRepository<Musteri>, MusteriRepository>();
            services.AddScoped<BaseRepository<MusteriTelefon>, MusteriTelefonRepository>();

            #endregion Repositories

            #region Business

            services.AddScoped<IBusiness<Il>, IlBusiness>();
            services.AddScoped<IBusiness<Musteri>, MusteriBusiness>();
            services.AddScoped<IBusiness<MusteriTelefon>, MusteriTelefonBusiness>();

            #endregion Business

            return services;
        }
    }
}