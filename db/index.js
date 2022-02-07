const pg = require("pg");

const client = new pg.Client("postgres://localhost/avengers_db");

const seedFunc = async () => {
  const SQL = `
    DROP TABLE IF EXISTS movies_stars;
    DROP TABLE IF EXISTS stars;
    DROP TABLE IF EXISTS movies;    

    CREATE TABLE movies(
        id SERIAL PRIMARY KEY,
        title VARCHAR(40) NOT NULL,
        year INTEGER NOT NULL,
        director VARCHAR(100) NOT NULL
    );

    CREATE TABLE stars(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50)
    );

    CREATE TABLE movies_stars(
        id SERIAL PRIMARY KEY,
        movie_id INTEGER REFERENCES movies(id),
        star_id INTEGER REFERENCES stars(id)
    );


    INSERT INTO movies(title, year, director) VALUES('Iron Man', 2008, 'Jon Favreau');
    INSERT INTO movies(title, year, director) VALUES('The Incredble Hulk', 2008, 'Louis Leterrier');
    INSERT INTO movies(title, year, director) VALUES('Iron Man 2', 2010, 'Jon Favreau');
    INSERT INTO movies(title, year, director) VALUES('Thor', 2011, 'Kenneth Branagh');
    INSERT INTO movies(title, year, director) VALUES('Captain America: The First Avenger', 2011, 'Joe Johnston');

    INSERT INTO stars(first_name, last_name) VALUES('Robert', 'Downey Jr.');
    INSERT INTO stars(first_name, last_name) VALUES('Terrence ', 'Howard');
    INSERT INTO stars(first_name, last_name) VALUES('Gwyneth', 'Paltrow');
    INSERT INTO stars(first_name, last_name) VALUES('Jeff', 'Bridges');
    INSERT INTO stars(first_name, last_name) VALUES('Don', 'Cheadle');
    INSERT INTO stars(first_name, last_name) VALUES('Scarlett', 'Johansson');
    INSERT INTO stars(first_name, last_name) VALUES('Edward', 'Norton');
    INSERT INTO stars(first_name, last_name) VALUES('Tim', 'Roth');
    INSERT INTO stars(first_name, last_name) VALUES('William', 'Hurt');
    INSERT INTO stars(first_name, last_name) VALUES('Chris', 'Hemsworth');
    INSERT INTO stars(first_name, last_name) VALUES('Natalie', 'Portman');
    INSERT INTO stars(first_name, last_name) VALUES('Anthony', 'Hopkins');
    INSERT INTO stars(first_name, last_name) VALUES('Tom', 'Hiddleston');
    INSERT INTO stars(first_name, last_name) VALUES('Chris', 'Evans');
    INSERT INTO stars(first_name, last_name) VALUES('Hayley', 'Atwell');
    INSERT INTO stars(first_name, last_name) VALUES('Liv', 'Taylor');
    INSERT INTO stars(first_name, last_name) VALUES('Sebastian', 'Stan');
    INSERT INTO stars(first_name, last_name) VALUES('Tommy', 'Lee Jones');


    INSERT INTO movies_stars(movie_id, star_id) VALUES(1, 1);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(1, 2);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(1, 3);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(1, 4);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(2, 7);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(2, 16);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(2, 8);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(2, 9);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(3, 1);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(3, 3);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(3, 5);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(3, 6);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(4, 10);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(4, 11);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(4, 12);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(4, 13);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(5, 14);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(5, 15);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(5, 17);
    INSERT INTO movies_stars(movie_id, star_id) VALUES(5, 18);
    `;
  await client.query(SQL);
};

module.exports = {
    client,
    seedFunc
}


