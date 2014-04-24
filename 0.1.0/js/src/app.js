define('app', ["backbone", "$","assistivetouch"], function(require, exports, module) {
	var Backbone = require('backbone');
	var $ = jQuery = require('$');
	var assistivetouch = require('assistivetouch');
	//var a = require('a');
	//定义全局变量App
	window.App = {
	    Models: {},  
		Views: {},  
		Collections: {},
		initialize: function() {
			//alert("init!!!");
			//alert($);
			//a.al();
			$(document).ready(function(){
				//alert(1);
				init();
			});
	    }  
	};
	
	function init(){
		//alert("init!!!");
		//alert($('.abc').length!=0);
		if($('.assistivetouch').length!=0)initAssistivetouch();
	};
	
	function initAssistivetouch(){
		//alert(1);
		assistivetouch.init();
	};
	
	exports.run = App.initialize;
	
});