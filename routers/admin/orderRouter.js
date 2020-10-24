const
    express    = require('express'),
    controller = require('../../controllers/admin/orderController'),
    router     = express.Router();

router.all('/', controller.actionIndex);

module.exports = router;
