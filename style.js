function loadCSS() {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        
    }
    else {
        document.write('<link href="./pc.css" rel="stylesheet" type="text/css" media="screen" />');
    }
    }
    loadCSS();