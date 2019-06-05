using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Models;
using Umbraco.Web.Mvc;

namespace Umbraco.Controllers
{
    public class HomeController: SurfaceController
    {
        public const string Home_Folder_Path = "~/Views/Home/";
        public ActionResult GetHeader()
        {
            HomeHeader headerModel = new HomeHeader { Title= "Hellow World!!!", Description= "MAGNA FEUGIAT LOREM DOLOR EGESTAS" };
            return PartialView(Home_Folder_Path+ "_Header.cshtml", headerModel);
        }
    }
}