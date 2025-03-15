import chalk from 'chalk';

export const logger = {
    info: (message: string, data?: any) => {
        console.log(
            `${chalk.blue('ℹ️')} ${chalk.blue(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    success: (message: string, data?: any) => {
        console.log(
            `${chalk.green('✅')} ${chalk.green(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    warn: (message: string, data?: any) => {
        console.log(
            `${chalk.yellow('⚠️')} ${chalk.yellow(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    error: (message: string, data?: any) => {
        console.log(
            `${chalk.red('❌')} ${chalk.red.bold(message)}`,
            data ? chalk.red(JSON.stringify(data, null, 2)) : ''
        );
    },
    upload: (message: string, data?: any) => {
        console.log(
            `${chalk.cyan('📤')} ${chalk.cyan(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    auth: (message: string, data?: any) => {
        console.log(
            `${chalk.magenta('🔐')} ${chalk.magenta(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    debug: (message: string, data?: any) => {
        console.log(
            `${chalk.gray('🔍')} ${chalk.gray(message)}`,
            data ? chalk.gray(JSON.stringify(data, null, 2)) : ''
        );
    },
    progress: (percent: number) => {
        const width = 30;
        const completed = Math.floor((width * percent) / 100);
        const remaining = width - completed;
        const bar = chalk.green('█'.repeat(completed)) + chalk.gray('█'.repeat(remaining));
        console.log(`${chalk.cyan('📊')} Progress: ${bar} ${chalk.yellow(percent.toFixed(1))}%`);
    }
};