const express = require('express');
const router = express.Router();
const { getAuthorizationCode, postGenerateToken, unlinkIfoodIntegration, postWebHook } = require('../controllers/ifoodController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/generate-user-code', authenticateToken, getAuthorizationCode);
router.post('/generate-token', authenticateToken, postGenerateToken);
router.delete('/unlink', authenticateToken, unlinkIfoodIntegration);
router.post('/webhook', postWebHook);

module.exports = router;