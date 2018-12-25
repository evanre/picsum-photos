var https = require('https')
var async = require('async')
var fs = require('fs')
var config = require('./config')()
var metadata = require(config.metadata_path)

var urls;
urls = metadata.map(function(obj, i) {
    return [i, config.folder_path + '/' + obj.filename, obj.post_url + '/download?force=true']
});
// urls.length = 5;

// filter all ready downloaded files
// urls = urls.filter(function(obj) {
//     return !fs.existsSync(obj[1])
// });

async.eachLimit(urls,5,function(url, finished) {
    async.waterfall([
        async.asyncify(async function () {
            return await getDownloadData(url[2])
        }),
        function (data, cb) {
            var imgUrl = data.match(/http[s]?:\/\/[^\"]+/g);

            if (!imgUrl) {
                console.log(imgUrl, url[2], ', Link not found in body text!');
                return;
            }

            if (!fs.existsSync(config.folder_path)){
                fs.mkdirSync(config.folder_path);
            }

            var file = fs.createWriteStream(url[1]);
            https.get(imgUrl[0], function(res) {
                console.log('Start downloading:', url[0], ':', url[1] );
                res.pipe(file);
                res.on('end', function() {
                    console.log( 'Finished downloading:', url[0], ':', url[1] );
                    return cb(null, true);
                })
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        }
    ], function (err, result) {
        // result now equals 'done'
        if (result) {
            finished();
        }
    });

});

function getDownloadData(url) {
    return new Promise(function(resolve, reject) {
        https.get(url, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(d) {
                if (res.statusCode === 404) {
                    reject(res.statusCode);
                }
                resolve(d);
            });
        }).on('error', function(e) {
            reject(e);
        });
    });
}
