const fs = require("fs");
// const replaceTemplate = require("./replaceTemplate");

const http = require("http");
const path = require("path");

const port = 3000;

const replaceTemplate = (temp, planet) => {
  // wrapping /.../g will make it global so all elements will be wrapped in these placeholders
  //replaceAll planet name with temp because it is not good practice to directly maniumplate arguements hence let
  let output = String(temp).replace(/{{NAME}}/g, planet.name);
  output = output.replace(/{{OVERVIEW}}/g, planet.overview.content);
  output = output.replace(/{{STRUCTURE}}/g, planet.structure.content);
  output = output.replace(/{{GEOLOGY}}/g, planet.geology.content);
  output = output.replace(/{{ROTATION}}/g, planet.rotation);
  output = output.replace(/{{REVOLUTION}}/g, planet.revolution);
  output = output.replace(/{{RADIUS}}/g, planet.radius);
  output = output.replace(/{{TEMPERATURE}}/g, planet.temperature);

  output = output.replace(/{{IMAGE_OVERVIEW}}/g, planet.images.planet);

  return output;
};

// Read the planets data & html templates
const mainPage = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
const planetPage = fs.readFileSync(`${__dirname}/planet.html`, "utf-8");

const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// const getPage = (req, res) => {
//   const cardsHTML = planetData
//     .map((el) => replaceTemplate(planetPage, el))
//     .join("");
//   console.log(cardsHTML);
//   const output = planetPage.replace(`{%PLANET_CARDS%}`, cardsHTML);

//   res.end(output);
// };

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    //This produces an array so .join is used to connect to an empty string
    // const cardsHTML = dataObj
    //   .map((el) => replaceTemplate(tempCard, el))
    //   .join("");
    // const output = mainPage.replace("{{PLANET_CARD}}", cardsHTML);

    // res.write;
    res.end(mainPage);
  } else if (pathName.startsWith("/planet/")) {
    const pathParts = pathName.split("/");

    const planetName = pathParts[2]; //Get planet name from the URL

    const planetData = dataObj.find(
      (el) => el.name.toLowerCase() == planetName
    ); // find the corresponding planet data

    // Check if planetData exists. If it doesn't, send a 404 response.
    if (!planetData) {
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello-world",
      });
      res.end("Planet not found");
      return; // This is important to prevent the rest of the code from executing
    }

    if (planetData) {
      res.writeHead(200, { "Content-type": "text/html" });
      // generate the HTML for the planet page
      const output = replaceTemplate(planetPage, planetData);

      res.end(output);
    }
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("Not found");
  }
});

// Added: Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
