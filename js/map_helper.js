var cursorX;
var cursorY;
var leftX="";
var topY="";
var rightX="";
var bottomY="";
var offsetX=0;
var offsetY=0;

var coords = [];
var ids = [];
var z_index = 10;
var dims = [];
var rectangular = true;

if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function w3_getStyleValue(elmnt,style) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elmnt,null).getPropertyValue(style);
	} else {
		return elmnt.currentStyle[style];
	}
}

	function extract_px(s) {
		if (s.length > 1) {
			var last = s.substring(s.length-2, s.length);
			if (last == "px") {
				s = s.substring(0, s.length-2);
			}
		}
		return parseInt(s);
	}

	function get_img_elt() {
            var els = document.getElementsByClassName("parent");
			var div = els[0];
            els = div.getElementsByTagName("img");
            var el = els[0];
            return el;
	}
	
	function get_img_name() {
		var elt = get_img_elt();
		var url = elt.src;
		var i = url.lastIndexOf("/");
		var j = url.lastIndexOf(".");
		var name = url.substring(i+1, j);
		return name;
	}
	
	function get_dims() {
		var el = get_img_elt();
		
		var width = w3_getStyleValue(el, "width");
		width = extract_px(width);
				
		var height = w3_getStyleValue(el, "height");
		height = extract_px(height);
		dims = [width, height];
		return dims;
	}
	
	function scale_dims(coords1) {
		get_dims();
		var ref_width = dims[0];
		var ref_height = dims[1];
		var left = coords1[0];
		var top = coords1[1];
		var width = coords1[2];
		var height = coords1[3];
		
		left = Math.floor((1000 * left)/ref_width + 0.5);
		top = Math.floor((1000 * top)/ref_height + 0.5);

		width = Math.floor((1000 * width)/ref_width + 0.5);
		height = Math.floor((1000 * height)/ref_height + 0.5);
		return [left, top, width, height];
	}

document.onmousemove = function(e){
	cursorX = e.pageX;
    cursorY = e.pageY;

}

	window.onresize = function() {
		dims = get_dims();
	};

function showCoords() {
	var txt = "/* To be put into the file 'css/" + get_img_name() + ".css' */\n\n";
	var tab = "   ";
	for (var i=0; i < coords.length; i++) {
		var arr = coords[i];
		var name = arr[0];
		var left = arr[1]+offsetX;
		var top = arr[2]+offsetY;
		var width = arr[3]-arr[1];
		var height = arr[4]-arr[2];
		var newdims = scale_dims([left, top, width, height]);
		left = newdims[0];
		top = newdims[1];
		width = newdims[2];
		height = newdims[3];
		
		var z_index = arr[7];
		txt += "#";
		txt += name;
		txt += " {\n";
		txt += tab;
		txt += "left: ";
		txt += left;
		txt += "px;\n";
		txt += tab;
		txt += "top: ";
		txt += top;
		txt += "px;\n";
		txt += tab;
		txt += "width: ";
		txt += width;
		txt += "px;\n";
		txt += tab;
		txt += "height: ";
		txt += height;
		txt += "px;\n";
		txt += tab;
		txt += "z-index: " 
		txt += z_index;
		txt += ";\n";
		txt += tab;
		txt += "display: block;"
		txt += "\n";
		txt += "}";
		txt += "\n\n";
	}

	var div = document.getElementById("yourDivElement");
	div.innerHTML = "";
	var input = document.createElement("textarea");
	var button = document.createElement("button");
	input.name = "post";
	input.maxLength = "5000";
	input.cols = "80";
	input.rows = "40";
	div.appendChild(input); //appendChild
	div.appendChild(button);
	input.value = txt;
}

function create_div(id, url, hovertext) {
	return `
		<div class="mytestdiv tooltip" id="${id}"
				onclick="window.open('${url}', '_self')">
        	<span class="tooltiptext"> ${hovertext} </span>
    	</div>
    `
}

function showDivs() {
	
	var txt = "/* To be inserted underneath the 'img' element */\n\n";
	var tab = "   ";
	for (var i=0; i < coords.length; i++) {
		var arr = coords[i];
		var id = arr[0];
		var url = arr[5];
		var hovertext = arr[6];
		var div_txt = create_div(id, url, hovertext);
		txt += div_txt;
		txt += "\n\n";
	}

	var div = document.getElementById("yourSecondDivElement");
	div.innerHTML = "";
	var input = document.createElement("textarea");
	var button = document.createElement("button");
	input.name = "post";
	input.maxLength = "5000";
	input.cols = "80";
	input.rows = "40";
	div.appendChild(input); //appendChild
	div.appendChild(button);
	input.value = txt;
}

function showRegion() {
	if (rightX == "") {
		return;
	}
	var x = leftX + offsetX;
	var y = topY + offsetY;
	var width = rightX - leftX;
	var height = bottomY - topY;
	
	if (! rectangular) {
		x = Math.floor(x + 0.5 - 0.2 * width);
		y = Math.floor(y + 0.5 - 0.2 * width);
		width = Math.floor(width * 1.41 + 0.5);
		height = Math.floor(height * 1.41 + 0.5);
	}
	var elem = document.getElementById("stars");
	elem.setAttribute("style", "background-color: red; opacity: 0.2");
	elem.style.left = x + "px";
	elem.style.top = y + "px";
	elem.style.width = width + "px";
	elem.style.height = height + "px";
	elem.style.display = "block";
	elem.onclick = function() {
		elem.style.display = "none";
	};
	
	if (! rectangular) {
		elem.style.borderRadius = "50%";
	}
}

function addRegion(id, left, top, right, bottom, url, txt) {
	if (! ids.includes(id)) {
		ids.push(id);
		coords.push([id, left, top, right, bottom, url, txt, z_index]);
	} else {
		for (var i=0; i < coords.length; i++) {
			var arr = coords[i];
			if (id == arr[0]) {
				arr[1] = left;
				arr[2] = top;
				arr[3] = right;
				arr[4] = bottom;
				arr[5] = url;
				arr[6] = txt;
				arr[7] = z_index;
				break;
			}
		}
	}
	z_index = z_index + 1;
}

function checkCursor(){
	var el = get_img_elt();
	offsetX = 0 - parseInt(el.x);
	offsetY = 0 - parseInt(el.y);	
	if (leftX == "" || rightX != "") {			
		leftX = cursorX;
		rightX = "";
		topY = cursorY;
		bottomY = "";
	} else {
		rightX = cursorX;
		bottomY = cursorY;
		var elt = document.getElementById("listDialog");
		elt.style.left = (cursorX + offsetX) + 'px';
		elt.style.top = (cursorY + offsetY) + 'px';
		var part_id = document.getElementById("part_id_id");
		part_id.value = "";
		var part_url = document.getElementById("part_url_id");
		part_url.value = "";
		var part_text = document.getElementById("part_text_id");
		part_text.value = "";
		elt.showModal();
	}

	showRegion();
}


function closeListDialog() {
	var elt = document.getElementById("listDialog");
	elt.close();
	leftX = "";
	rightX = "";
	topY = "";
	bottomY = "";
	var elem = document.getElementById("stars");
	elem.style.display = "none";
}

function processSelection() {
	var part_id = document.getElementById("part_id_id");
	var id = part_id.value;
	var part_url = document.getElementById("part_url_id");
	var url = part_url.value;
	var part_text = document.getElementById("part_text_id");
	var txt = part_text.value;
	console.log("id: " + id + ", " + "url: " + url);
	console.log("txt: " + txt);
	addRegion(id, leftX, topY, rightX, bottomY, url, txt);
}