var original_dims = [];
original_dims = [1000,1000];

// from http://developer.expressionz.in/blogs/2009/03/07/calling-multiple-windows-onload-functions-in-javascript/

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
       window.onload = func
    } else {
       window.onload = function() {
           if (oldonload) {
                  oldonload()
          }
          func()
       }
   }
} 

function w3_getStyleValue(elmnt,style) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elmnt,null).getPropertyValue(style);
	} else {
		return elmnt.currentStyle[style];
	}
}

	function get_img_elt() {
            var els = document.getElementsByClassName("parent");
	    var div = els[0];
            els = div.getElementsByTagName("img");
            var el = els[0];
            return el;
	}

	function get_dims() {
		var el = get_img_elt();
		var width = el.offsetWidth;
		var height = el.offsetHeight;
		return [width, height];
	}
	
	function resize_dims(dims1) {
		var dims = get_dims();
		var width = dims[0];
		var height = dims[1];
		var x = dims1[0];
		var y = dims1[1];
		var w = dims1[2];
		var h = dims1[3];
		
		x = Math.floor((x*width)/original_dims[0] + 0.5);
		y = Math.floor((y*height)/original_dims[1] + 0.5);
		w = Math.floor((w*width)/original_dims[0] + 0.5);
		h = Math.floor((h*height)/original_dims[1] + 0.5);
		return [x,y,w,h];
	}
	
	window.onresize = setupMaps;
	
	addLoadEvent(setupMaps);
	
	function setupMaps() {
		adjust_overlays();
		original_dims = get_dims();
	}
	
	function adjust_overlays() {
		var dims = get_dims();

		var elts = document.getElementsByClassName("mytestdiv");
		for(var i=0; i<elts.length; i++) {
			var elt = elts[i];
			var id = elt.id;
			var width = elt.offsetWidth;
			var height = elt.offsetHeight;
			var top = elt.offsetTop;
			var left = elt.offsetLeft;
			var dims1 = resize_dims([left, top, width, height]);
			left = dims1[0];
			top = dims1[1];
			width = dims1[2];
			height = dims1[3];
			elt.style.left = left + "px";
			elt.style.top = top + "px";
			elt.style.width = width + "px";
			elt.style.height = height + "px";
		}
	}