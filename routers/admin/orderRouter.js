const
    express    = require('express'),
    controller = require('../../controllers/admin/orderController'),
    router     = express.Router();

router.all('/',       controller.actionIndex);
router.all('/delete', controller.actionDelete);
router.all('/edit',   controller.actionEdit);

router.all('/view-order', controller.actionViewOrder);
router.all('/search',     controller.actionSearch);

module.exports = router;
