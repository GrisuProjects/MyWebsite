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

var green = ['rgba(49, 175, 61, 1)', 'rgba(72, 186, 83, 0.8)'],
    orange = ['rgba(237, 177, 26, 1)', 'rgba(244, 192, 36, 0.8)'],
    blue = ['rgba(65, 119, 153, 1)', /*'rgba(56, 66, 153, 0.8)'*/'rgba(64, 153, 142, 0.8)'];
var colors = [green, orange, blue];

function dateTime() {
    var d = new Date(), month, hour, min, sec;

    switch (d.getMonth()) {
    case 0:
        month = 'January';
        break;
    case 1:
        month = 'February';
        break;
    case 2:
        month = 'March';
        break;
    case 3:
        month = 'April';
        break;
    case 4:
        month = 'May';
        break;
    case 5:
        month = 'June';
        break;
    case 6:
        month = 'July';
        break;
    case 7:
        month = 'August';
        break;
    case 8:
        month = 'September';
        break;
    case 9:
        month = 'October';
        break;
    case 10:
        month = 'November';
        break;
    case 11:
        month = 'December';
        break;
    }

    document.getElementsByTagName('h1')[0].innerHTML = month + " " + d.getFullYear();
    // Display current time
    setInterval(function () { // IMPLEMENT: if statement that hour and minute are only updated if nessecary
        hour = new Date().getHours();
        min = new Date().getMinutes();
        sec = new Date().getSeconds();
        document.getElementsByTagName('time')[0].innerHTML = ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
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
        grow = document.getElementsByClassName('grow');

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
          section[clicked].style.boxShadow = '0 0 10px 0px rgba(0, 0, 0, 0.25)';
          // set colors
          section[clicked].style.backgroundColor = colors[clicked][0];
          document.getElementById('projects').style.backgroundColor = colors[clicked][1];
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
      document.getElementsByClassName('grow')[active].style.height = measure.clientHeight + 'px';
    }, 400);
}

window.addEventListener("resize", greatViewResize); // resizes the .section element in #projects
window.addEventListener("resize", footerSize); // resizes the .footer-size element
