<%@ page contentType="text/html;charset=UTF-8" %>
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Satch</title>
  <meta name="description" content="Google's material design UI components built with React.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <asset:stylesheet src="satch-react-ui.css"/>
</head>

<body>
<div id="app"></div>

<!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
<script>
  var WebFontConfig = {
    google: { families: [ 'Roboto:400,300,500:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
</script>
<asset:javascript src="satch-react-ui.bundle.js"/>
</body>

</html>