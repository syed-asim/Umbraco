using NPoco;
using System;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace Umbraco.Data
{

    [TableName("Surveys")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Survey
    {
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }

        public Guid SurveyId { get; set; }

        public string SurveyName { get; set; }

        // [Column("SurveyContent")]
        [Length(4000)]
        public string SurveyContent { get; set; }

        public DateTime ModifiedOn { get; set; }
    }

}