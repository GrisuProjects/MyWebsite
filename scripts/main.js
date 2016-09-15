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
}

var Presentation = {
    open: function() {},
    close: function() {},
    insert: function(elem) {
        this.targetElement.appendChild(elem);
    }
};
var ChartFlow = Object.create(Presentation);
ChartFlow.setup = function(target) {
    Object.defineProperty(this, 'isSetup', {
        value: true,
        writeable: false
    });
    this.uniqueName = 'flowChart1';
    this.isOpen = false;
    this.isRunning = false;
    this.position = 0;
    this.active = -1;
    this.rootFolder = '/projects/';
    this.XHRDefault = '.html'; // TODO: Provide a getter and setter, so that  you get 'HTML' instead of the actual value '.html'
    this.targetElement = target;
    this.targetChildren = document.getElementsByClassName('presentation-item');
    this.targetChartDetails = document.getElementById('presentation-item-details');
    this.onclickAction = 'chartFlow1.load(this)';
    this.test = [];
    this.children = {
        childArray: []
    };

    this.healthCheck = function() {
        // TODO: Build feature-rich test, to check ChartFlows against
    };

    // Get current Elements present in the markup
    var elem = this.targetElement.childNodes;
    for (let i in elem) {
        let name;
        // Add those to the Presentation logic
        //TODO: USE WEAKMAP!
        if ((i.hasAttribute === 'function') && (i.hasAttribute('class') !== false) && (i.getAttribute('class') === 'presentation-item')) {
            name = i.getAttribute('name');
            this.createChild(name);
        }
    }
};

ChartFlow.build = function() {

    for (var elem of this.test) {
        this.targetElement.appendChild(elem);
    }
    // Put some controls on
    var text;
    var buttonRight = document.createElement('DIV');
    buttonRight.setAttribute('class', 'presentation-control right');
    buttonRight.appendChild(document.createTextNode("RIGHT"));
    var buttonLeft = document.createElement('DIV');
    buttonLeft.setAttribute('class', 'presentation-control left');
    buttonLeft.appendChild(document.createTextNode("LEFT"));

    var pres = document.getElementsByClassName('presentation')[0];
    pres.appendChild(buttonLeft);
    pres.appendChild(buttonRight);

    buttonRight.addEventListener('click', function() {
        this.position -= 400;
        this.targetElement.setAttribute('style', 'transform: translateX(' + this.position + 'px)');
    }.bind(this));

    buttonLeft.addEventListener('click', function() {
        this.position += 400;
        this.targetElement.style['transform'] = 'translateX(' + this.position + 'px)';
    }.bind(this));
};
ChartFlow.control = function(e, type = 'LEFT') {
    console.log(this);
    var num = num || 100;
    switch (type) {
        case 'RIGHT':

            break;
        case 'LEFT':
            console.log(this.parentElement);
            document.getElementById('projects').setAttribute('style', 'transform: translateX(' + num + 'px)');
            num += 100;
            break;
        default:

    }
};
ChartFlow.lel = {
    omg: function() {
        console.log(this);
    },
    wow: 'not bad'
};

ChartFlow.skeleton = (function() {
    var template = document.createElement('DIV');

    function addTag(tag, attArr) {
        var elem = document.createElement(tag);

        for (var arr of attArr) {
            helper(...arr);
        }

        function helper(attName, ...attValues) {
            elem.setAttribute(attName, attValues.join(' '));
        }
        template.appendChild(elem);
    }

    function getTemplate() {
        return template.cloneNode(true);
    }
    return {
        addTag: addTag,
        getTemplate: getTemplate
    }
})();

ChartFlow.createChild = function(name, ...attributes) {
    var newChild = this.skeleton.getTemplate();

    newChild.setAttribute('name', name);
    newChild.setAttribute('href', this.rootFolder + name + this.XHRDefault);
    //newChild.setAttribute('class', attributes.join(' '));
    newChild.setAttribute('onclick', this.onclickAction);
    newChild.setAttribute('index', this.children.childArray.length);
    newChild.firstChild.setAttribute('src', newChild.firstChild.getAttribute('src') + name + '.svg');

    this.test.push(newChild);
    this.children.childArray.push(name);
    //return this.children; // IDEA: return 'true' for success and 'false' for failjure
};

ChartFlow.release = function() {

    requestAnimationFrame(function() {
        this.targetChildren[this.active].setAttribute('extended', 'false');
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
            this.active = element.getAttribute('index');
            this.isRunning = false;
        }.bind(this), 0); // Put it in the next event loop tick
    }
};

ChartFlow.update = function() {
    this.insert(this.test[0]);
}

var ChartItem = {
    load: function() {
        console.log('unbelievable');
    }
};

var chartFlow1 = Object.create(ChartFlow);
//chartFlow1.setup(document.getElementById('projects'));
chartFlow1.skeleton.addTag('img', [
    ['class', 'logo'],
    ['src', '/styles/logos/'],
    ['alt', 'description']
]);
/*chartFlow1.createChild('colearning-wien', 'presentation-item');
chartFlow1.createChild('wallpaper', 'presentation-item');
chartFlow1.createChild('websites', 'presentation-item');*/

//chartFlow1.build();

/** Public API (draft)
 * ChartFlow.setup()
 * ChartFlow.createChild()
 * ChartFlow.build()
 * ChartFlow.load()
 * ChartFlow.release()
 * ChartItem.load()
 */
