/*
bootstrap-utils.js - https://github.com/bacchilu/bootstrap-utils

An easy encapsulation of bootstrap alerts and modal dialogs.
See a demo on http://www.lucabacchi.it/apps/bootstrap-utils

Luca Bacchi <bacchilu@gmail.com> - http://www.lucabacchi.it
*/


var BootstrapUtils = (function () {

    var templates = {};
    var loadTemplates = function () {
        _.each($("script.template"), function (element) {
            templates[$(element).data("id")] = _.template($(element).html());
        });        
    };
    var getTemplate = function (id) {
        return templates[id];
    };


    var createAlert = function (options) {

        var defaults = {container: $("body"),  timeout: 10};
        var options = $.extend({}, defaults, options);

        var container = options.container;
        var timeout = options.timeout;

        var getAlert = function (content, alertClass) {
            var t;

            var dom = getTemplate("alert")();
            var alertDom = $(dom);
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
                return getAlert(content, "alert-success");
            },

            info: function (content) {
                return getAlert(content, "alert-info");
            },

            warning: function (content) {
                return getAlert(content, "alert-warning");
            },

            danger: function (content) {
                return getAlert(content, "alert-danger");
            }
        };
    };

    var createDialog = function (title) {

        var append = function (jqItem) {
            jqDialog.find(".modal-body form").append(jqItem);
        };

        var idMapper = {};
        var addWidget = function (type, options) {

            var defaults = {label: "",  placeholder: "", value: ""};
            options = $.extend({}, defaults, options);

            var id = _.uniqueId("modal_");
            var t = getTemplate(type);
            var jqItem = $(t({"id": id, "label": options.label, "placeholder": options.placeholder, "value": options.value}));
            append(jqItem);

            var userId = options["id"];
            if (userId === undefined)
                idMapper[id] = id;
            else
                idMapper[id] = userId;
        };

        var getWidgets = function () {
            var ret = [];
            var items = jqDialog.find(".modal-body form").children().find(".form-control");
            _.each(items, function (element) {
                ret.push($(element));
            });
            return ret;
        };

        var t = getTemplate("modal");
        var jqDialog = $(t({"id": _.uniqueId("modal_"), "title": title}));
        jqDialog.on("hidden.bs.modal", function (e) {
            jqDialog.remove();
        });

        var insert = function (data) {};
        jqDialog.find(".insert").on("click", function () {
            var ret = {};
            _.each(getWidgets(), function (element) {
                var id = idMapper[element.attr("id")];
                ret[id] = element.val();
            });
            insert(ret);
        });

        jqDialog.find(".edit").on("click", function () {
            jqDialog.find(".edit").hide();
            jqDialog.find(".insert").show();
            jqDialog.find(".insert").html("Aggiorna");
            jqDialog.find(".remove").show();
            setDisable(false);
        });

        $("body").prepend(jqDialog);

        var setDisable = function (value) {
            // Abilita o disabilita tutti i widget più il pulsante insert

            var widgets = getWidgets();
            widgets.push(jqDialog.find(".insert"));

            _.each(widgets, function (element) {
                if (value)
                    element.attr("disabled", "disabled");
                else
                    element.removeAttr("disabled");
            });
        };

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
            addString: function (options) {
                addWidget("string", options);
            },
            setError: function (id, msg) {
                var nativeId = _.invert(idMapper)[id];
                var w = $("#" + nativeId).closest("div.form-group");
                w.addClass("has-error");
                var label = w.find(".control-label");
                label.html(msg);
                label.show();

                var t;
                clearTimeout(t);
                t = setTimeout(function () {
                    w.removeClass("has-error");
                    label.html("");
                    label.hide();
                }, 10000);

                setDisable(false);
            },
            create: function () {
                jqDialog.modal("show");
            },
            view: function () {
                setDisable(true);
                jqDialog.find(".insert").hide();
                jqDialog.find(".edit").show();
                jqDialog.modal("show");
            },
            hide: function () {
                jqDialog.modal("hide");
            },
            insert: function (fn) {
                insert = fn;
            },
            waiting: function () {
                // Disabilita form e pulsanti

                setDisable(true);
            }
        };
    };


    return {
        loadTemplate: function (templateUrl, cb) {
            $("body").append($("<div>").load(templateUrl, function () {
                loadTemplates();
                cb({
                    createDialog: createDialog,
                    createAlert: createAlert
                });
            }));
        }
    };
})();