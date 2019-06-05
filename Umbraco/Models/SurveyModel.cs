using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Umbraco.Models
{
    public class SurveyModel
    {
        public string SurveyName { get; set; }
        public Guid SurveyId { get; set; }
        public string SurveyContent { get; set; }

    }
}