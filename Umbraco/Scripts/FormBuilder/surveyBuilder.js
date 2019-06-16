
var fbPages = $(document.getElementById("form-builder-pages"));
var introForm = {};
var introFormData = null;
var mediaUrl;
var surveyModel = {
    Id: '',
    SurveyId: '',
    SurveyName: '',
    SurveyContent: '',
    SurveySettings: ''
};

var fbInstances = [];


var options = {
    //editOnAdd: true,
    stickyControls: {
        enable: true
    },
    disabledActionButtons: ['data', 'save', 'clear'],
    disableFields: ['autocomplete', 'button', 'file', 'hidden', 'radio-group', 'checkbox-group', 'select', 'header', 'paragraph', 'text', 'textarea'],
    disabledSubtypes: { text: ['password'], },
    disabledAttrs: ['access', 'className', 'name', 'placeholder'],
    controlPosition: 'left',
    controlOrder: [
        'header',
        'paragraph',
        'text',
        'textarea'
    ],
    fields: [

        {
            label: "Headings",
            type: "header",
        },
        {
            label: "Description",
            type: "paragraph",
        },
        //{
        //    label: "Text and Media",
        //    type: 'textarea',
        //    subtype: "tinymce",
        //    icon: "🎬"
        //},
        {
            label: "Text Anwser",
            type: "text",
        },
        {
            label: "Text Anwser (Long)",
            type: "textarea",
        },
        {
            label: "Single Anwser Selection",
            type: "radio-group",
            // icon: "&#128280;"
        },
        {
            label: "Multiple Anwser Selection",
            type: "checkbox-group"
        },
        {
            label: "Dropdown list",
            type: "select"
        },
    ],
    typeUserAttrs: {
        //starRating: {
        //    noStars: {
        //        label: 'No. of Stars',
        //        options: {
        //            '5': '5',
        //            '10': '10',
        //        },
        //    },
        //    size: {
        //        label: 'Size',
        //        options: {
        //            40: 'Small',
        //            60: 'Medium',
        //            80: 'Large'
        //        },
        //    },
        //    //ratingData: {
        //    //    label: 'Rating',
        //    //    value: '5'
        //    //}
        //},
        emoRating: {
            emojiSize: {
                label: 'Size of Emoji',
                options: {
                    40: 'Small',
                    60: 'Medium',
                    80: 'Large',
                },
            },
            emojiType: {
                label: 'Rating Type',
                options: {
                    "Emojis": "Emoji's",
                    'Star': 'Stars',
                    'ThumbsUp': 'Thumbs Up',
                    'Hearts': 'Hearts',
                    'Poop': 'Poop',
                    'Excited': 'Excited',
                },
            },
        }
    },
    onAddField: function (fieldId) {
        alert(fieldId);
    }

};

jQuery($ => {


    initIntroForm();

});



function initIntroForm() {
    //var introTemplate = '[{"type":"text","required":true,"label":"Title","placeholder":"Enter survey name...","className":"form-control survey-name","name":"SurveyName","subtype":"text","maxlength":50},{"type":"file","label":"Want to display your logo?","description":"Your logo will be display above the intro text.","placeholder":"Your logo will show up at the beginning of survey","className":"form-control surveyLogo","name":"surveyLogo","subtype":"file"},{"type":"textarea","required":true,"label":"Intro","description":"Simply state the reason for your survey and what you want to achieve with it, will persuade more people to complete it.","placeholder":"Simply state the reason for your survey and what you want to achieve with it, will persuade more people to complete it.","className":"form-control","name":"introText","subtype":"textarea","maxlength":1000,"rows":4},{"type":"file","label":"Intro video or image?","description":"Additional video or image to display below the intro text","placeholder":"Additional video or image to display below the intro text","className":"form-control introMedia","name":"introMedia","subtype":"file"},{"type":"autocomplete","label":"Intro page background color?","placeholder":"white","className":"form-control introBgColor","name":"introBgColor","requireValidOption":true,"values":[{"label":"White","value":"White"},{"label":"black","value":"black"},{"label":"green","value":"option-3"}]},{"type":"autocomplete","label":"Intro page text color?","placeholder":"white","className":"form-control introTextColor","name":"introTextColor","requireValidOption":true,"values":[{"label":"White","value":"White"},{"label":"black","value":"black"},{"label":"green","value":"option-3"}]},{"type":"textarea","label":"Thank you message to show upon completion of survey?","placeholder":"Thank you for you your valuable feedback, Have a great day!","className":"form-control thankyouMessage","name":"thankyouMessage","subtype":"textarea","maxlength":200,"rows":4}]';
    var introTemplate='[{"type":"text","required":true,"label":"Title","placeholder":"Enter survey name...","className":"form-control survey-name","name":"surveyName","subtype":"text","maxlength":50},{"type":"file","label":"Want to display your logo/video?","description":"Your logo/video will be display above the intro text.","placeholder":"Your logo/video will show up at the beginning of survey","className":"form-control surveyMedia","name":"surveyMedia","subtype":"file"},{"type":"textarea","required":true,"label":"Introduction","description":"Simply state the reason for your survey and what you want to achieve with it, will persuade more people to complete it.","placeholder":"Simply state the reason for your survey and what you want to achieve with it, will persuade more people to complete it.","className":"form-control introText","name":"introText","subtype":"textarea","maxlength":1000,"rows":4},{"type":"autocomplete","label":"Intro page background color?","placeholder":"white","className":"form-control introBgColor","name":"introBgColor","requireValidOption":true,"values":[{"label":"White","value":"White"},{"label":"black","value":"black"},{"label":"green","value":"green"}]},{"type":"autocomplete","label":"Intro page text color?","placeholder":"white","className":"form-control introTextColor","name":"introTextColor","requireValidOption":true,"values":[{"label":"White","value":"White"},{"label":"black","value":"black"},{"label":"green","value":"green"}]},{"type":"textarea","label":"Thank you message to show upon completion of survey?","placeholder":"Thank you for you your valuable feedback, Have a great day!","className":"form-control thankyouMessage","name":"thankyouMessage","subtype":"textarea","maxlength":200,"rows":4}]';
    const introWrap = $('.intro-wrap');

    const formRenderOptions =
    {
        //disableInjectedStyle: true,
        formData: introTemplate,
        //layoutTemplates: {
        //    default: function (field, label, help, data) {
        //        // debugger;
        //        if (data.type == 'file') {

        //            let subDiv = $('<div/>')
        //                .addClass('bar');
        //            field = $('<div/>')
        //                .attr('id', 'progress-' + data.id)
        //                .append(subDiv)
        //                .append(field);
        //        }
        //        return $('<div/>').append(label, field, help);
        //    }
        //}
    };


    introForm = introWrap.formRender(formRenderOptions);
    $("#intro-form").submit(function (event) {
        // Stop form from submitting normally

        event.preventDefault();
        SaveIntroForm();
    });
    setupFileUploader();
}

