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
'use strict'; // TODO: function form of 'use strict'

var green = ["forestgreen", 'rgba(49, 175, 61, 1)', 'rgba(72, 186, 83, 0.8)'],
    orange = ['rgba(237, 177, 26, 1)', 'rgba(244, 192, 36, 0.8)'],
    blue = ['rgba(65, 119, 153, 1)', /*'rgba(56, 66, 153, 0.8)'*/'rgba(64, 153, 142, 0.8)'];
var colors = [green, orange, blue];

function currentTime() {

    // Display current time
    var  hour = new Date().getHours(),
        min = new Date().getMinutes(),
        sec = new Date().getSeconds(),
        time = document.getElementsByTagName('time')[0];

    // Update current Time
    setInterval(function () {
        sec++;
        if (sec == 56) // Check to prevent from inaccuracy
          sec = new Date().getSeconds();

        if (sec == 60) {
            sec = 0;
            min++;
            if (min == 60) {
                min = 0;
                hour++;
                if (hour == 24) {
                    hour = 0;
                }
            }
        }
        time.innerHTML = ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
    }, 1000);

    setTimeout(function () {
      document.getElementsByTagName('time')[0].style.height = '2em';
    }, 1000);
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
        sectionHead[active].style.padding = '1em 0';
        section[active].style.backgroundColor = 'transparent';
        section[active].style.boxShadow = 'none';

        /*make clicked section to active*/
          sectionHead[clicked].style.fontSize = '180%';
          sectionHead[clicked].style.padding = '0.7em 0 0.5em';
          section[clicked].style.boxShadow = '2px 0 9px 0px rgba(0, 0, 0, 0.12)';
          // set colors
          document.getElementById('projects').style.backgroundColor = colors[clicked][0];
          section[clicked].style.backgroundColor = 'rgba(255, 255, 255, 0.15)';

          active = clicked;
    }
    // set the proper height
        var measure = document.getElementsByClassName("measuringWrapper")[clicked];
        grow[clicked].style.height = measure.clientHeight + 'px';

    /*http://stackoverflow.com/a/13938747*/
}

function greatViewResize() {
    setTimeout(function () {
      var measure = document.getElementsByClassName("measuringWrapper")[active];
      document.getElementsByClassName('sectionText')[active].style.height = measure.clientHeight + 'px';
    }, 400);
}

window.addEventListener("resize", greatViewResize); // resizes the .section element in #projects
window.addEventListener("resize", footerSize); // resizes the .footer-size element
