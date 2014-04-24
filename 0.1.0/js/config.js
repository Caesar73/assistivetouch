// Set configuration
seajs.config({
	base: './',
	alias: {
		//Lib & Base Server		
		
		// Config_v0.1
		'underscore': 'js/common/underscore/1.5.0/underscore',
		'$': 'js/common/jquery/1.11.0/jquery',
		'backbone': 'js/common/backbone/1.0.0/backbone',
		
		//plugin
		'assistivetouch': 'vendor/assistivetouch/0.1.0/assistivetouch',
		'a': 'vendor/a',
		'test4ie': 'vendor/test4ie',
		'app': 'js/src/app'		
	}
});
seajs.use('app', function(app) { app.run(); });
seajs.use('test4ie', function(test4ie) {
	//alert(1);
	//test4ie.al();
});
