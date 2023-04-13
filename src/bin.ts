import type { Operation } from './types';
import fs from 'fs';
import iq from 'inquirer';
import { STORE_NAME } from './constants';
import { create, list, random, remove, clear } from './operations';
import { store } from './helpers';
import chalk from 'chalk';

const showOperations = async (): Promise<void> => {
  try {
    const entries = await store.get();
    const { operation } = await iq.prompt<{ operation: Operation }>([
      {
        type: 'list',
        name: 'operation',
        message: 'What would you like to do with your bin?',
        choices: [
          { name: chalk.greenBright('+ Add new entry'), value: 'create' },
          ...(entries.length !== 0
            ? [
                { name: chalk.blueBright('= List entries'), value: 'list' },
                { name: chalk.magentaBright('↻ Choose random'), value: 'random' },
                { name: chalk.hex('F5B720')('- Remove entry'), value: 'remove' },
                { name: chalk.red('/ Clear bin'), value: 'clear' },
              ]
            : []),
          { name: chalk.gray.underline.bold('Exit ➜'), value: 'exit' },
        ],
      },
    ]);

    if (operation === 'create') await create();
    if (operation === 'list') await list();
    if (operation === 'random') await random();
    if (operation === 'remove') await remove();
    if (operation === 'clear') await clear();
    if (operation === 'exit') return process.exit(0);

    return showOperations();
  } catch (e) {
    console.log(chalk.red('Failed to show operations for some reason...'));
    return process.exit(1);
  }
};

const showBinInformation = async () => {
  console.log(chalk.yellowBright.bold('📦 Bin information:'));
  console.log(`Bin name: ${chalk.dim(`${STORE_NAME}.json`)}`);
  console.log(`Total entries: ${chalk.dim(`${(await store.get()).length}`)}`);
  console.log(`Bin size: ${chalk.dim(`${fs.statSync(`${STORE_NAME}.json`).size / (1024 * 1000)} MB`)}`);
  console.log('\n');
};

(async () => {
  if (!fs.existsSync(`${STORE_NAME}.json`)) {
    const { shouldCreateBin } = await iq.prompt<{ shouldCreateBin: boolean }>({
      type: 'confirm',
      name: 'shouldCreateBin',
      message:
        "It looks like you don't have an existing bin, would you like to create one? (say yes, it's rhetorical bro)",
    });

    if (!shouldCreateBin) {
      console.log(chalk.red.bold("🦆 Silly goose! You can't use The Bin without a bin..."));
      return process.exit(0);
    }

    try {
      await fs.promises.writeFile(`${STORE_NAME}.json`, JSON.stringify([]));
      console.log(chalk.green('🌱 Successfully created a new bin! Now get to adding good ideas!\n'));
    } catch (e) {
      console.log(chalk.red("I'll be honest, something didn't do what it was suppose to... Reinstall?"));
      return process.exit(1);
    }
  }

  await showBinInformation();
  await showOperations();
})();
