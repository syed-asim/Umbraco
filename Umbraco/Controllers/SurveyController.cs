using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.BL;
using Umbraco.Models;
using Umbraco.Web.Mvc;

namespace Umbraco.Controllers
{
    public class SurveyController : SurfaceController
    {
        private readonly SurveyBL _surveyBL;
        public const string Survey_Folder_Path = "~/Views/Survey/";
        public SurveyController(SurveyBL myService)
        {
            _surveyBL = myService;
        }

        // GET: Survey
        public ActionResult Index()
        {
            var res = _surveyBL.GetSurveys();
            List<SurveyModel> model = new List<SurveyModel>();
            foreach (var item in res)
            {
                model.Add(new SurveyModel
                {
                    SurveyContent = item.SurveyContent,
                    SurveyId = item.SurveyId,
                    SurveyName = item.SurveyName
                });
            }
            // return Json(model, JsonRequestBehavior.AllowGet);
            return PartialView(Survey_Folder_Path + "_Index.cshtml", model);
        }

        public ActionResult GetSurvey(Guid surveyId)
        {
            var res = _surveyBL.GetSurveyById(surveyId);
            var model = new SurveyModel
            {
                SurveyContent = res.SurveyContent,
                SurveyId = res.SurveyId,
                SurveyName = res.SurveyName
            };
            return Json(res, JsonRequestBehavior.AllowGet);
            // return PartialView(Survey_Folder_Path + "_RenderSurvey.cshtml", model);
        }

        [HttpPost]
        public ActionResult SaveSurvey(SurveyModel model)
        {
            var res = _surveyBL.AddSurvey(new Data.Survey
            {
                SurveyId = Guid.NewGuid(),
                SurveyName = model.SurveyName,
                SurveyContent = model.SurveyContent,
                SurveySettings = model.SurveySettings,
                ModifiedOn = DateTime.Now
            });
            return Json("Survey ID is: " + res, JsonRequestBehavior.AllowGet);
        }

       
    }
}