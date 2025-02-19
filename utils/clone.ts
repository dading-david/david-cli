import simpleGit, { SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import path from 'path';
import chalk from "chalk";

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: [
      "⠋",
      "⠙",
      "⠹",
      "⠸",
      "⠼",
      "⠴",
      "⠦",
      "⠔",
      "⠲",
      "⡀",
      "⢀",
      "⠠",
      "⠐",
      "⠈",
    ].map((item) => chalk.green(item)), //设置加载动画
  },
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: path.resolve(process.cwd()), // 根目录的上级目录
  binary: "git", // 二进制文件
  maxConcurrentProcesses: 6, // 最大并发数
};

export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options), "代码下载中...", {
      estimate: 7000, // 预计下载时间
    });
    // 下面就是一些相关的提示
    console.log()
    console.log(chalk.blueBright(`==================================`))
    console.log(chalk.blueBright(`=== 欢迎使用 david-quick-start-cli 脚手架 ===`))
    console.log(chalk.blueBright(`==================================`))
    console.log()
  } catch (error) {
    console.log(error);
    console.log('下载失败')
  }
};
