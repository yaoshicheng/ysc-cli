const fs = require("fs");
const ora = require("ora");
const inquirer = require("inquirer");
const downloadGit = require("download-git-repo");
const chalk = require("chalk");
const symbol = require("log-symbols");
const child_process = require("child_process");

let isExist = async(name) => {
  return new Promise((resolve) => {
    if(fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'))
    }else{
      resolve();
    }
  });
}

let promptList = [
  {
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['nextjs', 'vue3', 'react']
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description:'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name:'
  }
];

let prompt = () =>{
  return new Promise((resolve)=>{
    // inquirer提供prompt函数来实现询问，其参数为数组，询问将按数组的顺序来
    inquirer.prompt(promptList)
        .then(answer => {
          resolve(answer);
        })
  });
}

let downLoadTemplate = async (ProjectName ,api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, ProjectName, {clone: true}, (err) => {
      if(err) {
        reject(err);
      }else{
        resolve();
      }
    });
  });
};

let updateJsonFile = (fileName, obj) => {
  return new Promise((resolve) => {
    if(fs.existsSync(fileName)) {
      // 读出模板下的package.json文件
      const data = fs.readFileSync(fileName).toString();
      // 转为json对象
      let json = JSON.parse(data);
      // 将用户输入的更新到模板package.json文件
      Object.keys(obj).forEach(key => {
        json[key] = obj[key];
      });
      // 重写模板下的package.json文件
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      resolve();
    }else{
      console.log(symbol.error, chalk.red(`${fileName} 文件不存在！！！`));
    }
  });
}

let loadCmd = async(cmd, text) =>{
  let loading = ora();
  loading.start(`${text}: 命令执行中...`);
  await child_process.exec(cmd);
  loading.succeed(`${text}: 命令执行完成`)
}

module.exports = {isExist, promptList, prompt, downLoadTemplate, updateJsonFile, loadCmd}
