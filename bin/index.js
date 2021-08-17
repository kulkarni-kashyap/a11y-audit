#!/usr/bin/env node
const yargs = require("yargs");
const { execSync } = require("child_process");
const chalk = require("chalk");


//TODO: Handle this better
  execSync("npm i -g pm2");
  execSync("npm i -g @axe-core/cli");


const options = yargs
 .usage(chalk.bold.green("Usage: a11y-audit -u <url> -s <shouldStartDevServer> -t <tags> -save <save> -b <browser>"))
 .option("u", { alias: "url", describe: "url to test", type: "string", demandOption: true })
 .option("s", { alias: "shouldStartDevServer", describe: "should start dev server", type: 'boolean', demandOption: false, default: true})
 .option("t", { alias: "tags", describe: "tags to test against", type: 'string', demandOption: false, default: 'wcag2aa' })
 .option("save", { alias: "saveResults", describe: "path to file to save results", type: "string", demandOption: false })
 .option("b", { alias: "browser", describe: "browser, defaults to headless chrome", type: "string", demandOption: false })
 .option("o", { alias: "other", describe: "other flags to be passed as space seperated", type: "array", demandOption: false})
 .argv;

if (options.s) {
    execSync("pm2 --name HelloWorld start npm -- start");
}

let otherFlags = '';
if (options.other) {
    for (let i = 0; i < options.o.length; i+=2) {
        otherFlags += ` --${options.o[i]} ${options.o[i+1]}`;
    }
}


let command = `axe ${options.u} --show-errors --exit --tags ${options.t}`;

options.save ? command += ` --save ${options.save}`: command;
options.browser ? command += ` --browser ${options.browser}` : command;
options.other ? command += otherFlags: command;

console.log(chalk.yellow('FINAL COMMAND:', command));

execSync(command, {stdio: 'inherit'});

options.shouldStartDevServer && execSync("pm2 delete 0");

options.save ? console.log(chalk.green.bold(`Operation completed and results are stored in ${options.save}`)) : console.log(chalk.green.bold('Operation completed..'));