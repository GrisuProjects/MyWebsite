'use strict';

var d = new Date(),
    hour = d.getHours(),
    min = d.getMinutes(),
    sec = d.getSeconds(),
    time;

// Update current Time
setInterval(function() {
    d = new Date();
    sec = d.getSeconds();

    /** Only update vars if necessary
     */
    if (sec == 0) {
        min = d.getMinutes();
        if (min == 0) {
            hour = d.getHours();
        }
    }
    time = ('0' + hour).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
    postMessage(time);
}, 1000);
