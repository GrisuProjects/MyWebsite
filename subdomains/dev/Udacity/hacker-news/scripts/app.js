/**
 *
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
APP.Main = (function() {

    var $ = document.querySelector.bind(document);

    var isFirstTime = true;
    var stories = null;
    var storyStart = 0;
    var count = 100;
    var main = $('main');
    var inDetails = false;
    var storyLoadCount = 0;
    var localeData = {
        data: {
            intl: {
                locales: 'en-US'
            }
        }
    };

    var tmplStory = $('#tmpl-story').textContent;
    var tmplStoryDetails = $('#tmpl-story-details').textContent;
    var tmplStoryDetailsComment = $('#tmpl-story-details-comment').textContent;

    if (typeof HandlebarsIntl !== 'undefined') {
        HandlebarsIntl.registerWith(Handlebars);
    } else {

        // Remove references to formatRelative, because Intl isn't supported.
        var intlRelative = /, {{ formatRelative time }}/;
        tmplStory = tmplStory.replace(intlRelative, '');
        tmplStoryDetails = tmplStoryDetails.replace(intlRelative, '');
        tmplStoryDetailsComment = tmplStoryDetailsComment.replace(intlRelative, '');
    }

    var storyTemplate =
        Handlebars.compile(tmplStory);
    var storyDetailsTemplate =
        Handlebars.compile(tmplStoryDetails);
    var storyDetailsCommentTemplate =
        Handlebars.compile(tmplStoryDetailsComment);

    function onStoryData(key, details) {
        requestAnimationFrame(function() {

            var item = document.getElementById('s-' + key);
            if (item) {
                details.time *= 1000;
                var html = storyTemplate(details);
                item.innerHTML = html;
                item.addEventListener('click', onStoryClick.bind(this, details));
                item.classList.add('clickable');

                // Tick down. When zero we can batch in the next load.
                storyLoadCount--;
            }
        });
    }

    function onStoryClick(details) {

        !isFirstTime && document.body.removeChild(document.getElementsByTagName('section')[0]);
        requestAnimationFrame(create);

        function create() {
            setTimeout(showStory, 70);

            if (details.url)
                details.urlobj = new URL(details.url);

            var comment;
            var commentsElement;
            var storyHeader;
            var storyContent;

            var storyDetailsHtml = storyDetailsTemplate(details);
            var kids = details.kids;
            var commentHtml = storyDetailsCommentTemplate({
              by: '', text: 'Loading comment...'
            });

            storyDetails = document.createElement('section');
            storyDetails.setAttribute('id', 'sd-' + details.id);
            storyDetails.classList.add('story-details');
            storyDetails.innerHTML = storyDetailsHtml;

            document.body.appendChild(storyDetails);

            var closeButton = storyDetails.querySelector('.js-close');
            closeButton.addEventListener('click', hideStory);

            storyHeader = storyDetails.querySelector('.js-header');
            storyContent = storyDetails.querySelector('.js-content');
            var headerHeight = storyHeader.getBoundingClientRect().height;
            storyContent.style.paddingTop = headerHeight + 'px';

            if (typeof kids === 'undefined')
              return;

            commentsElement = storyDetails.querySelector('.js-comments');
            for (var k = 0; k < kids.length; k++) {

              comment = document.createElement('aside');
              comment.setAttribute('id', 'sdc-' + kids[k]);
              comment.classList.add('story-details__comment');
              comment.innerHTML = commentHtml;
              commentsElement.appendChild(comment);

              // Update the comment with the live data.
              APP.Data.getStoryComment(kids[k], function(commentDetails) {

                commentDetails.time *= 1000;

                var comment = commentsElement.querySelector(
                    '#sdc-' + commentDetails.id);
                comment.innerHTML = storyDetailsCommentTemplate(
                    commentDetails,
                    localeData);
              });
            }
            isFirstTime = false;
        }

    }
    // Vastly simplified showStory() and hideStory()
    // ...do it with CSS
    function showStory() {
        if (inDetails)
            return;

        var storyDetails = document.getElementsByClassName('story-details')[0];
        // make the animation happening
        //PS: It doesn't matter what value 'visible' has
        //it just should not be 'false'
        storyDetails.setAttribute("visible", "true");
        inDetails = true;
    }

    function hideStory() {
        if (!inDetails)
            return;

        var storyDetails = document.getElementsByClassName('story-details')[0];
        // make the animation happening!
        storyDetails.setAttribute("visible", "false");
        inDetails = false;
    }

    main.addEventListener('scroll', function() {
          var header = $('header');
          var headerTitles = header.querySelector('.header__title-wrapper');
          var body = document.body.classList;

        requestAnimationFrame(function() {
            var scrollTop = main.scrollTop;
            var scrollHeight = main.scrollHeight;
            var scrollTopCapped = Math.min(70, scrollTop);
            var scaleString = 'scale(' + (1 - (scrollTopCapped / 300)) + ')';

            header.style.height = (156 - scrollTopCapped) + 'px';
            headerTitles.style.webkitTransform = scaleString;
            headerTitles.style.transform = scaleString;

            // Add a shadow to the header.
            if (scrollTopCapped === 70)
                body.add('raised');
            else
                body.remove('raised');

            // Check if we need to load the next batch of stories.
            if (scrollTop > (scrollHeight-1800))
                loadStoryBatch();
        });
    });

    function loadStoryBatch() {

        if (storyLoadCount > 0)
            return;

        storyLoadCount = count;

        var end = storyStart + count;
        for (var i = storyStart; i < end; i++) {

            if (i >= stories.length)
                return;

            var key = String(stories[i]);
            var story = document.createElement('div');
            story.setAttribute('id', 's-' + key);
            story.classList.add('story');
            story.innerHTML = storyTemplate({
                title: '...',
                score: '-',
                by: '...',
                time: 0
            });
            main.appendChild(story);

            APP.Data.getStoryById(stories[i], onStoryData.bind(this, key));
        }

        storyStart += count;

    }

    // Bootstrap in the stories.
    APP.Data.getTopStories(function(data) {
        stories = data;
        loadStoryBatch();
        main.classList.remove('loading');
    });

})();
