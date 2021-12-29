const sqlite3 = require('sqlite3').verbose();

class StorageService {
    constructor() {
        let db = new sqlite3.Database('../storage/addresses.db', (error)=> {
            if(error) {
                return console.error(error.message);
            }
        
            console.log("DB STARTED")
        });

        db.run(`CREATE TABLE 
                DISTRICT_ADDRESS (
                NAME VARCHAR(255) NOT NULL, 
                ADDRESS VARCHAR(255) NOT NULL, 
                PRIMARY KEY(NAME));`);
    }

    insertDistrictAddress(name, address) {
        if ( (name==null || name ==='') || (address==null || address ==='')) {
            return "Invalid parameteres for insert function!"
        }

        db.run(`INSERT 
                INTO DISTRICT_ADDRESS(NAME, ADDRESS)
                VALUES(?, ?);`,[name, address], (error)=> {
                    return "Failed to insert address into database!"
                })
    }

    getDistrictAddress(name) {
        if (name==null || name ==='') {
            return "Invalid district name for get function!";
        }

        db.get(`SELECT ADDRESS
                FROM DISTRICT_ADDRESS
                 WHERE NAME=?;`, [name], (err, result) => {
            if(err) {
                return "Error occured while getting district address!";
            }

            return result;
        })
    }

    shutdown() {
        db.close( (error)=> {
            if(error) {
                return console.error("Failed to close database!");
            }
        })
    }
}
