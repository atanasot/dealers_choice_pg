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
