# alert-notifier.js

An easy encapsulation of [Bootstrap](http://getbootstrap.com) [Alert messages](http://getbootstrap.com/javascript/#alerts).

A demo is [here](http://www.lucabacchi.it/apps/bootstrap-alert).

## Usage

Initialization of the library:

    var notifier = AlertNotifier({container: $("#container")});

*container* is where the alert is appended. *body* is the default.

    var content = $("<p>This is a very simple Alert. It is appended to the container div. It closes itselph in 10 secs.</p>");
    notifier.info(content);

The library closes every alert after 10 seconds. You can configure this behaviour in this way:

    var notifier = AlertNotifier({container: $("#container"), timeout: 5});

If you set a timeout of *0*, you have to close the Alert by hand.

For more complex examples se the [demo](http://www.lucabacchi.it/apps/bootstrap-alert) source code.

## License

This software is distributed under the terms of the MIT license.