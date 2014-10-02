/*
alert-notifier.js - https://github.com/bacchilu/bootstrap-alert

An easy encapsulation of bootstrap alerts.
See a demo on http://www.lucabacchi.it/apps/bootstrap-alert

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