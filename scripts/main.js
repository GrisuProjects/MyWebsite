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

var colors = ['forestgreen', 'rgba(237, 177, 26, 1)', 'rgba(65, 119, 153, 1)'];

var mainSwitch = (function() {
    var active = undefined;

    function _change(clicked) {
        var section = document.getElementsByClassName('section'),
            measure = document.getElementsByClassName("measuringWrapper")[clicked];

        if (typeof(mainSwitch.active) == "number") {
            section[mainSwitch.active].setAttribute('extended', 'false');
            document.getElementsByClassName('sectionText')[mainSwitch.active].style.height = 0 + "px";
        }
        section[clicked].setAttribute('extended', 'true');
        document.getElementsByClassName('sectionText')[clicked].style.height = measure.clientHeight + 'px';

        // set color
        document.getElementById('projects').style.backgroundColor = colors[clicked];
    }

    function init(clicked) {
        if (clicked !== mainSwitch.active) {
            // make things happen
            _change(clicked);

            mainSwitch.active = clicked;
        }
    }

    return {
        init: init,
        active: active
    };
})();

var adjustHeight = (function() {
    function mainSwitch() {
        if (typeof(mainSwitch.active) == "number") {
            var measuringWrapper = document.getElementsByClassName("measuringWrapper")[mainSwitch.active],
                sectionText = document.getElementsByClassName('sectionText')[mainSwitch.active];

            sectionText.style.height = measuringWrapper.clientHeight + 'px';
        }
    }

    function footer() {
        var growDiv = document.getElementById('footer-size'),
            wrapper = document.querySelector('footer');

        growDiv.style.height = wrapper.clientHeight + 'px';
    }
    return {
        mainSwitch: mainSwitch,
        footer: footer
    }
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
