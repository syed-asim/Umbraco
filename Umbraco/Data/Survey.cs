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
        public Guid AccountId { get; set; }
        public Guid UserId { get; set; }
        
        [Length(4000)]
        public string SurveyContent { get; set; }

        public string SurveySettings { get; set; }
        public DateTime ModifiedOn { get; set; }

    }

}