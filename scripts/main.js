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

function animateHeader() {
    document.getElementById('header-content').setAttribute('content-visible', 'true');
    presentation.initialize();
}

var Presentation = {
    open: function() {},
    close: function() {},
    insert: function() {}
};
var ChartFlow = Object.create(Presentation);
ChartFlow.setup = function() {
    Object.defineProperty(this, 'isSetup', {
        value: true,
        writeable: false
    });
    this.isOpen = false;
    this.isRunning = false;
    this.active = -1;
    this.rootFolder = '/projects/';
    this.XHRDefault = '.html'; // TODO: Provide a getter and setter, so that  you get 'HTML' instead of the actual value '.html'
    this.target = document.getElementsByClassName('presentation-item'); // Should go into Presentation object
    this.targetChartDetails = document.getElementById('presentation-item-details');
    this.children = {};

    this.testOutput = function() {
        console.log('HURRA');
    };
};
ChartFlow.build = function() {
    console.log('LEL');
};
ChartFlow.createChild = function(name, ...attributes) {
    var newChild = Object.create(ChartItem);
    this.children[name] = newChild;
    this.children[name].initialize();
    return this.children; // IDEA: return 'true' for success and 'false' for failjure
};
ChartFlow.release = function() {

    requestAnimationFrame(function() {
        this.target[this.active].setAttribute('extended', 'false');
        this.targetChartDetails.setAttribute('in-details', 'false');
    }.bind(this));
};
ChartFlow.load = function(element) {
    var url = element.getAttribute('href');
    var http = new XMLHttpRequest();

    http.onreadystatechange = function check() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            this.targetChartDetails.innerHTML = http.responseText;
        }
    }.bind(this);
    http.open('GET', url);
    http.send();

    if (this.isRunning == false) {
        this.isRunning = true;

        element.setAttribute('extended', 'true');
        this.targetChartDetails.setAttribute('in-details', 'true');

        setTimeout(function() {
            this.active = element.getAttribute('position');
            this.isRunning = false;
        }.bind(this), 0); // Put it in the next event loop tick
    }
};

var ChartItem = {};
ChartItem.initialize = function() {
    console.log('OMG :O');
};
ChartItem.load = function() {
    console.log('unbelievable');
};

var chartFlow1 = Object.create(ChartFlow);
chartFlow1.setup();

// Public API
// ChartFlow.setup()
// ChartFlow.createChild()
// ChartFlow.build()
// ChartFlow.load()
// ChartFlow.release()
// ChartItem.load()
