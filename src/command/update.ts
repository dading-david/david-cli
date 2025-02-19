import { execSync } from 'child_process';
import chalk from 'chalk';

export async function update() {
  try {
    // 执行 npm update 命令更新包
    console.log(chalk.blue('正在更新 david-quick-start-cli...'));
    execSync('npm update david-quick-start-cli -g', { stdio: 'inherit' });
    
    // 获取更新后的版本
    const newVersion = execSync('npm view david-quick-start-cli version').toString().trim();
    
    console.log();
    console.log(chalk.green('✨ 更新成功!'));
    console.log(chalk.green(`当前版本: v${newVersion}`));
    console.log();
    
  } catch (error) {
    console.log();
    console.log(chalk.red('更新失败!'));
    console.log(chalk.red(error));
    console.log();
    process.exit(1);
  }
}