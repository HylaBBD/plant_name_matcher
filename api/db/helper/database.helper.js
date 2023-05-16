const sqlite = require("sqlite3").verbose();

module.exports.dbHelper = {
  connect: (path) => {
    return new sqlite.Database(path, sqlite.OPEN_READWRITE, (err) => {
      console.error(err);
    });
  },
  dataCompiler: (rawData) => {
    try {
      let isArray = true;
      if (!Array.isArray(rawData)) {
        rawData = [rawData];
        isArray = false;
      }
      const fixedData = rawData.map((data) => {
        const keys = Object.keys(data);
        const formattedObj = keys.reduce((structuredData, key) => {
          const words = key.split("_");
          const camelCasedWords = words.map((word, index) => {
            if (index > 0) {
              const chars = word.split("");
              chars[0] = chars[0].toUpperCase();
              return chars.reduce((newKey, char) => {
                newKey += `${char}`;
                return newKey;
              }, "");
            } else {
              return word;
            }
          });

          const camelCasedKey = camelCasedWords.reduce(
            (camelCasedWord, word) => {
              camelCasedWord += word;

              return camelCasedWord;
            },
            ""
          );

          structuredData = { ...structuredData, [camelCasedKey]: data[key] };
          return structuredData;
        }, {});
        return formattedObj;
      });
      return isArray ? fixedData : fixedData[0];
    } catch (error) {
      return rawData;
    }
  },
};
