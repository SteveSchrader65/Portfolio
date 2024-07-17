<?php
    include 'template/templates.php';
    echo $headerPt1;
    echo '<meta name="page-topic" content="Data table of historical sailing ships">';
	echo '<meta name="keywords" content="Apostol Felipe, Queen Anne Barge, HMS Victory, Bounty launch, HMS Granado, HMS Warrior, USS Constitution, Wasa">';	
	echo '<title>CaptainSteve - Ship Data</title>';	
    echo $headerPt2;
	echo '<link href="css/table.css" rel="stylesheet">';
	echo $headerPt3;
    include 'content/shipDataTable.html';
    echo $footerPt1;
    echo $footerPt2;
?>