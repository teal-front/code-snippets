``` js
// download file
function downloadFile(url, cb) {
    chrome.downloads.download({
        method: "GET",
        url: url,
        conflictAction: 'uniquify', // 文件名存在时的处理，为添加新的序号确保唯一
        saveAs: true // 打开另存为窗口
    }, cb);
}

chrome.storage.local.get('searchword', function (data) {
	console.log('get searchword is: ', data.searchword);
	sendResponse(data.searchword);
});
```