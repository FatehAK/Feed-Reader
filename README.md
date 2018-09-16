# Feed-Reader
Feed Reader is used to retrieve feeds from various websites and displays them for easy viewing using the Google Feed Reader API. The primary goal of this project is to demostrate browser based testing using the Jasmine Testing library. It is developed using the TDD (Test Driven Development) methodology.

### How to run
* You can clone the repository and open 'index.html' to run the project locally. (or)
* You can checkout the project live using this [link](https://fatehak.github.io/Feed-Reader/).

### Test Cases
The following test cases are used against which the application is checked -
* #### Test Suite 1 - RSS Feed fetching
  * checks if allFeeds variable is defined and not empty
  * check if url is defined and not empty for each feed
  * check if name is defined and not empty for each feed
* #### Test Suite 2 - Sidebar visibility
  * check if menu element is hidden by default
  * check if menu toggles visibility on click
* #### Test Suite 3 - Initial entries
  * handle async loadFeed() function call
  * check if initial elements are added to the feed
* #### Test Suite 4 - New Feed selection
  * call async function loadFeed() and store entries of first feed to Array
  * compare the entries from feed one and feed two and check for changes

### Dependencies
* Google Feed Reader API [link](http://google.com/jsapi)
* Jasmine Testing library [link](https://jasmine.github.io/pages/getting_started.html)
* jQuery [link](http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js)
* HandlebarJS [link](http://cdn.jsdelivr.net/handlebarsjs/2.0.0/handlebars.min.js)
