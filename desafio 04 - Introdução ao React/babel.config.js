module.exports = {
  presets: [
    //altera as funcionalidades do javascript que o navegador não entende(import/export..arrow functions.. classes e etc)
    "@babel/preset-env",
    //altera as funcionalidades do react que o navegador não entende(jsx e etc)
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
