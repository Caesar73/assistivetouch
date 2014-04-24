define('assistivetouch', ["$"], function(require, exports, module) {
	var $ = jQuery = require('$');
	//var assistivetouch = $.fn.assistivetouch = {
	var assistivetouch = {
		init: function() {
			var _this = this;
			var _x, _y, $assistivetouch = $("#assistivetouch");
			var bDrag = false;
			var afterDrag = true;
			window.atState = 0;
			
			$assistivetouch.mousedown(function(event){
				var oEvent = event || window.event;
				$assistivetouch.unbind("mouseenter",toOP100);
				$assistivetouch.unbind("mouseleave",toOP20);
				//$assistivetouch.unbind("click", showMenu);
				bDrag = true,
				//afterDrag = false;
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
				if(s0 <= s1)//to left
				{
					satuation = 0;
					if((s2 <= s3)&&(s2 <= s0)) satuation = 2;
					if((s3 <= s2)&&(s3 <= s0)) satuation = 3;
				}
				else//to right
				{
					satuation = 1;
					if((s2 <= s3)&&(s2 <= s1)) satuation = 2;
					if((s3 <= s2)&&(s3 <= s1)) satuation = 3;
				};
				//console.log(satuation);
				window.atState = satuation;
				switch(satuation)
				{
					case 0: $(".assistivetouch").animate({left:'0px'},30);
						break;
					case 1: $(".assistivetouch").animate({left:screenWidth-w},30);
						break;
					case 2: $(".assistivetouch").animate({top:'0px'},30);
						break;
					case 3: $(".assistivetouch").animate({top:screenHeight-h},30);
						break;				
				};
				//console.log("screenWidth:" + screenWidth + "  screenHeight:" + screenHeight + "  l:" + l + "  t:" + t + "  h:" + h);
				/*
				setTimeout(function(){
				},50);
				*/
				$assistivetouch.bind("mouseenter",toOP100);
				$assistivetouch.bind("mouseleave",toOP20);
				//$assistivetouch.bind("click", showMenu);
				setTimeout(function(){
					afterDrag = true;
				},50);				
			});
			
			$(document).mousemove(function(event){
				if(!bDrag) return false;
				afterDrag = false;
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
			function toOP100(){ 
				//$assistivetouch.stop(true,true);
				$assistivetouch.animate({opacity:'1.0'},30); 
			};
			function toOP20(){
				//$assistivetouch.stop(true,true);
				$(".assistivetouch").animate({opacity:'0.2'},30); 
			};
			function showMenu(){//alert(1);
				if(!bDrag&&!afterDrag) return false;
				//alert(window.atState);
				$assistivetouch.hide();
				var screenWidth = $(window).width(),
					screenHeight = $(window).height();
				var l1 = screenWidth + "px";
				var t3 = screenHeight + "px";
				
				var atMenu = "<div id='atMenu' " +
					//"class='navbar navbar-inverse navbar-fixed-top' " +
					//"role='navigation'>" +
					"</div>";
				$("body").append(atMenu);
				atMenu = $("#atMenu");
				
				var round = ""+
					"<div id='atMenu-round' class='atMenu-btn op20'>" +
						"<div class='atMenu-board oh br10'>" +
							"<div class='atMenu-dark-gray-round oh br100'></div>" +
							"<div class='atMenu-light-gray-round oh br100'></div>" +
							"<div class='atMenu-white-round oh br100'></div>" +
						"</div>" +
					"</div>";
				
				var infoBoard = "" +
					"<div class='container'>" +
						"<div class='collapse navbar-collapse'>" +
							"<ul class='nav navbar-nav'>" +
								"<li class='active'><a href='#'>Home</a></li>" +
								"<li><a href='#about'>About</a></li>" +
								"<li><a href='#contact'>Contact</a></li>" +
							"</ul>" +
						"</div>" +
					"</div>";
					
				switch(window.atState)
				{
					case 0:
						atMenu.css({"width": "0", "height": screenHeight, "left": "-0", "top": "0"});
						atMenu.animate({width: '50px'},40);
						break;
					case 1:
						atMenu.css({"width": "0", "height": screenHeight, "left": l1, "top": "0"});
						atMenu.animate({width: '50px',left: screenWidth-50},40);
						break;
					case 2: 
						atMenu.css({"width": screenWidth, "height": "0", "left": "0", "top": "0"});
						atMenu.animate({height: '50px'},40);
						break;
					case 3: 
						atMenu.css({"width": screenWidth, "height": "0", "left": "0", "top": t3});
						atMenu.animate({height: '50px',top: screenHeight-50},40);
						break;				
				};
				atMenu.append(round);
				//atMenu.append(infoBoard);
				
				atMenu.bind("mouseenter",function() {
					switch(window.atState)
					{
						case 0:
							//atMenu.css({"width": "100px", "height": screenHeight, "left": "-0", "top": "0"});
							atMenu.animate({width: '200px'},40);
						break;
						case 1:
							//atMenu.css({"width": "100px", "height": screenHeight, "left": l1, "top": "0"});
							atMenu.animate({width: '200px',left: screenWidth-200},40);
						break;
						case 2: 
							//atMenu.css({"width": screenWidth, "height": "100px", "left": "0", "top": "0"});
							atMenu.animate({height: '200px'},40);
						break;
						case 3: 
							//atMenu.css({"width": screenWidth, "height": "100px", "left": "0", "top": t3});
							atMenu.animate({height: '200px',top: screenHeight-200},40);
						break;				
					};
				});
				
				atMenu.bind("mouseleave",function() {
					switch(window.atState)
					{
						case 0:
							//atMenu.css({"width": "100px", "height": screenHeight, "left": "-0", "top": "0"});
							atMenu.animate({width: '50px'},40);
						break;
						case 1:
							//atMenu.css({"width": "100px", "height": screenHeight, "left": l1, "top": "0"});
							atMenu.animate({width: '50px',left: screenWidth-50},40);
						break;
						case 2: 
							//atMenu.css({"width": screenWidth, "height": "100px", "left": "0", "top": "0"});
							atMenu.animate({height: '50px'},40);
						break;
						case 3: 
							//atMenu.css({"width": screenWidth, "height": "100px", "left": "0", "top": t3});
							atMenu.animate({height: '50px',top: screenHeight-50},40);
						break;				
					};
				});
				
				$("#atMenu-round").bind("click",function() {
					//alert(1);
					atMenu.remove();//atMenu.hide();
					$assistivetouch.show();
				});
				//atMenu.animate({left:'0'});
				//$("body").append(atMenu);
				$(window).bind("resize",function() {
					var screenWidth = $(window).width(),
						screenHeight = $(window).height();
					var atMenu = $("#atMenu");
					switch(window.atState)
					{
						case 0:
							atMenu.css({"height": screenHeight});
							break;
						case 1:
							atMenu.css({"height": screenHeight});
							break;
						case 2: 
							atMenu.css({"width": screenWidth});
							break;
						case 3: 
							atMenu.css({"width": screenWidth});
							break;				
					};
				});
				
			};			
			
		},
		destroy: function() {
			alert("assistivetouch-destroy");
		}
	};
	
	module.exports = assistivetouch;
	
});