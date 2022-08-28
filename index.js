#!/usr/bin/env node
const program = require("commander");
const path = require("path");
const { createModuleStore } = require("./lib/createStore");

function complementPath(ipath) {
  return path.resolve(__dirname, ipath);
}
// 类型文件 类型接口 store保存路径 store名称
program
  .command("createStore <types-path> <type-name> <save-path> <save-name>")
  .action((typesPath, typeName, savePath, saveName) => {
    console.log(typesPath, complementPath(savePath));
    createModuleStore(
      typesPath,
      typeName,
      savePath,
      saveName
    );
  });
program.parse();
