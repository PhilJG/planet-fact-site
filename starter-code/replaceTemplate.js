module.exports = (temp, planet) => {
  // wrapping /.../g will make it global so all elements will be wrapped in these placeholders
  //replaceAll planet name with temp because it is not good practice to directly maniumplate arguements hence let
  let output = temp.replaceAll(/{%NAME%}/g, planet.name);
  output = output.replaceAll(/{%OVERVIEW%}/g, planet.overview.content);
  output = output.replaceAll(/{%STRUCTURE%}/g, planet.structure.content);
  output = output.replaceAll(/{%GEOLOGY%}/g, planet.geology.content);
  output = output.replaceAll(/{%ROTATION%}/g, planet.rotation);
  output = output.replaceAll(/{%REVOLUTION%}/g, planet.revolution);
  output = output.replaceAll(/{%RADIUS%}/g, planet.radius);
  output = output.replaceAll(/{%TEMPERATURE%}/g, planet.temperature);

  return output;
};
