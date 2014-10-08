# Bootstrap-Utils

An easy encapsulation of [Bootstrap](http://getbootstrap.com) [Alert messages](http://getbootstrap.com/javascript/#alerts) and [Modals](http://getbootstrap.com/javascript/#modals).

A demo is [here](http://www.lucabacchi.it/apps/bootstrap-utils).

## Usage

Initialization of the library:

    BootstrapUtils.loadTemplate("/static/bootstrap-utils.html", function (bUtils) {
        // Usage here
    });

Using this patter I async load the *template file* via an ajax call as an external resource. The *template file* contains definitions for *Alerts* and *Modals*.

*bUtils* is the object I can use to create the components I need.

## Alerts

    var notifier = bUtils.createAlert({container: $("#container")});

*container* is where the alert is appended. *body* is the default.

    var content = $("<p>This is a very simple Alert. It is appended to the container div. It closes itselph in 10 secs.</p>");
    notifier.info(content);

The library closes every alert after 10 seconds. You can configure this behaviour in this way:

    var notifier = bUtils.createAlert({container: $("#container"), timeout: 5});

If you set a timeout of *0*, you have to close the Alert by hand.

## Modals

    var d = bUtils.createDialog("Nuovo Acquisto");
    d.addNumero({placeholder: "Numero Acquisto", value: 1});
    d.addValuta({placeholder: "Cifra"});
    d.addDate({placeholder: "Data"});
    d.addTextarea({placeholder: "Descrizione"});
    d.addDate({label: "Scadenza", placeholder: "Scadenza (facoltativo)"});
    d.show();

## More Examples

For more complex examples se the [demo](http://www.lucabacchi.it/apps/bootstrap-utils) source code.

## License

This software is distributed under the terms of the MIT license.