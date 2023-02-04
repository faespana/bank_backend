const { Router } = require("express");
const { findUserHistoryById, createUserAccount, createUserLogin } = require("../controllers/users.controllers");

const router = Router()

router.get("/:id/history", findUserHistoryById)

router.post("/signup", createUserAccount)

router.post("/login", createUserLogin)

module.exports = {
    UserRouter: router
}