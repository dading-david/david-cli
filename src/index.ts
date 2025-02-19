import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";

const program = new Command("David-cli");

program.version(version, "-v, --version");

program
  .command("create")
  .description("create a new project")
  .argument("[name]", "the name of the project")
  .action(async (dirName) => {
    create(dirName);
  });

program.parse();
