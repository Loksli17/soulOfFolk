const
    express    = require('express'),
    controller = require('../controllers/indexController'),
    router     = express.Router();
    
router.all('/',           controller.actionIndex);
router.all('/save-order', controller.actionCreateOrder);

module.exports = router;
