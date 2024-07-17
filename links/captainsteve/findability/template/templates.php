<?php
$headerPt1 = '
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
';

$headerPt2 = '
		<link href="../css/style.css" rel="stylesheet">
        <link href="../css/templates.css" rel="stylesheet">
		<link href="../css/hamburger.css" rel="stylesheet">
		<link href="css/findability.css" rel="stylesheet">
';

$headerPt3 = '
	</head>
	<body>
	<header>
		<nav id="topnav">
			<ul>
				<li><a href="/">Back to Sea</a></li>
				<li><a href="blog.php">Blog</a></li>
				<li><a href="seo.php">SEO</a></li>
				<li><a href="research.php">Research</a></li>
				<li><a href="resources.php">Resources</a></li>
				<li><a href="vocabulary.php">Vocabulary</a></li>
				<li><a href="modlog.php">Web-site Log</a></li>
			</ul>
			<br class="clearfloat"/>
		</nav>
		<div class="hamburger">
			<button class="menubtn"></button>
			<nav class="menu-content">
				<ul>
				<li><a href="/">Back to Sea</a></li>
				<li><a href="blog.php">Blog</a></li>
				<li><a href="seo.php">SEO</a></li>
				<li><a href="research.php">Research</a></li>
				<li><a href="resources.php">Resources</a></li>
				<li><a href="vocabulary.php">Vocabulary</a></li>
				<li><a href="modlog.php">Web-site Modifications Log</a></li>
				</ul>
			</nav>
		</div>
	</header>
';

$footerPt1 = '
		<footer>
			<nav id="footnav">
				<h2>The Ships</h2>
				<ul>
					<li><a href="../victory.php">HMS Victory</a></li>
					<li><a href="../apostol.php">Apostol Felipe</a></li>
					<li><a href="../launch.php">Bounty Launch</a></li>
					<li><a href="../barge.php">Royal Barge</a></li>
					<li class="clearfloat"></li>
				</ul>
				<h2>Site Navigation</h2>
				<ul>
					<li><a href="../about.php">About the Captain</a></li>
					<li><a href="../piracy.php">Piracy Policy</a></li>
					<li><a href="../contact.php">Contact Page</a></li>
					<li class="clearfloat"></li>
				</ul>
				<h2>Social Media</h2>
				<ul>
					<li><a class="social" id="social1" href="https://www.facebook.com"><img src="../images/facebook.png" alt="FaceBook Logo"></a></li>
					<li><a class="social" id="social2" href="https://www.instagram.com/"><img src="../images/instagram.png" alt="Instagram Logo"></a></li>
					<li><a class="social" id="social3" href="https://twitter.com/"><img src="../images/twitter.png" alt="Twitter Logo"></a></li>
					<li><a class="social" id="social4" href="https://au.linkedin.com/"><img src="../images/linkedIn.png" alt="LinkedIn Logo"></a></li>
					<li class="clearfloat"></li>
				</ul>
				<h2>Other Links</h2>
				<ul>
					<li><a href="../blog/index.html">Blog Page</a></li>
					<li><a href="../findability/index.php">Findability</a></li>
					<li><a href="../shipDataTable.php">Ship Data</a></li>
					<li class="clearfloat"></li>
				</ul>
			</nav>
			<h3>&copy; CaptainSteve' . date('Y') . '</h3>            
            <span id="siteseal"><script async src="https://seal.godaddy.com/getSeal?sealID=I62paOOJfiDqJhL1mxENvypyLy2jdWuK3s9I4ekjFVVjTdjeGatXWnAdCgUj"></script></span>
		</footer>
';

$footerPt2 = '
    </body>
</html>
';