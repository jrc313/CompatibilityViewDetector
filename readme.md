Compatibility View Detector
===========================

Introduction
------------

Internet Explorer has a feature called Compatibility View to provide backwards compatibility for web sites that were built against older versions. When you visit a site that's in the Compatibility View list the browser will use the IE7 engine to render the page. A handy feature for all those legacy sites and apps that you can't afford to update. 

Unfortunately, the button that adds sites to the Compatibility View list is really easy to hit by mistake as it's part of a small cluster of buttons in the address bar that includes the Home, Refresh and Search buttons. Hitting the Compatibility View button adds the current domain to the Compatibility View list and rerenders the page using the IE7 enginge. If a user accidentally hits the Compatibility View button on your modern app there's a good chance that it'll blow up and they'll be left thinking that your app doesn't work.

This Compatibility View Detector is a small piece of Javascript that will detect if your app is running in Compatibility View and alert the user to switch it off.

Usage
-----

Just place the contents of the dist directory on your server and reference the javascript file early in your page

		<script type="text/javascript" src="compat-view-detector.min.js">

The Detector will take care of everything else. If the page is being viewed in Compatibility View - a warning message will be displayed to the user until they turn it off. You can modify the content of the message by editing the compat-view-template.html

