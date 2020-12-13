const multer = require('multer');
const multerInstance = multer({storage: multer.memoryStorage()});

module.exports = multerInstance;
