var fs = require('fs'),
    request = require('request');

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

var mangaTome = 1;
var mangaName = "dragonball";
var TARGET_DIRECTORY = '_' + mangaTome + '_';
var pageIncrement = 55;
while (pageIncrement < 91) {
    download('https://i8.mangareader.net/dragon-ball/' + mangaTome + '/dragon-ball-16951' + pageIncrement + '.jpg', mangaName + '/' + TARGET_DIRECTORY + 'page' + pageIncrement + '.jpg', function () {
        console.log('done at : ', Date.now());
    });
    setTimeout(function () {
    }, 1000);
    pageIncrement++;
}