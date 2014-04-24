define('assistivetouch', ["$"], function(require, exports, module) {
	var $ = jQuery = require('$');
	//var assistivetouch = $.fn.assistivetouch = {
	var assistivetouch = {
		init: function() {
			var _this = this;
			var _x, _y, $assistivetouch = $(".assistivetouch");
			var bDrag = false;
	
			$(".assistivetouch").mousedown(function(event){
				var oEvent = event || window.event;
				$assistivetouch.unbind("mouseenter",toOP100);
				$assistivetouch.unbind("mouseleave",toOP20);
				//$assistivetouch.unbind("click", showMenu);
				bDrag = true;
				_x = oEvent.pageX - $assistivetouch.position().left;
				_y = oEvent.pageY - $assistivetouch.position().top;
				return false
			}).mouseup(function(){
				bDrag = false;
				var screenWidth = $(window).width(),
				screenHeight = $(window).height(),
				l = $assistivetouch.position().left,
				t = $assistivetouch.position().top,
				w = $assistivetouch.width();
				h = $assistivetouch.height();
				l = l + w/2;
				t = t + h/2;
				//up: 2,down: 3,left: 0,right: 1
				var satuation = 0;
				var s0 = l/screenWidth,
					s1 = 1 - l/screenWidth,
					s2 = t/screenHeight,
					s3 = 1 - t/screenHeight;
				//console.log("s0: "+ s0 + "s1: "+ s1 + "s2: "+ s2 + "s3: "+ s3);
				if(s0 <= s1)
				{
					satuation = 0;
					if((s2 <= s3)&&(s2 <= s0)) satuation = 2;
					if((s3 <= s2)&&(s3 <= s0)) satuation = 3;
				}
				else
				{
					satuation = 1;
					if((s2 <= s3)&&(s2 <= s1)) satuation = 2;
					if((s3 <= s2)&&(s3 <= s1)) satuation = 3;
				};
				//alert(satuation);
				switch(satuation)
				{
					case 0: $(".assistivetouch").animate({left:'0px'},30);
						break;
					case 1: $(".assistivetouch").animate({left:screenWidth-w},50);
						break;
					case 2: $(".assistivetouch").animate({top:'0px'},30);
						break;
					case 3: $(".assistivetouch").animate({top:screenHeight-h},50);
						break;				
				};
				//console.log("screenWidth:" + screenWidth + "  screenHeight:" + screenHeight + "  l:" + l + "  t:" + t + "  h:" + h);
				$assistivetouch.bind("mouseenter",toOP100);
				$assistivetouch.bind("mouseleave",toOP20);
				//$assistivetouch.bind("click", showMenu);
			});
			
			$(document).mousemove(function(event){
				if(!bDrag) return false;
				var _assistivetouch = $assistivetouch,
				oEvent = event || window.event,
				//x = _assistivetouch.position().left,
				//y = _assistivetouch.position().top,
				x = oEvent.pageX - _x,
				y = oEvent.pageY - _y,
				maxX = $(document).width() - _assistivetouch.outerWidth(),
				maxY = $(document).height() - _assistivetouch.outerHeight();

				//console.log("x:" + x + "  y:" + y);
				x = x < 0 ? 0: x;
				x = x > maxX ? maxX: x;
				y = y < 0 ? 0: y;
				y = y > maxY ? maxY: y;
				//console.log("x:" + x + "  y:" + y);
				_assistivetouch.css({"left":x,"top":y});
				return false;
			});
	
			//bind fade methods
			$assistivetouch.bind("mouseenter",toOP100);
			$assistivetouch.bind("mouseleave",toOP20);
			$assistivetouch.bind("click", showMenu);
			function toOP100(){ $assistivetouch.animate({opacity:'1.0'}); };
			function toOP20(){ $(".assistivetouch").animate({opacity:'0.2'}); };
			function showMenu(){
				//alert(1);
			};			
		
		},
		destroy: function() {
			alert("assistivetouch-destroy");
		}
	};
	
	module.exports = assistivetouch;
	
});