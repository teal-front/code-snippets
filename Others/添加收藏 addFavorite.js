function addFavorite () {
	var failAdd = function () {
		alert('加入收藏失败，请使用Ctrl+D手动添加');
	};
	if (window.external && 'addFavorite' in window.external) { //360 ie compatible mode detect has "addFavorite",but inuse
		try {
			window.external.addFavorite(location.href, document.title); //360 ie compatible mode
		} catch (e) {
			failAdd();
		}
	}
	else if (window.sidebar && 'addPanel' in window.sidebar)  //firefox: an experimental technology
	{
		window.sidebar.addPanel(location.href, document.title, '');
	} else {
		failAdd();
	}
}	
