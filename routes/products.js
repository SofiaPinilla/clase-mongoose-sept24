const express = require("express")
const ProductController = require("../controllers/ProductController")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/create",authentication,isAdmin, ProductController.create)
router.get("/getAll",ProductController.getAll)
router.get("/id/:_id", ProductController.getById)
router.get("/getByName/:name",ProductController.getProductsByName)
router.delete("/id/:_id",authentication,isAdmin,ProductController.delete)
router.put("/id/:_id",authentication,isAdmin,ProductController.update)

module.exports = router