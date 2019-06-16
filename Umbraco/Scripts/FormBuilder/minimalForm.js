﻿$.fn.upform = function () {
    var $this = $(this);
    var container = $this.find(".upform-main");

    $($this).submit(function () {
        return false;
    });

    $(container).find(".input-block").not(".input-block input").on("click", function () {
        rescroll(this);
    });

    $(container).find(".input-block input").keypress(function (e) {
        // debugger;
        var code = e.keyCode || e.which;
        if (code === 13) {
            if ($(this).hasClass("required") && $(this).val() == "") {
                //validate optionally
            } else moveNext(this);
        }
    });

    $(window).on("scroll", function () {
        $(container).find(".input-block").each(function () {
            var etop = $(this).offset().top;
            var diff = etop - $(window).scrollTop();
            if (diff > 100 && diff < 300) {
                reinitState(this);
            }
        });
    });

    function reinitState(e) {
        $(container).find(".input-block").removeClass("active");

        $(container).find(".input-block input").each(function () {
            $(this).blur();
        });
        $(e).addClass("active");
        // debugger;

        var el = $(e).find('.form-control')[0];
        $(el).focus();
    }

    function rescroll(e) {
        //debugger;
        $(window).scrollTo($(e), 200, {
            offset: { left: 100, top: -200 },
            queue: false
        });
    }

    function reinit(e) {
        reinitState(e);
        rescroll(e);
    }

    function moveNext(e) {
        $(e).parent().parent().next().click();
    }

    function movePrev(e) {
        $(e).parent().parent().prev().click();
    }
};

