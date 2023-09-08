const fs = require("fs/promises")
const path = require("path")

// get all books from json file
const books = require("../data/books.json")

// get all books
exports.getBooks = (req, res, next) => {
  res.render("books", {
    title: "Books",
    books,
  })
}

// get book by id
exports.getBookById = (req, res, next) => {
  const { id: bookId } = req.params

  const book = books.find((book) => book.id == bookId)

  if (!book) {
    const error = new Error("Book not found !")
    error.status = 404
    return next(error)
  }
  res.render("book", {
    title: "Book",
    book,
  })
}

// add new book
exports.addBook = async (req, res) => {
  const { name } = req.body
  const book = {
    id: books.length + 1,
    name,
  }
  books.push(book)
  try {
    console.log(path.resolve("./data/books.json"))
    console.log(books)
    await fs.writeFile(path.resolve("./data/books.json"), JSON.stringify(books))
    res.redirect("/books", { title: "Books", books })
  } catch (error) {
    console.log(error)
  }
}
