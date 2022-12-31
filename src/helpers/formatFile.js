export const transferString = (stringOfDb) => {
  let foreignArr = [];
  const lineRegex = /[^a-zA-Z]/g;
  const regex = /(.*)\(/i;
  let tableArr = [];
  let removeLater = [];
  if (stringOfDb) {
    const keywordObj = {
      "CREATE TABLE": "Create",
      "PRIMARY KEY": "PrimaryKey",
      "FOREIGN KEY": "Foreign",
      REFERENCES: ">>",
      "ON DELETE CASCADE ON UPDATE CASCADE": "",
      "ON DELETE NO ACTION ON UPDATE NO ACTION": "",
    };
    // var input = stringOfDb.replace(/^\((.+)\)$/, "{$1}");

    for (const key in keywordObj) {
      if (stringOfDb.indexOf(key) !== -1) {
        stringOfDb = stringOfDb.replaceAll(key, keywordObj[key]);
      }
    }
    let mulipleValue = lineRegex.exec(stringOfDb);
    mulipleValue = mulipleValue.input ? mulipleValue.input : mulipleValue;
    let newValue = mulipleValue.replace(/(\r\n|\n|\r|\t)/gm, "");
    newValue = newValue.replace(/ +(?= )/g, "");
    let splited = newValue.split("Create ");
    let temp = [];
    splited.forEach((element) => {
      var tableName = element.split("(")[0];
      tableName = tableName.replaceAll(" ", "");
      tableName !== "" && tableArr.push(tableName);
      let arr = element.split(",");
      // console.log(arr);
      arr.map((v) => {
        if (v.includes("Foreign")) {
          v = v.replace(";", "");
          removeLater.push(v);

          let fromOri = v.substring(v.indexOf("Foreign"), v.indexOf(">>"));

          let fromArea = fromOri;
          if (fromArea !== "") {
            fromArea = fromArea.replaceAll("Foreign ", "");
            fromArea = fromArea.replaceAll(/\(/g, "");
            fromArea = fromArea.replaceAll(/\)/g, "");
            fromArea = tableName + "." + fromArea;
          }
          let fore = "Foreign " + v.replace(fromOri, fromArea);
          temp.push(fore);
        }
      });
    });
    temp.forEach((el) => {
      let newEle = el.split(",");
      newEle.forEach((e) => {
        var myTo = e.substring(e.indexOf(">>") + 2, e.length);
        let newTo = myTo.replace(")", "").replace(" ", "");
        if (newTo.includes(")")) newTo = newTo.replaceAll(")", "");
        newTo = newTo.replace(" (", ".");
        el = el.replace(myTo, " " + newTo);
        // console.log('newEle:',newTo, ' myTo:', myTo)
      });
      foreignArr.push(el);
    });
  }
  let exportItem = stringOfDb.replace(/(\r|\n|\r|\t)/gm, "");
  foreignArr.forEach((ele) => {
    exportItem = exportItem.replaceAll(ele, "");
  });

  exportItem = exportItem.replaceAll(";", "\n");
  foreignArr.forEach((ele) => {
    exportItem = exportItem + ",\n" + ele;
  });
  removeLater.forEach((e) => {
    exportItem = exportItem.replace(e, "");
  });
  exportItem = exportItem.replace(/^,+|,+(?=,|$)/g, "");
  exportItem = typeDelimiter(exportItem).replace(/^:+|:+(?=:|$)/g, '')
  return exportItem;
};
const typeDelimiter = (inputStr) => {
  const typesUppercase = [
    "BIGINT",
    "SMALLINT",
    "TINYINT",
    "INT",
    "NUMERIC",
    "BIT",
    "DECIMAL",
    "SMALLMONEY",
    "MONEY",
    "FLOAT",
    "REAL",
    "DATETIME2",
    "DATETIMEOFSET",
    'SMALLDATETIME',
    "DATETIME",
    'TIME',
    'DATE',
    'NTEXT',
    'TEXT',
    'NVARCHAR',
    'VARCHAR',
    'NCHAR',
    'CHAR',
    'BINARY',
    'VARBINARY',
    'IMAGE',
  ];
  let typesLowercase = []
  typesUppercase.forEach(type =>{
    typesLowercase.push(type.toLowerCase())
  })

  let words = inputStr.split(' ')
  words.forEach(word =>{
    if(typesUppercase.includes(word)){
      inputStr = inputStr.replaceAll(word, ':'+word)
    }
    if(typesLowercase.includes(word)){
      inputStr = inputStr.replaceAll(word, ':'+word)
    }
  })
  // typesUppercase.forEach(type =>{
  //   if(inputStr.includes(type)){
  //     inputStr = inputStr.replaceAll(type, ': '+type)
  //   }
  // })

  // typesLowercase.forEach(type =>{
  //   if(inputStr.includes(type)){
  //     inputStr= inputStr.replaceAll(type, ': '+type)
  //   }
  // })
  return inputStr;
};
