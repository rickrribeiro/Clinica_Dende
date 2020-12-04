const fs = require("fs");
const path = require("path")

const dbPath = "../../src/repository/"

var backupDB = () => {
    fs.copyFile(path.resolve(__dirname,dbPath+'db.json'), path.resolve(__dirname,dbPath+'db.backup.json'), (err) => {
        if (err) throw err;
      });
      return true;
}

module.exports= {backupDB}