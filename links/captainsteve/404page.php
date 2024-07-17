<?php
    include 'template/templates.php';
    echo $headerPt1;
    echo '<meta name="page-topic" content="CaptainSteve 404 Error Page not found">';
	echo '<title>CaptainSteve - 404 Error</title>';
	echo $headerPt2;
    echo '<link href="css/404.css" rel="stylesheet">';
    echo $headerPt3;
    include 'content/404page.html';
    echo $footerPt1;
    echo $footerPt2;
?>