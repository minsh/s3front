var _       = require('underscore'),
    fs      = require('fs-extra'),
    crypto  = require('crypto');

var CONFIG_FILE_PATH = './.s3front.json';

var _bucket = null,
    _config = null;

function _md5(filePath, cb) {
  var shasum  = crypto.createHash('md5'),
      s       = fs.ReadStream(filePath);

  s.on('data', function(d) { shasum.update(d); });
  s.on('end', function() {
    cb(shasum.digest('hex'));
  });
}

function _write() {
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(_config));
}

exports.init = function(bucket) {
  if (!bucket) { throw new Error('missing bucket parameter'); }
  _bucket = bucket;
  /* check if file .s3front.json is present */  
  try {
    var data = fs.readFileSync('./.s3front.json', 'utf8');
    _config = JSON.parse(data);
    if (!_config[_bucket]) {
      /* create config for specific bucket */
      _config[_bucket] = {};
    }
  } catch(e) {
    /* cache config is not there */
    _config = {};
    _config[_bucket] = {};
  }
};

/* \return boolean to tell if file is already there or not */
exports.is = function(filePath, cb) {
  if (filePath === CONFIG_FILE_PATH.substr(2)) { cb(true); }
  _md5(filePath, function(md5) {
    var cfg = _config[_bucket];

    if (cfg[filePath]) { 
      if (cfg[filePath].md5 === md5 && cfg[filePath].uploaded) { 
        return cb(true); 
      }
      //console.log('there but changed',filePath,cfg[filePath].md5,md5);
      cfg[filePath].md5 = md5;
      cfg[filePath].uploaded = false;
      _write();
      return cb(false);
    }

    //console.log('not there',filePath,md5);
    cfg[filePath] = {
      md5 : md5,
      uploaded : false
    }; 
    _write();
    return cb(false);
  });
};

/* */
exports.uploaded = function(filePath) {
  _config[_bucket][filePath].uploaded = true;
};
