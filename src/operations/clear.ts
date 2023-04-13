import chalk from 'chalk';
import fs from 'fs/promises';
import iq from 'inquirer';
import { STORE_NAME } from '../constants';

export const clear = async () => {
  const { shouldClear } = await iq.prompt<{ shouldClear: boolean }>({
    type: 'confirm',
    name: 'shouldClear',
    message: 'Are you sure you want to clear your bin?',
  });

  if (!shouldClear) return console.log(chalk.gray('Woah that was a close one!'));

  try {
    await fs.writeFile(`${STORE_NAME}.json`, JSON.stringify([]));
    return console.log(chalk.hex('#F5B720')("💥 It's done. Your million dollar ideas are dead..."));
  } catch (e) {
    console.log(chalk.red('Failed to clear bin... delete it? idfk'));
    return process.exit(1);
  }
};
