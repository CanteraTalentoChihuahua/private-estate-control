"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.get('/test', auth_1.validateToken, auth_1.testGet);
router.get('/', auth_1.getLogin);
router.post('/auth', auth_1.authLogin);
exports.default = router;
