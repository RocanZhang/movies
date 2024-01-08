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
  const keyword = req.query.search?.trim();
  //透過 query，我們可以取得使用者在搜尋框中輸入的內容
  const matchedMovies = keyword
    ? movies.filter((mv) =>
        Object.values(mv).some((property) => {
          //使用到 Object.value，將一個物件傳進去時，Object 能夠將所有屬性都印出來；而 some() 的功能在於做條件判斷，只要任何一個條件有符合就能夠通過
          if (typeof property === "string") {
            // 如果屬性是字串，就轉小寫並比對，否則不會繼續比對
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
          return false;
        })
      )
    : movies;
  res.render("index", { movies: matchedMovies, BASE_IMG_URL, keyword });
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((mv) => mv.id.toString() === id);
  res.render("detail", { movie, BASE_IMG_URL });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
