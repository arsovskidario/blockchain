const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPromise = open({
  filename: path.resolve("src/storage", "addresses.db"),
  driver: sqlite3.Database
});

let db;

const initDb = async () => {
    db = await dbPromise;
}

const getDb = () => {
    if (!db) {
        throw Error('Database not initialized!');
    }

    return db;
}

const shutdownDb = () => {
    if (!db) {
        throw Error('Database not initialized!');
    }

    db.close((error) => {
        if (error) {
            return console.error("Failed to close database!");
        }
    })
}

module.exports = {
    initDb,
    getDb,
    shutdownDb,
}
