<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <?php include(dirname(__FILE__).'/includes/head.php'); ?>
    </head>
    <body>
        <div class="main-container">
            <nav class="nav-site-menu top-menu">
                <div class="bothpanels">
                    <div class="left-panel">
                        <div class="space-margin">
                            <div class="groupit stick-to-top">
                                <div class="logo">
                                    <img alt="Site logo" src="images/moriapiaf-logo.fw.png">
                                </div>
                                <ul class="options-lang">
                                    <li><a href="test.php">Português</a></li>
                                    <li><a  href="es/">Castellano</a></li>
                                </ul>
                            </div>
                        </div>
                    </div><div class="right-panel">
                        <div class="space-margin">
                            <div class="options-menu groupit view-prespective stick-to-top orange-color">
                                <button class="close nav-is-visible"><span></span></button>
                                <?php include(dirname(__FILE__).'/includes/menu.php'); ?>                     
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="site-contents">
                <?php 
                $localPath = $_SERVER['REQUEST_URI'];
                $path = substr($localPath, 1, strlen($localPath)-1);
                if ($path=='') {
                    $path = 'main-content';
                }
                ?>
                <?php include(dirname(__FILE__).'/includes/'.$path.'.php'); ?>
                <?php include(dirname(__FILE__).'/includes/footer-destaques.php'); ?>
                <?php include(dirname(__FILE__).'/includes/footer.php'); ?>
            </section>
        </div>
        <?php include(dirname(__FILE__).'/includes/footerscripts.php'); ?>
    </body>
</html>
