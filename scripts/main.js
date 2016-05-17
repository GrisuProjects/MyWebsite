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

var colors = ["forestgreen", 'rgba(237, 177, 26, 1)', 'rgba(65, 119, 153, 1)'];

function currentTime() { // TODO: Worker
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
}
// ===============================================================================
function footerSize() {
    var growDiv = document.getElementById('footer-size'),
        wrapper = document.querySelector('footer');

    growDiv.style.height = wrapper.clientHeight + 'px';
}
// ===============================================================================
var active = 2;

// function for great view in #projects when clicked
function greatView(clicked) {

    var section = document.getElementsByClassName('section'),
        sectionHead = document.getElementsByClassName('sectionHeading'),
        grow = document.getElementsByClassName('sectionText');

    // only animate when an other section is clicked
    if (clicked !== active) {
        /* make active section back to default*/
        grow[active].style.height = '0';
        sectionHead[active].style.fontSize = '110%';
        section[active].style.backgroundColor = 'transparent';
        section[active].style.boxShadow = 'none';

        /*make clicked section to active*/
        sectionHead[clicked].style.fontSize = '180%';
        section[clicked].style.boxShadow = '2px 0 9px 0px rgba(0, 0, 0, 0.12)';
        // set colors
        document.getElementById('projects').style.backgroundColor = colors[clicked];
        section[clicked].style.backgroundColor = 'rgba(255, 255, 255, 0.15)';

        active = clicked;
    }
    // set the proper height
    var measure = document.getElementsByClassName("measuringWrapper")[clicked];
    grow[clicked].style.height = measure.clientHeight + 'px';

    /*http://stackoverflow.com/a/13938747*/
}

function greatViewResize() {
    setTimeout(function() {
        var measure = document.getElementsByClassName("measuringWrapper")[active];
        document.getElementsByClassName('sectionText')[active].style.height = measure.clientHeight + 'px';
    }, 400);
}

window.addEventListener("resize", greatViewResize); // resizes the .section element in #projects
window.addEventListener("resize", footerSize); // resizes the .footer-size element
