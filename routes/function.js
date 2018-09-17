var express = require('express');
var router = express.Router();
var multer = require('multer');
var util = require('util');
var fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename:function(req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage })

/* GET users listing. */
router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

router.post('/upload', upload.single('inputFile'), function(req, res, next) {
    res.send('success')
});

router.get('/see', function(req, res, next) {
    res.render('see', { title: 'Express' });
});

router.get('/video', function(req, res, next) {

    
    let name = req.query.name;
    name = "lssf-12_from yamasake.mp4";
    var video = path.resolve(__dirname,'../uploads/' + name);
    var stat = fs.statSync(video);
    console.log(stat)
    res.writeHead(200,{
        'Content-Type':'video/mp4',
        'Content-length':stat.size
    })
    var readable = fs.createReadStream(video)
    readable.pipe(res);
});

module.exports = router;