<?php 


class PathCheck
{
    public $value;
    public $file;
}

class AdressChecker
{
    private $localPath;
    public $myPaths;
    public function initPaths(){
        $basefolder = '';
        $this->myPaths = array();   
        $this->generatePath($basefolder.'','main-content-ui','',null,'head-index');
        $this->generatePath($basefolder.'index.php','main-content-ui','',null,'head-index');
        $this->generatePath($basefolder.'home','main-content-ui','',null,'head-index');
        $this->generatePath($basefolder.'games','games-ui','',null,'head-index');
        $this->generatePath($basefolder.'items','items-ui','',null,'head-index');
        $this->generatePath($basefolder.'contactos','contactos-ui','',null,'head-index');
        $this->generatePath($basefolder.'newsletter','contactos-ui','',null,'head-index');
        // ------------  ------------- //
    }
    public function generatePath($compare,$file,$localPath,$levelMenu,$headfile)
    {
    	$addressObj = new PathCheck();
    	$addressObj->value = $compare;
    	$addressObj->file = $file;
        $addressObj->level = $levelMenu;
        $addressObj->localPath = $localPath;
        $addressObj->headfile = $headfile;
    	array_push($this->myPaths, $addressObj);
    }
    public function getPaths(){
        $this->initPaths();
        $yPaths = array();  
        for ($i=0; $i <count($this->myPaths) ; $i++) {
            $obj = new stdClass();
            $item = $this->myPaths[$i];            
            $obj->path = $item->localPath.$item->file ;
            $obj->level = $item->level;
            $obj->file = $item->file;
            $obj->headfile = $item->headfile;
            array_push($yPaths, $obj);
        }
        return $yPaths;
    }
    public function getPhpToUrl($nexturl)
    {
        $this->initPaths();
        $obj = new stdClass();
        if ($nexturl!='') {
           $path = $nexturl;
           $pathWithbar = $path."/";
        } else {
            $localPath = $_SERVER['REQUEST_URI'];
            $path = substr($localPath, 1, strlen($localPath)-1);   
            $pathWithbar = $path."/";
        }

        $level = null;
        for ($i=0; $i <count($this->myPaths) ; $i++) {	
        	$item = $this->myPaths[$i];
        	if(($path===$item->value) || ($pathWithbar===$item->value)){
        		$obj->path = $item->localPath.$item->file ;
                $obj->level = $item->level;
                $obj->headfile = $item->headfile;
                return $obj;
        	} else if (strlen ($path)===0) {
                $path = 'main-content-ui';                
                $obj->path = $path;
                $obj->level = $item->level;
                $obj->headfile = $item->headfile;
                return $obj;
            }
        }
        $path = '404';
        $obj->path = $path;
        $obj->level = $level;
        $obj->headfile = 'head-index';
        return $obj;
    }
}
?>