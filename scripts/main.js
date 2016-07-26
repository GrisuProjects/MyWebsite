/*
This file is part of my website.

Copyright (C) 2016  Christian Kaindl

This website is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This website is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this website.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

var colors = [];

var presentation = (function() {
    var active = undefined,
        isRunning = false;

    function change(clicked, active) {
        if (clicked !== active && presentation.isRunning == false) {
            var presentationItem = document.getElementsByClassName('presentation-item');

            presentation.isRunning = true;
            //make things happen
            if (typeof(presentation.active) == "number") {
                presentationItem[presentation.active].setAttribute('extended', 'false');
            }
            presentationItem[clicked].setAttribute('extended', 'true');
            // wait so it doesn't conflict with the runnig transition
            setTimeout(function() {
                presentation.active = clicked;
                presentation.isRunning = false;
            }, 500);
        }
    }

    function close() {
        var presentationItem = document.getElementsByClassName('presentation-item');
        console.log("yeah");
        console.log(presentation.active);
        if (presentation.active != undefined) {
            console.log("YEAH");
            presentationItem[presentation.active].setAttribute('extended', 'false');
            active = undefined;
            console.log(presentation.active);
        }
    }

    return {
        close: close,
        switch: change,
        active: active,
        isRunning: isRunning
    };
})();

/*function currentTime() {
    var w;

    if (typeof(Worker) !== 'undefined') {
        if (typeof(w) == 'undefined') { // Look if this worker is in use
            w = new Worker('scripts/worker.js');
        }
        w.onmessage = function(event) {
            document.getElementsByTagName('TIME')[0].innerHTML = event.data;
        };
    } else {
        console.log("No Worker support: Cannot dislay time");
    }

    // Reveal time
    setTimeout(function() {
        document.getElementsByTagName('time')[0].style.height = '2em';
    }, 1500);
}*/
