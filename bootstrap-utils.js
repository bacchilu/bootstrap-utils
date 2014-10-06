/*
bootstrap-utils.js - https://github.com/bacchilu/bootstrap-utils

An easy encapsulation of bootstrap alerts and modal dialogs.
See a demo on http://www.lucabacchi.it/apps/bootstrap-utils

Luca Bacchi <bacchilu@gmail.com> - http://www.lucabacchi.it
*/


var AlertNotifier = function (options) {

    var defaults = {container: $("body"),  timeout: 10};
    var options = $.extend({}, defaults, options);

    var container = options.container;
    var timeout = options.timeout;

    var createAlert = function (content, alertClass) {
        var t;

        var alertDom = $('<div class="alert alert-dismissable"><button type="button" class="close" aria-hidden="true">&times;</button></div>');
        alertDom.addClass(alertClass);
        alertDom.append(content);

        alertDom.on("click", ".close", function () {
            clearTimeout(t);
            alertDom.remove();
            return false;
        });
        container.append(alertDom);

        if (timeout > 0)
            t = setTimeout(function () {
                alertDom.remove();
            }, timeout * 1000);

        return {
            close: function () {
                clearTimeout(t);
                alertDom.remove();
            }
        };
    };

    return {
        success: function (content) {
            return createAlert(content, "alert-success");
        },

        info: function (content) {
            return createAlert(content, "alert-info");
        },

        warning: function (content) {
            return createAlert(content, "alert-warning");
        },

        danger: function (content) {
            return createAlert(content, "alert-danger");
        }
    };
};


var BootstrapDialog = function (title) {

    var append = function (jqItem) {
        jqDialog.find(".modal-body form").append(jqItem);
    };

    var getTemplate = function (id) {
        return templates[id];
    };

    var addWidget = function (type, options) {

        var defaults = {label: "",  placeholder: "", value: ""};
        options = $.extend({}, defaults, options);

        var t = getTemplate(type);
        var jqItem = $(t({"id": _.uniqueId("modal_"), "label": options.label, "placeholder": options.placeholder, "value": options.value}));
        append(jqItem);
    };

    var templates = {};
    _.each($("#template,script"), function (element) {
        templates[$(element).data("id")] = _.template($(element).html());
    });

    var t = getTemplate("modal");
    var jqDialog = $(t({"id": _.uniqueId("modal_"), "title": title}));
    $("body").prepend(jqDialog);

    return {
        addDate: function (options) {
            addWidget("date", options);
        },
        addTextarea: function (options) {
            addWidget("textarea", options);
        },
        addValuta: function (options) {
            addWidget("valuta", options);
        },
        addNumero: function (options) {
            addWidget("number", options);
        },
        show: function () {
            jqDialog.modal("show");
        }
    };
};