"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promise_1 = __importDefault(require("mysql2/promise"));
const router = (0, express_1.Router)();
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'seat-reservation'
});
router.get('/seats');
