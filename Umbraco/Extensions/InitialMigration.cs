
using System.Linq;
using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Core.Migrations;
using Umbraco.Core.Migrations.Upgrade;
using Umbraco.Core.Scoping;
using Umbraco.Core.Services;
using Umbraco.Core.Services.Implement;
using Umbraco.Data;
using Umbraco.Core.Logging;
using Umbraco.BL;

namespace Umbraco.Extensions
{


    public class MigrationCreateTables : MigrationBase
    {
        public MigrationCreateTables(IMigrationContext context)
            : base(context)
        { }

        public override void Migrate()
        {
            if (!TableExists("Surveys"))
                Create.Table<Survey>().Do();
        }
    }

    public class MyMigrationPlan : MigrationPlan
    {
        public MyMigrationPlan()
            : base("MyApplicationName")
        {
            From(string.Empty)
                .To<MigrationCreateTables>("first-migration");
        }
    }

    public class MyCustomComponent : IComponent
    {
        private readonly IScopeProvider scopeProvider;
        private readonly IMigrationBuilder migrationBuilder;
        private readonly IKeyValueService keyValueService;
        private readonly Umbraco.Core.Logging.ILogger logger;

        public MyCustomComponent(
            IScopeProvider scopeProvider,
            IMigrationBuilder migrationBuilder,
            IKeyValueService keyValueService,
            ILogger logger)
        {
            this.scopeProvider = scopeProvider;
            this.migrationBuilder = migrationBuilder;
            this.keyValueService = keyValueService;
            this.logger = logger;
        }

        public void Initialize()
        {
            // perform any upgrades (as needed)
            var upgrader = new Upgrader(new MyMigrationPlan());
            upgrader.Execute(scopeProvider, migrationBuilder, keyValueService,logger);

        }

        public void Terminate()
        {
            throw new System.NotImplementedException();
        }
    }
    public class MyAppComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            // component for startup
            composition.Components()
                .Append<MyCustomComponent>();
            composition.Register<SurveyBL>();
        }
    }
}
