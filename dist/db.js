"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
const pool = new Pool({
    host: "db",
    port: 5432,
    user: "user123",
    password: "password123",
    database: "db123",
});
// module.exports = pool;
exports.default = pool;
