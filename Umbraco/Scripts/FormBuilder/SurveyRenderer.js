var sId = null;
var SurveyPages = [];
var formBtns = $("#frm-btns");
var currentPageIndex = 0;
var hideCtrlCssClassName = "hide-ctrl";


jQuery(function ($) {
    sId = $("#surveyId").val();
    

    $.get("/Umbraco/Surface/Survey/GetSurvey", { surveyId: sId })
        .done(function (data) {
            $("#surveyName").text(data.SurveyName);
            SurveyPages = JSON.parse(data.SurveyContent);
            DisplayIntro();
        });

    $("#form-builder-pages").submit(function (event) {

        // Stop form from submitting normally
        event.preventDefault();
        SubmitSurvey();

    });
});

function DisplayIntro() {

    //
    beginSurvey();
    RenderPage(0);
}

function RenderPage(pageIndex = 0) {
    //debugger;
    currentPageIndex = pageIndex;
    var frm = '<div id="' + SurveyPages[pageIndex].PageId + '" class="fb-render">' + SurveyPages[pageIndex].PageName + ' </div>';
    $(formBtns).before(frm);
    if ((SurveyPages.length - 1) == pageIndex) {
        $("#btnSubmit").removeClass(hideCtrlCssClassName);
        $("#btnNext").addClass(hideCtrlCssClassName);
    } else {
        $("#btnNext").removeClass(hideCtrlCssClassName);
        $("#btnSubmit").addClass(hideCtrlCssClassName);
    }

    var ta = $("#" + SurveyPages[pageIndex].PageId);
    $(ta).formRender({
        formData: SurveyPages[pageIndex].FormFields
    });
}

function NextPage() {
    persistSurveyState();
    // remove current page
    removeElement(SurveyPages[currentPageIndex].PageId);
    // Render Next Page
    RenderPage((currentPageIndex + 1));
}



function SubmitSurvey() {

    persistSurveyState();
    // remove current page
    removeElement(SurveyPages[currentPageIndex].PageId);

    // Sumit Date to Server

    // Display Thank you message
    $("#frm-btns").addClass(hideCtrlCssClassName);
    $("#thankYou").removeClass(hideCtrlCssClassName);
}

function persistSurveyState() {
    //Save state of current page
    console.log("Existing Page Fields: " + JSON.stringify(SurveyPages[currentPageIndex].FormFields));
    var pageData = $('#' + SurveyPages[currentPageIndex].PageId).formRender('userData');
    SurveyPages[currentPageIndex].FormFields = pageData;
    // Update rating
    for (var i = 0; i < SurveyPages[currentPageIndex].FormFields.length; i++) {
        var fld = SurveyPages[currentPageIndex].FormFields[i];

        if (fld.type === "emoRating") {
            debugger;
            fld.userData = [$('input[name=rating-' + fld.name + ']').val()];
            SurveyPages[currentPageIndex].FormFields[i] = fld;
        }

        if (fld.type === "starRating") {
            var $rateYo = $("#" + fld.name).rateYo();
            fld.userData = [$rateYo.rateYo("rating").toString()];
            SurveyPages[currentPageIndex].FormFields[i] = fld;
        }
    }

    console.log("Updated Page Fields: " + JSON.stringify(SurveyPages[currentPageIndex].FormFields));
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


function changeRating(pageIndex, ctrlId, value) {

    var pageData = $('#' + SurveyPages[currentPageIndex].PageId).formRender('userData');
    SurveyPages[currentPageIndex].FormFields = pageData;


    var page = SurveyPages[pageIndex];

    for (var i = 0; i < page.FormFields.length; i++) {
        var fld = page.FormFields[i];
        if (fld.type === "starRating" && fld.name == ctrlId) {
            debugger;
            fld.userData = value;
            page.FormFields[i] = fld;
            break; //Stop this loop, we found it!
        }
    }
    SurveyPages[currentPageIndex].FormFields = page.FormFields;

    //RenderPage(currentPageIndex);
} 