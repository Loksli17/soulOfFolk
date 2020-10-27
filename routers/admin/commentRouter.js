const
    express    = require('express'),
    controller = require('../../controllers/admin/commentController'),
    router     = express.Router();

router.all('/',       controller.actionIndex);
router.all('/delete', controller.actionDelete);
router.all('/edit',   controller.actionEdit);
router.all('/create', controller.actionCreate);
router.all('/view',   controller.actionView);
router.all('/search', controller.actionSearch);
router.all('/file',   controller.actionFileUpload);

module.exports = router;
