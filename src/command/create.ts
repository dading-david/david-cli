import { input, select } from "@inquirer/prompts";
import { clone } from "../../utils/clone";
import path from "path";
import fs from "fs-extra";
export interface TemplateInfo {
  name: string;
  downloadUrl: string;
  description: string;
  branch: string;
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-TypeScript-template",
    {
      name: "Vite-Vue3-TypeScript-template",
      downloadUrl: "https://github.com/dading-david/admin-pro.git",
      description: "Vue3技术栈开发模板",
      branch: "main",
    },
  ]
]);
export function isOverwrite(fileName: string) {
  console.warn(`${fileName} 文件夹已存在`);
  return select({
    message: '是否覆盖',
    choices: [
      {
        name: '覆盖',
        value: true,
      },
      {
        name: '取消',
        value: false,
      },
    ],
  })
}
export async function create(projectName?: string) {
  // 初始化模版列表
  const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
    const [name, info] = item;
    return {
      name,
      value: name,
      description: info.description,
    };
  });
  // 如果没有提供项目名称，则提示用户输入
  if (!projectName) {
    projectName = await input({
      message: "请输入项目名称",
    });
  }
  // 如果文件夹存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(), '..', projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName);
    if (run) {
      // 删除文件夹
      fs.remove(filePath);
    } else {
      return; // 不覆盖直接结束
    }
  }
  
  // 选择模版
  const templateName = await select({
    message: "请选择一个模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    // 拉取模版
    await clone(info.downloadUrl, projectName, ['-b', info.branch]);
  } else {
    console.error('模板不存在');
  }
}
