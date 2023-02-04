const { Router } = require("express");
const { transferUserCash } = require("../controllers/transfers.controllers");

const router = Router()

router.post("", transferUserCash)

module.exports = {
    TransferRouter: router
}