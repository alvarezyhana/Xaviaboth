import chalk from 'chalk';

const logger = {
    info: (message) => {
        console.log(chalk.bold.green('[INFO]') + ' ' + message);
    },
    warn: (message) => {
        console.log(chalk.bold.yellow('[WARN]') + ' ' + message);
    },
    error: (message) => {
        console.log(chalk.bold.red('[ERROR]') + ' ' + message);
    },
    system: (message) => {
        console.log(chalk.bold.blue('[SYSTEM]') + ' ' + message);
    },
    custom: (message, type, color = chalk.cyan) => {
        console.log(chalk.bold(color(`[${type}]`)) + ' ' + message);
    },
};

export default logger;
