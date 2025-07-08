flowchart TB
    subgraph "Frontend Layer"
        direction TB
        angularJson["angular.json"] 
        appModule["app.module.ts"]
        appComponent["app.component.ts"]
        interfaces["Interfaces (ApiResponse, Il, Musteri, MusteriTelefon)"]
        pipe["safe-html.pipe.ts"]
        renderer["checkbox-renderer.component.ts"]
        validators["Validators (.directive.ts)"]
        env["Environments (environment.ts, environment.prod.ts)"]
        angularJson --> appModule
        appModule --> appComponent
        appComponent --> interfaces
        appComponent --> pipe
        appComponent --> renderer
        appComponent --> validators
        appComponent --> env
    end

    ui["Angular UI"]:::frontend
    ui -->|"HTTP/JSON"| ilController

    subgraph "API Layer"
        direction TB
        apiStartup["Startup.cs"]
        apiProgram["Program.cs"]
        apiAppsettings["appsettings.json"]
        apiAppsettingsDev["appsettings.Development.json"]
        subgraph "Controllers"
            direction TB
            ilController["IlController.cs"]
            musteriController["MusteriController.cs"]
            musteriTelefonController["MusteriTelefonController.cs"]
            baseController["BaseController.cs"]
        end
        subgraph "Extensions"
            CorsExt["CorsExtensions.cs"]
            ErrExt["CustomErrorHandlerExtensions.cs"]
            NhExt["NHibernateExtensions.cs"]
        end
        subgraph "Handlers"
            CustomErr["CustomErrorHandler.cs"]
        end
        apiStartup --> CorsExt
        apiStartup --> ErrExt
        apiStartup --> NhExt
        apiStartup --> baseController
        apiProgram --> apiStartup
    end
    class apiStartup,apiProgram,apiAppsettings,apiAppsettingsDev,CorsExt,ErrExt,NhExt,CustomErr,ilController,musteriController,musteriTelefonController,baseController api
    ilController -->|"calls"| IlBusiness
    musteriController -->|"calls"| MusteriBusiness
    musteriTelefonController -->|"calls"| MusteriTelefonBusiness

    subgraph "Business Logic Layer"
        direction TB
        IBusiness["IBusiness.cs"]
        BaseBusiness["BaseBusiness.cs"]
        IlBusiness["IlBusiness.cs"]
        MusteriBusiness["MusteriBusiness.cs"]
        MusteriTelefonBusiness["MusteriTelefonBusiness.cs"]
        IBusiness --> BaseBusiness
        BaseBusiness --> IlBusiness
        BaseBusiness --> MusteriBusiness
        BaseBusiness --> MusteriTelefonBusiness
    end
    class IBusiness,BaseBusiness,IlBusiness,MusteriBusiness,MusteriTelefonBusiness business
    IlBusiness --> IlRepository
    MusteriBusiness --> MusteriRepository
    MusteriTelefonBusiness --> MusteriTelefonRepository

    subgraph "Data Access Layer"
        direction TB
        subgraph "Entities"
            BaseEntity["BaseEntity.cs"]
            IlEntity["Il.cs"]
            MusteriEntity["Musteri.cs"]
            MusteriTelefonEntity["MusteriTelefon.cs"]
        end
        subgraph "Maps"
            IlMap["IlMap.cs"]
            MusteriMap["MusteriMap.cs"]
            MusteriTelefonMap["MusteriTelefonMap.cs"]
        end
        subgraph "Repositories"
            IRepository["IRepository.cs"]
            BaseRepository["BaseRepository.cs"]
            IlRepository["IlRepository.cs"]
            MusteriRepository["MusteriRepository.cs"]
            MusteriTelefonRepository["MusteriTelefonRepository.cs"]
        end
        IRepository --> BaseRepository
        BaseRepository --> IlRepository
        BaseRepository --> MusteriRepository
        BaseRepository --> MusteriTelefonRepository
        IlRepository --> IlMap
        MusteriRepository --> MusteriMap
        MusteriTelefonRepository --> MusteriTelefonMap
    end
    class BaseEntity,IlEntity,MusteriEntity,MusteriTelefonEntity,IlMap,MusteriMap,MusteriTelefonMap,IRepository,BaseRepository,IlRepository,MusteriRepository,MusteriTelefonRepository data
    IlRepository --> NHibernate
    MusteriRepository --> NHibernate
    MusteriTelefonRepository --> NHibernate

    NHibernate["NHibernate ORM"]:::data
    NHibernate -->|"ORM calls"| MarketDB

    subgraph "Database"
        direction TB
        Market_mdf["Market.mdf"]
        Market_log["Market_log.ldf"]
    end
    class Market_mdf,Market_log db
    MarketDB["SQL Server Database"] --> Market_mdf
    MarketDB --> Market_log

    %% Click Events
    click angularJson "https://github.com/ahmadmdabit/market/blob/master/ui/angular.json"
    click appModule "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/app.module.ts"
    click appComponent "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/app.component.ts"
    click interfaces "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/interfaces/ApiResponse.ts"
    click interfaces "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/interfaces/Il.ts"
    click interfaces "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/interfaces/Musteri.ts"
    click interfaces "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/interfaces/MusteriTelefon.ts"
    click pipe "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/pipes/safe-html.pipe.ts"
    click renderer "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/renders/checkbox-renderer.component.ts"
    click validators "https://github.com/ahmadmdabit/market/blob/master/ui/src/app/validators/*.directive.ts"
    click env "https://github.com/ahmadmdabit/market/blob/master/ui/src/environments/environment.ts"
    click env "https://github.com/ahmadmdabit/market/blob/master/ui/src/environments/environment.prod.ts"
    click apiStartup "https://github.com/ahmadmdabit/market/blob/master/API/Startup.cs"
    click apiProgram "https://github.com/ahmadmdabit/market/blob/master/API/Program.cs"
    click apiAppsettings "https://github.com/ahmadmdabit/market/blob/master/API/appsettings.json"
    click apiAppsettingsDev "https://github.com/ahmadmdabit/market/blob/master/API/appsettings.Development.json"
    click ilController "https://github.com/ahmadmdabit/market/blob/master/API/Controllers/IlController.cs"
    click musteriController "https://github.com/ahmadmdabit/market/blob/master/API/Controllers/MusteriController.cs"
    click musteriTelefonController "https://github.com/ahmadmdabit/market/blob/master/API/Controllers/MusteriTelefonController.cs"
    click baseController "https://github.com/ahmadmdabit/market/blob/master/API/Controllers/BaseController.cs"
    click CorsExt "https://github.com/ahmadmdabit/market/blob/master/API/Extensions/CorsExtensions.cs"
    click ErrExt "https://github.com/ahmadmdabit/market/blob/master/API/Extensions/CustomErrorHandlerExtensions.cs"
    click NhExt "https://github.com/ahmadmdabit/market/blob/master/API/Extensions/NHibernateExtensions.cs"
    click CustomErr "https://github.com/ahmadmdabit/market/blob/master/API/Handlers/CustomErrorHandler.cs"
    click IBusiness "https://github.com/ahmadmdabit/market/blob/master/BLL/IBusiness.cs"
    click BaseBusiness "https://github.com/ahmadmdabit/market/blob/master/BLL/BaseBusiness.cs"
    click IlBusiness "https://github.com/ahmadmdabit/market/blob/master/BLL/IlBusiness.cs"
    click MusteriBusiness "https://github.com/ahmadmdabit/market/blob/master/BLL/MusteriBusiness.cs"
    click MusteriTelefonBusiness "https://github.com/ahmadmdabit/market/blob/master/BLL/MusteriTelefonBusiness.cs"
    click BaseEntity "https://github.com/ahmadmdabit/market/blob/master/DAL/Entities/BaseEntity.cs"
    click IlEntity "https://github.com/ahmadmdabit/market/blob/master/DAL/Entities/Il.cs"
    click MusteriEntity "https://github.com/ahmadmdabit/market/blob/master/DAL/Entities/Musteri.cs"
    click MusteriTelefonEntity "https://github.com/ahmadmdabit/market/blob/master/DAL/Entities/MusteriTelefon.cs"
    click IlMap "https://github.com/ahmadmdabit/market/blob/master/DAL/Maps/IlMap.cs"
    click MusteriMap "https://github.com/ahmadmdabit/market/blob/master/DAL/Maps/MusteriMap.cs"
    click MusteriTelefonMap "https://github.com/ahmadmdabit/market/blob/master/DAL/Maps/MusteriTelefonMap.cs"
    click IRepository "https://github.com/ahmadmdabit/market/blob/master/DAL/Repositories/IRepository.cs"
    click BaseRepository "https://github.com/ahmadmdabit/market/blob/master/DAL/Repositories/BaseRepository.cs"
    click IlRepository "https://github.com/ahmadmdabit/market/blob/master/DAL/Repositories/IlRepository.cs"
    click MusteriRepository "https://github.com/ahmadmdabit/market/blob/master/DAL/Repositories/MusteriRepository.cs"
    click MusteriTelefonRepository "https://github.com/ahmadmdabit/market/blob/master/DAL/Repositories/MusteriTelefonRepository.cs"
    click Market_mdf "https://github.com/ahmadmdabit/market/blob/master/API/App_Data/Market.mdf"
    click Market_log "https://github.com/ahmadmdabit/market/blob/master/API/App_Data/Market_log.ldf"

    %% Styles
    classDef frontend fill:#D0E6F5,stroke:#0366d6,color:#000
    classDef api fill:#D6F5D6,stroke:#28a745,color:#000
    classDef business fill:#FEF3C7,stroke:#d39e00,color:#000
    classDef data fill:#FFF4E6,stroke:#fd7e14,color:#000
    classDef db fill:#F8D7DA,stroke:#dc3545,color:#000