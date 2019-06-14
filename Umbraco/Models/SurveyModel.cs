using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Umbraco.Models
{
    public class SurveyModel
    {
        public int Id { get; set; }
        public Guid SurveyId { get; set; }
        public string SurveyName { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserId { get; set; }

        [AllowHtml]
        public string SurveyContent { get; set; }
        public string SurveySettings { get; set; }

        //public string Intro { get; set; }
        //public string Intrologo { get; set; }
        //public string IntroMedia { get; set; }
        //public string IntroBgImage { get; set; }
        //public string IntroBgColor { get; set; }
        //public string IntroFontColor { get; set; }


        //public string SurveyLabelColor { get; set; }
        //public string SurveyLabelSize { get; set; }
        //public string SurveyBgColor { get; set; }
        //public string SurveyBgImage { get; set; }

        
    }
}