function SaveIntroForm() {
    //Save survey
    $('#surveryIntro').addClass('hide-ctrl');
    $('#surveryContent').removeClass('hide-ctrl');
    introFormData = $(introForm).formRender('userData');
    introFormData.find(e => e.name === 'surveyMedia').userData = [mediaUrl];
    debugger;
    //Init Survey Builder
    initSurveyBuilder();
}



function initSurveyBuilder() {

    initFbTabs();

    $(".add-page-tab").on('click', function () {
        addNewPage();
    });

    addNewPage();

    $("#form-builder-pages").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();
        submitSurveyBuilder(event);
    });
}

function submitSurveyBuilder(event) {

    var surveyContent = [];
    var surveyName = introFormData[0].userData[0];
    var surveySettings = introFormData;

    fbInstances.map(fb => {
        surveyContent.push({ PageId: fb.PageId, PageName: fb.PageName, FormFields: fb.FormBuilder.actions.getData() });
    });

    var model = { SurveyName: surveyName, SurveyContent: JSON.stringify(surveyContent), SurveySettings: JSON.stringify(surveySettings) };

    var posting = $.post('/Umbraco/Surface/Survey/SaveSurvey', model);

    // Put the results in a div
    posting.done(function (data) {
        console.log(data);
        // alert(data);
        //var content = $(data).find("#content");
        //$("#result").empty().append(content);
    });

}

function addNewPage() {
    var tabCount = document.getElementById("tabs").children.length;

    var pageId = generateUUID();
    var newPageName = "page " + tabCount.toString();

    var newPageHtml = '<div id="' + pageId + '" class="fb-editor"></div>';
    var newTabHtml = '<li ><a contenteditable="true" href="#' + pageId + '">' + newPageName + '</a></li>';


    $(newPageHtml).insertBefore($(document.getElementById("new-page")));
    var parentt = $("#add-page-tab");
    $(newTabHtml).insertBefore(parentt);

    $(fbPages).tabs("refresh");
    $(fbPages).tabs("option", "active", tabCount - 1);

    var newPageitem = document.getElementById(pageId);
    var newForm = $(newPageitem).formBuilder(options);
    fbInstances.push({ FormBuilder: newForm, PageName: newPageName, PageId: pageId });
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function initFbTabs() {
    $(fbPages).tabs({
        beforeActivate: function (event, ui) {
            if (ui.newPanel.selector === "#new-page") {
                return false;
            }
        }
    });
}

function setupFileUploader() {
    // debugger;

    $('#surveyMedia').fileupload({
        url: '/Umbraco/Surface/Survey/saveFile',
        //progressall: function (e, data) {
        //    var progress = parseInt(data.loaded / data.total * 100, 10);
        //    var progress = parseInt(data.loaded / data.total * 100, 10);
        //    $('#progress-surveyLogo .bar').css(
        //        'width',
        //        progress + '%'
        //    );
        //},
        add: function (e, data) {
            var jqXHR = data.submit()
                .success(function (result, textStatus, jqXHR) {
                    //debugger;
                    // alert('success..');

                })
                .error(function (jqXHR, textStatus, errorThrown) {
                    debugger;
                    alert('Error..' + errorThrown);
                })
                .complete(function (result, textStatus, jqXHR) {
                    mediaUrl = result.responseJSON.path;
                    $('#surveyMedia').parent().append('<p class="text-success">file uploaded successfully...</p>');
                    //alert('complete..');
                });
        },
    });

}