const esModules = ['react-leaflet', '@react-leaflet'].join('|');

module.exports = {

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
};
