/* feedreader.js
 *
 *  This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests should be within the $() function, since they require
   DOM elements and to ensure they don't run until the DOM is ready.
 */
$(function () {
    // Test Suite 1
    describe('RSS Feeds', function () {

        // Spec 1 - checks if allFeeds variable is defined and not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Spec 2 - check if url is defined and not empty for each feed
        it('urls are defined and not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Spec 3 - check if name is defined and not empty for each feed
        it('names are defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // Test Suite 2
    describe('The menu', function () {
        const menu = document.querySelector('body');

        // Spec 1 - check if menu element is hidden by default
        it('should be hidden by default', function () {
            expect(menu.classList.contains('menu-hidden')).toBeTruthy();
        });

        // Spec 2 - check if menu toggles visibility on click
        it('should be visible on click', function () {
            const menuButton = document.querySelector('.menu-icon-link');
            menuButton.click();
            expect(menu.classList.contains('menu-hidden')).toBeFalsy();
            menuButton.click();
            expect(menu.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    // Test Suite 3
    describe('Initial Entries', function () {

        // handle async loadFeed() function call
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Spec 1 - check if initial elements are added to the feed
        it('should be loaded on start', function () {
            const feed = document.querySelector('.feed');
            expect(feed.childElementCount > 0).toBeTruthy();
        });
    });

    // Test Suite 4
    describe('New Feed Selection', function () {
        const feed = document.querySelector('.feed');
        let feedOne = [];

        // call async function loadFeed() and store entries of first feed to Array
        beforeEach(function (done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function (feedEntry) {
                feedOne.push(feedEntry.innerText);
            });
            loadFeed(1, done);
        });

        // Spec 1 - compare the entries from feed one and feed two and check for changes
        it('should change content', function () {
            Array.from(feed.children).forEach(function (feedEntry, index) {
                expect(feedOne[index]).not.toBe(feedEntry.innerText);
            });
        });
    });

}());