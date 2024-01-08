const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const movies = require("./public/jsons/movies.json").results;
const BASE_IMG_URL = "https://movie-list.alphacamp.io/posters/";

//app.engine：透過這個方法來定義要使用的樣板引擎，其中參數 .hbs 是這個樣板引擎的名稱
//app.set：透過這個方法告訴 Express 說要設定的 view engine 是 hbs (handlebars)
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/movies");
});

app.get("/movies", (req, res) => {
  res.render("index", { movies, BASE_IMG_URL });
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((mv) => mv.id.toString() === id);
  res.render("detail", { movie, BASE_IMG_URL });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
