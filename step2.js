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

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i].includes(".txt")) {
    cat(process.argv[i]);
  } else {
    webCat(process.argv[i]);
  }
}
