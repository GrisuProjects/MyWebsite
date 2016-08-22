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

function animateHeader () {
    document.getElementById('header-content').setAttribute('content-visible', 'true');
}

var presentation = (function() {
    var active = active || undefined,
        isRunning = isRunning || false;

    function change(clicked) {
        if (clicked !== active && isRunning == false) {
            var presentationItem = document.getElementsByClassName('presentation-item');

            isRunning = true;
            //make things happen
            if (typeof(active) == "number") {
                presentationItem[active].setAttribute('extended', 'false');
            }
            presentationItem[clicked].setAttribute('extended', 'true');
            // wait so it doesn't conflict with the runnig transition
            setTimeout(function() {
                active = clicked;
                isRunning = false;
            }, 500);
        }
    }

    function close() {
        var presentationItem = document.getElementsByClassName('presentation-item');

        if (typeof active == "number") {
            requestAnimationFrame(function() {
              presentationItem[active].setAttribute('extended', 'false');
              setTimeout(function () {
                  active = undefined;
              }, 0); // Put it in the next event loop tick
            });
        }
    }
    function open() {
      
    }

    return {
        close: close,
        switch: change,
        active: active,
        isRunning: isRunning
    };
})();
