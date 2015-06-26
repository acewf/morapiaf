<?php 
$url = $_GET["url"];
require_once dirname(__FILE__).'/address-filter.php';
$Adress = new AdressChecker();
$path = $Adress->getPhpToUrl($url);
echo json_encode($path);//$path->path;
?>