/* app.js
 *
 * This is the RSS feed reader application. It uses Google
 * Feed Reader API to grab RSS feeds as a JSON object. It
 * also uses the Handlebars templating library and jQuery.
 */

//The names and URLs to all of the feeds.
var allFeeds = [{
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
}, {
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
}, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

/* Initialize the application. The Google Feed Reader API is loaded
   asynchonously and will call this function when the API is loaded.
 */
function init() {
    //Load the first feed defined (index of 0)
    loadFeed(0);
}

/* This function performs everything necessary to load a feed using
   the Google Feed Reader API. Feeds are referenced by their index
   position and this function also supports a callback as a second
   parameter that is called after everything has run successfully.
 */
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    $.ajax({
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data: JSON.stringify({
            url: feedUrl
        }),
        contentType: "application/json",
        success: function (result) {

            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,
                entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName); //Set the header text
            container.empty(); //Empty out all previous entries

            /* Loop through the entries just loaded via the Feed Reader API
               and then parse that entry against the entryTemplate and append
               the resulting HTML to the list of entries on the page.
             */
            entries.forEach(function (entry) {
                container.append(entryTemplate(entry));
            });

            //call the done() function
            if (cb) {
                cb();
            }
        },
        error: function () {
            //run only the callback without attempting to parse result due to error
            if (cb) {
                cb();
            }
        },
        dataType: "json"
    });
}

/* Google API: Loads the Feed Reader API and defines what function
   to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* Functionality is heavily reliant upon the DOM, so place the code in
   the $() function to ensure it doesn't execute until the DOM is ready.
 */
$(function () {
    var feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through and assign an id property to each of the feeds based
       upon its index within the array. Then parse that feed against the
       feedItemTemplate and append it to the list of all available feeds.
     */
    allFeeds.forEach(function (feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));
        feedId++;
    });

    /* When a link in the feedList is clicked on, hide the menu, load the
       feed, and prevent the default action from occurring.
     */
    feedList.on('click', 'a', function () {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, toggle a class on the body
       to perform the hiding/showing of the menu.
     */
    menuIcon.on('click', function () {
        $('body').toggleClass('menu-hidden');
    });

}());
