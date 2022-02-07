const { client, seedFunc } = require("./db");

const express = require("express");

const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  try {
    const response = await client.query("SELECT * FROM movies;");
    const movies = response.rows;
    res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href="/public/styles.css"/>
                </head>
                <body>
                    <h1>Avenger Movies</h1>
                    <h2>Avenger Stars</h2>
                    <ul>
                        ${movies
                          .map(
                            (movie) => `
                                <li>
                                    <a href="/movies/${movie.id}">
                                    ${movie.title}
                                    </a>
                                </li>
                            `
                          )
                          .join("")}
                    </ul>
                </body>
            </html>
        `);
  } catch (err) {
    next(err);
  }
});

app.get("/movies/:id", async (req, res, next) => {
  try {
    const promises = [
      client.query("SELECT * FROM movies WHERE movies.id = $1;", [
        req.params.id,
      ]),
      client.query(
        "SELECT first_name, last_name FROM stars JOIN movies_stars ON movies_stars.star_id = stars.id WHERE movie_id = $1;",
        [req.params.id]
      ),
    ];
    const [movieResponse, starsResponse] = await Promise.all(promises);
    const movie = movieResponse.rows[0];
    const stars = starsResponse.rows;
    res.send(`
              <html>
                  <head>
                      <link rel="stylesheet" href="/public/styles.css"/>
                  </head>
                  <body>
                      <h1>Movie</h1>
                      <h2><a href='/'>Avenger Movies</a> | ${movie.title} | ${
      movie.year
    } | Director: ${movie.director}</h2>
                      <ul>
                        ${stars
                          .map(
                            (star) => `
                            <li>
                                ${star.first_name} ${star.last_name}
                            </li>
                        `
                          )
                          .join("")}
                      </ul>
                  </body>
              </html>
          `);
  } catch (err) {
    next(err);
  }
});

const port = 3000;

const setUp = async () => {
  try {
    await client.connect();
    await seedFunc();
    console.log("connected to database");
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

setUp();
