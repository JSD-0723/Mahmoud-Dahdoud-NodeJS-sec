const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

const port = 3000
const app = express()

// view engine setup
app.set("views", path.resolve("./views"))
app.set("view engine", "pug")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// books router
const booksRouter = require("./routes/books")
app.use("/books/", booksRouter)

app.get("/", (req, res, next) => {
  res.render("index", { title: "Home" })
})

// client error handler
app.use((req, res, next) => {
  const error = new Error("Page not found !")
  error.status = 404
  next(error)
})

// server error handler
app.use((error, req, res, next) => {
  if (!error.status) error.status = 500
  if (!error.message) error.message = "Internal Server Error !"
  res.render("error", {
    error,
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port} http://localhost:${port}`)
})
