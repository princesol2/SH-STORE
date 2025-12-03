const express = require('express');
const { login, getInventory } = require('../controllers/vendorController');

const router = express.Router();

router.post('/login', login);
router.get('/inventory', getInventory);

module.exports = router;
