const
    express    = require('express'),
    controller = require('../../controllers/admin/commentController'),
    router     = express.Router();

router.all('/', controller.actionIndex);

module.exports = router;
