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

// TODO: Use Pomisies and Generators

function animateHeader () {
    document.getElementById('header-content').setAttribute('content-visible', 'true');
}

var presentation = (function() {
    var opened = opened || {title: undefined, number: undefined},
        isRunning = isRunning || false;
    var previousOpened = previousOpened || undefined;

    var presentationItem = document.getElementsByClassName('presentation-item');
    var presentationDetails = document.getElementById('presentation-item-details');

    function close() {
        if (typeof opened.number === "number") {
            requestAnimationFrame(function() {
                presentationItem[opened.number].setAttribute('extended', 'false');
                presentationDetails.setAttribute('in-details', 'false');
                setTimeout(function () {
                  //console.log(clicked);
                    previousOpened = opened.number;
                    opened.number = undefined;
                }, 0); // Put it in the next event loop tick
            });
        }
    }
    function open(clicked, url) {
        // TODO: Store and Fetch things from Cache if available
        if (clicked !== previousOpened) {
            var http = new XMLHttpRequest();

            http.onreadystatechange = check;
            http.open('GET', url);
            http.send();

            function check() {
                if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                    presentationDetails.innerHTML = http.responseText;
                }
            }
        }
        if (isRunning == false) {

            isRunning = true;
            //make things happen
            if (typeof(opened.number) == "number") {
                presentationItem[opened.number].setAttribute('extended', 'false');
            }
            presentationItem[clicked].setAttribute('extended', 'true');
            presentationDetails.setAttribute('in-details', 'true');
            // wait so it doesn't conflict with the runnig transition
            setTimeout(function() {
                opened.number = clicked;
                isRunning = false;
            }, 0); // Put it in the next event loop tick
        }
    }

    return {
        open: open,
        close: close,
        opened: opened.number,
        isRunning: isRunning
    };
})();
