const express = require('express')
const router = express.Router()

const image = require('../controllers/photo')
const upload = require('../middleware/image')


router.post('/img', upload.single('img'),image.image)
router.put('/img/:id', upload.single('img'),image.updateImage)
router.get('/img',image.getImage)

module.exports = router