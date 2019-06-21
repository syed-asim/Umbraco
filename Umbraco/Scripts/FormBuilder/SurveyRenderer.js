var sId = null;
var surveySettings;
var SurveyPages = [];
var formBtns = $("#frm-btns");
var currentPageIndex = 0;
var hideCtrlCssClassName = "hide-ctrl";
const formRenderOptions =
{
    disableInjectedStyle: false,
    //container: false,
    formData: null,// SurveyPages[pageIndex].FormFields,
    //dataType: 'json', // 'xml' | 'json'
    //label: {
    //    formRendered: 'Form Rendered',
    //    noFormData: 'No form data.',
    //    other: 'Other',
    //    selectColor: 'Select Color'
    //},
    //render: true,
    notify: {
        error: function (message) {
            return console.error(message);
        },
        success: function (message) {
            return console.log(message);
        },
        warning: function (message) {
            return console.warn(message);
        }
    },
    layoutTemplates: {
        default: function (field, label, help, data) {
            // <div class="label">Q3. Would you like to get started NOW?</div>
            //label = $('<div/>')
            //    .addClass('label')
            //    .attr('id', 'lbl-' + data.id)
            //    .text(data.label);

            //field = $('<div/>')
            //    .addClass('input-control')
            //    .append(field);
            label = $(label)
                .addClass('label');
            field = $(field)
                .addClass('input-control');
            return $('<div class="input-block"/>').append(label, field, help);
        }
    }
};


jQuery(function ($) {
    sId = $("#surveyId").val();


    $.get("/Umbraco/Surface/Survey/GetSurvey", { surveyId: sId })
        .done(function (data) {
            $("#surveyName").text(data.surveyName);
            //debugger;
            surveySettings = JSON.parse(data.SurveySettings);
            SurveyPages = JSON.parse(data.SurveyContent);
            DisplayIntro();
        });
    //renderThemes();
    //$("#form-builder-pages").submit(function (event) {

    //    // Stop form from submitting normally
    //    event.preventDefault();
    //    SubmitSurvey();

    //});
});

function DisplayIntro() {
    // debugger;
    $("#surveyName").text(surveySettings.find(e => e.name === 'surveyName').userData[0]);
    $("#introText").text(surveySettings.find(e => e.name === 'introText').userData[0]);
    var topImage = '<img alt="" style="max-width:65%;padding-top: 6rem;" class="img-fluid" src="' + surveySettings.find(e => e.name === 'surveyMedia').userData[0] + '">';
    $('#intro-media').append(topImage);
    //debugger;
    //renderStyle();
}

function renderStyle() {
    // debugger;
    var bgColor = surveySettings.find(e => e.name === 'introBgColor').userData[0];
    var fontColor = surveySettings.find(e => e.name === 'introTextColor').userData[0];

    let bgAndTextCss = 'background-color:' + bgColor + '; color:' + fontColor + ';';
    let bgAndTextCssReverse = 'background-color:' + fontColor + '; color:' + bgColor + ';';

    var style =
        //body
        'body{' + bgAndTextCss + '}' +
        //buttons
        ':button{' + bgAndTextCssReverse + '}' +
        //inputs
        '.input-control input:focus, .input-control textarea:focus{border:1px solid ' + fontColor + '!important; color:' + fontColor + ';}' +
        // Select 
        '.input-control select:focus{border:1px solid ' + fontColor + '!important; color:' + fontColor + ';}' +
        '.input-control select{background-color: ' + bgColor + ' !important;}'
        //Radio Box
        //'input[type="radio"]:after{background-color:' + fontColor + ';}' +
        //'input[type="radio"]:checked:after{background-color:' + bgColor + ';border:2px solid ' + fontColor + ';}'
        ;


    $("<style>" + style + "</style>").appendTo("head")
}

function beginSurvey() {
    $('#intro-page').toggle();
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
    formRenderOptions.formData = SurveyPages[pageIndex].FormFields;
    $(ta).formRender(formRenderOptions);
    $('#form-builder-pages').upform();
    $('#form-builder-pages').find(".input-block").first().click();
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
    if ($('#form-builder-pages').valid) {

    }
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
            // debugger;
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

function renderThemes() {
    $.getJSON("https://bootswatch.com/api/3.json", function (data) {
        var themes = data.themes;
        var select = $("#themes");
        themes.forEach(function (value, index) {
            select.append($("<option />")
                .val(index)
                .text(value.name));
        });
        select.change(function () {
            var theme = themes[$(this).val()];
            $("#themes-ss").attr("href", theme.css);
        }).change();

    }, "json");
}