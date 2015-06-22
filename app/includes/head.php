<?php 
if($_SERVER['SERVER_NAME']==='127.0.0.1'){
    $basePath = 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].$folder; 
} else {
    $basePath = 'http://'.$_SERVER['SERVER_NAME'].$folder;
}
 ?>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>morapiaf site</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
<link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

<!-- build:js scripts/vendor/modernizr.js -->
<script src="bower_components/modernizr/modernizr.js"></script>
<!-- endbuild -->





        <!-- build:css styles/main.css -->
<link rel="stylesheet" href="<?php echo $basePath; ?>styles/main.css">
<link rel="stylesheet" href="<?php echo $basePath; ?>styles/fonticon.css">
        <!-- endbuild -->
