jQuery($ => {

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
            //{
            //  label: "Thank you message",
            //  type:'textarea',
            //  subtype: "tinymce",
            //  icon:'&#128077;',
            //  value:'<h2 style="text-align: center;"><strong>Thank you</strong></h2><blockquote><p style="text-align: center;">Have a great day</p></blockquote><p style="text-align: center;"><strong><img src="https://www.humorside.com/wp-content/uploads/2017/12/thank-you-meme-01.jpg" alt="" width="50%" /></strong></p>'
            //}
        ],
        typeUserAttrs: {
            starRating: {
                noStars: {
                    label: 'No. of Stars',
                    options: {
                        '5': '5',
                        '10': '10',
                    },
                },
                size: {
                    label: 'Size',
                    options: {
                        40: 'Small',
                        60: 'Medium',
                        80: 'Large'
                    },
                }
            }
        }

    };


    var fbPages = $(document.getElementById("form-builder-pages"));
    var fbInstances = [];
    var frInstances = [];

    $(fbPages).tabs({
        beforeActivate: function (event, ui) {
            if (ui.newPanel.selector === "#new-page") {
                return false;
            }
        }
    });

    $(".add-page-tab").on('click', function () {
        var tabCount = document.getElementById("tabs").children.length;
        var tabId = "page-" + tabCount.toString();
        var newPageName = "page " + tabCount.toString();

        var newPageHtml = '<div id="' + tabId + '" class="fb-editor"></div>';
        var newTabHtml = '<li ><a contenteditable="true" class="' + tabId + 'newPageName" href="#' + tabId + '">' + newPageName + '</a></li>';


        $(newPageHtml).insertBefore($(document.getElementById("new-page")));
        var parentt = $(this).parent();
        $(newTabHtml).insertBefore(parentt);

        $(fbPages).tabs("refresh");
        $(fbPages).tabs("option", "active", tabCount - 1);

        var newPageitem = document.getElementById(tabId);
        var newForm = $(newPageitem).formBuilder(options);
        fbInstances.push({ FormBuilder: newForm, PageName: newPageName });
    });

    fbInstances.push({ FormBuilder: $(".fb-editor").formBuilder(options), PageName: "Page 1" });


    // Attach a submit handler to the form
    $("#form-builder-pages").submit(function (event) {

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
       
        var surveyName = $(this).find("input[name='SurveyName']").val();
        var surveyContent = [];

        fbInstances.map(fb => {
            surveyContent.push({ PageName: fb.PageName, FormFields: fb.FormBuilder.actions.getData() });
        });
        var model = { SurveyName: surveyName, SurveyContent: JSON.stringify(surveyContent) };
        debugger;
        // Send the data using post
        var posting = $.post('/Umbraco/Surface/Survey/SaveSurvey', model );

        // Put the results in a div
        posting.done(function (data) {
            alert(data);
            //var content = $(data).find("#content");
            //$("#result").empty().append(content);
        });
        
    });

    $(document.getElementById("save-all")).click(function () {

        var model = [];

        fbInstances.map(fb => {
            // alert(fb.PageName);
            // var pName=$("."+fb.PageName).html();
            // alert(fb.pName);
            model.push({ PageName: fb.PageName, FormFields: fb.FormBuilder.actions.getData() });

            // console.log(fb.actions.getData());
            // console.log(JSON.stringify(fb.actions.getData()));
            //return fb.formData;
        });



        console.log(JSON.stringify(model));
        console.log(model);
        frInstances.push(
            $('.fb-render').formRender({
                formData: fbInstances[0].FormBuilder.actions.getData()
            }));
    });

    $(document.getElementById("display-all")).click(function () {
        //var formRenderInstance = $('.fb-render').formRender();
        console.log(frInstances[0].userData);
    });

});



