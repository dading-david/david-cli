import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";
import { update } from "./command/update";
const program = new Command("david-quick-start-cli");

program.version(version, "-v, --version");

program
  .command("create")
  .description("create a new project")
  .argument("[name]", "the name of the project")
  .action(async (dirName) => {
    create(dirName);
  });

program
  .command("update")
  .description("更新 david-quick-start-cli 至最新版本")
  .action(async () => {
    update();
  })

program.parse();
