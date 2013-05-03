function createAlert (jqElem) {
    jqElem.find(".close").on("click", function(e) {
        $(this).parent().hide();
    });

    var timeOutManager = {
        setTimeout: function (f) {
            clearTimeout(this.innerTimeout);
            this.innerTimeout = setTimeout(f, 10000);
        }
    };

    var showAlert = function (cssClass, str) {
            jqElem.hide();
            jqElem.removeClass("alert-success");
            jqElem.removeClass("alert-error");
            jqElem.addClass(cssClass);
            jqElem.find("p").html(str);
            jqElem.show();
            timeOutManager.setTimeout(function () {
                jqElem.hide();
            });
    }

    return {
        append: function (jqAppended) {
            jqElem.find("p").append(jqAppended);
        },

        success: function (str) {
            showAlert("alert-success", str);
        },

        error: function (str) {
            showAlert("alert-error", str);
        }
    };
}