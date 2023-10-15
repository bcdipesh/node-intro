const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}`);
      console.error(err.message);
      process.exit(1);
    }

    console.log(data);
  });
};

const catWrite = (path, fileName) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}`);
      console.error(err.message);
      process.exit(1);
    }

    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error(`Error writing to ${fileName}`);
        console.error(err.message);
        process.exit(1);
      }
    });
  });
};

const webCat = async (url) => {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error fetching ${url}`);
    console.error(err.message);
    process.exit(1);
  }
};

const webCatWrite = async (url, fileName) => {
  try {
    const res = await axios.get(url);
    fs.writeFile(fileName, res.data, (err) => {
      if (err) {
        console.error(`Error writing to ${fileName}`);
        console.error(err.message);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error(`Error fetching ${url}`);
    console.error(err.message);
    process.exit(1);
  }
};

let hasFlag = false;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === "--out") {
    hasFlag = true;
    if (process.argv[i + 2]) {
      if (process.argv[i + 2].includes(".txt")) {
        catWrite(process.argv[i + 2], process.argv[i + 1]);
      } else {
        webCatWrite(process.argv[i + 2], process.argv[i + 1]);
      }
    } else {
      console.error(
        "Please provide the path of the file to read and filename of the file where you want to save the data of the file"
      );
    }
  } else if (!hasFlag) {
    if (process.argv[i].includes(".txt")) {
      cat(process.argv[i]);
    } else {
      webCat(process.argv[i]);
    }
  }
}
