import chalk from 'chalk';
import { store } from '../helpers';
import { randomEntry } from '../utils';

export const random = async (): Promise<void> => {
  try {
    const entries = await store.get();
    const idea = randomEntry(entries);

    console.log('\n');

    Object.keys(idea) //? should be abstracted (present in list)
      .sort((k) => (k === 'name' ? -1 : 1))
      .forEach((key) => console.log(`${chalk.cyan(`${key.charAt(0).toUpperCase()}${key.slice(1)}:`)} ${idea[key]}`));

    console.log('\n');
  } catch (e) {
    console.log(chalk.red("Couldn't get random entry for some reason... my b"));
    return process.exit(1);
  }
};
