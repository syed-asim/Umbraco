using System;
using System.Collections.Generic;
using System.IO;
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

        [HttpPost]
        public ActionResult saveFile()
        {
            HttpPostedFileBase file;
            if (Request.Files.Count > 0)
            {
                file = Request.Files[0];
            }
            else
            {
                return Json(new { Status = false, Message = "Upload failed: " + "You have not specified a file.", path = "" }, JsonRequestBehavior.AllowGet);
            }

            if (file != null && file.ContentLength > 0)
                try
                {
                    string fpath = Path.Combine(Server.MapPath("~/Content/Uploads"),
                                               Path.GetFileName(file.FileName));
                    file.SaveAs(fpath);
                    fpath = "/Content/Uploads/" + file.FileName;
                    return Json(new { status = "ok", message = "Upload successfull", path = fpath }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new { status = "error", message = "Upload failed: " + ex.Message, path = "" }, JsonRequestBehavior.AllowGet);
                }
            else
            {
                return Json(new { status = "error", message = "Upload failed: " + "You have not specified a file.", path = "" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}