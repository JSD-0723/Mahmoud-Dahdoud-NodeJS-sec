const router = require("express").Router()

const booksController = require("../controllers/books")

router.get("/", booksController.getBooks)
router.get("/:id", booksController.getBookById)
router.post("/", booksController.addBook)

module.exports = router
