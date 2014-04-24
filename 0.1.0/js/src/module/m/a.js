define('module/m/a', ['$'], function(reuqire) {
	var $ = reuqire('$');
	return function(c) {
		alert('Add moduleA successed，参数：' + $.param(c));
	}
});