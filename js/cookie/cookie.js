function setCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function deleteCookie(name)
{
	setCookie(name,"",-1);
}

// Make a unique cookie name for each blog.
// If you change this, please remember change the cookie name in adminaddpostaction.class.php too.
var re = new RegExp("[^a-zA-Z0-9]", "g" );
var LTCookieBaseName = "LT" + plogBaseUrl.replace( re, "" ) + plogBlogId;