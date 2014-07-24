(function()
{
	"use strict";

	var compatibilityViewDetect = function(compatViewDetectDirectory)
	{
		// Test if the browser is in compatibility view.
		// When IE8 and above are in compatibility view the user agent is modified to present it as IE7.
		// IE8 and above use a new layout engine - Trident. The version of Trident is included in the user agent
		// regardless of whether compatibility view is on. We can therefore tell if the browser is running in
		// compatibility view by testing for the existence of both the Trident token and the IE7 version number.
		var isInCompatibilityView = function()
		{
			return window.navigator.userAgent.indexOf("Trident/") !== -1 &&
				window.navigator.userAgent.indexOf("MSIE 7") !== -1;
		};

		// Load the error template using a simple XmlHttpRequest and append it to the body.
		// The template can include a %%BASE_URL%% variable if it needs to refer to other assets
		// in the compatViewDetectDirectory.
		var showErrorTemplate = function(compatViewDetectDirectory, templateUrl)
		{

			var xmlHttp;
			if (window.XMLHttpRequest)
			{
			    xmlHttp = new XMLHttpRequest();
			}
			else
			{
			    xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
			}

			xmlHttp.onreadystatechange = function()
			{
				// Template has finished loading.
				if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
				{
					document.body.innerHTML += xmlHttp.responseText.replace("%%BASE_URL%%", compatViewDetectDirectory);
				}
			};

			xmlHttp.open("GET", compatViewDetectDirectory + "/" + templateUrl, true);
			xmlHttp.send();
		};

		// Run the test
		var detect = function()
		{
			if (isInCompatibilityView())
			{
				showErrorTemplate(compatViewDetectDirectory, templateUrl);
			}
		};

		var templateUrl = "compat-view-template.html";

		// Add the detect method to the window's load event. We're using the browser's methods to add event listeners
		// to save having to rely on external libraries
		if(window.addEventListener)
		{
			window.addEventListener("load", detect);
		}
		else
		{
			window.attachEvent("onload", detect);
		}

	};

	// We only need to test IE
	if (window.navigator.appName === "Microsoft Internet Explorer")
	{
		// Determine the path to this script
		// Scripts are evaluated before they are placed in the DOM, so the last script element in the document
		// is guaranteed to be the current script
		var scripts = document.getElementsByTagName("script");
		var thisScript = scripts[scripts.length - 1];
		var scriptPath = thisScript.src;
		var scriptDirectory = scriptPath.substr(0, scriptPath.lastIndexOf("/"));

		// Execute the test
		compatibilityViewDetect(scriptDirectory);
	}

})();