const fs = require("fs");
const path = require("path");

function createModuleStore(typesPath, typeName, savePath, saveName) {
  const types = fs.readFileSync(typesPath).toString("utf-8");

  // 正则表达式
  const reg = new RegExp(`interface ${typeName} ({[\\s\\S]*?})`);

  // key:type 映射
  const mp = new Map();

  reg
    .exec(types)[1]
    .replace(/\s*/g, "")
    .slice(1, -1)
    .split(";")
    .forEach((value) => {
      if (/[\s\S]*?:[\s\S]*/.test(value)) {
        const [name, type] = value.split(":");
        mp.set(name, type);
      }
    });
  // 初始化值预设
  const initailValue = {
    string: '""',
    number: "0",
    boolean: "false",
  };

  // 开始创建文件
  const createState = () => {
    let str = "";
    mp.forEach((type, key) => {
      let val;
      if (type in initailValue) val = initailValue[type];
      else if (type.includes("[]")) val = "[]";
      else val = "null";

      str += `      ${key}:${val},\n`;
    });

    return str;
  };

  const createMutation = () => {
    let str = "";
    mp.forEach((type, key) => {
      str += `    update${
        (key[0].toUpperCase() + key.slice(1))
      } (state, ${key}:${type}) {
      state.${key} = ${key};
    },\n`;
    });

    return str;
  };

  const storeContent = `
import { IRootState } from '@/store/types';
import { Module } from 'vuex';
import { ${typeName} } from '${typesPath.replace("\\", "/")}';

const ${typeName}Module: Module<${typeName}, IRootState> = {
  namespaced: true,
  state() {
    return {
${createState()}
    };
  },
  mutations: {
${createMutation()}
  },
  getters: {

  },
  actions: {
   
  }
};

export default ${typeName}Module;
`;

  fs.writeFileSync(`${savePath}/${saveName}.ts`, storeContent, "utf-8");
  return true;
}

module.exports = {
  createModuleStore,
};
