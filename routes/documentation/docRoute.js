const express = require('express'),
router = express.Router(),
docController = require('../../controllers/documentation/docController')

router.get('/', docController.doc_index_get)

module.exports = router;