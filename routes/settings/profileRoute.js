const express = require('express'),
router = express.Router(),
multer = require('multer'),
settingsController = require('../../controllers/settings/settingsController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + '/storage/images')
    },
    filename: (req, file, cb) => {
      cb(null, req.session.user.id + '.jpg')
    }
}),
upload = multer({ storage: storage })

router.get('/', settingsController.setting_index_get)
router.post('/', upload.single('image'), settingsController.setting_profile_post)

module.exports = router