import type { Idea } from '@/types';
import iq from 'inquirer';
import { store } from '../helpers';
import chalk from 'chalk';

export const list = async (): Promise<void> => {
  try {
    const entries = await store.get();

    const { idea } = await iq.prompt<{ idea: Idea }>({
      type: 'list',
      name: 'idea',
      message: 'Select an idea to expand its contents',
      choices: entries.map((idea) => ({ name: idea.name, value: idea })),
    });

    console.log('\n');

    Object.keys(idea) // goofball activity
      .sort((k) => (k === 'name' ? -1 : 1))
      .forEach((key) => console.log(`${chalk.cyan(`${key.charAt(0).toUpperCase()}${key.slice(1)}:`)} ${idea[key]}`));

    console.log('\n');
  } catch (e) {
    console.log(chalk.red("Failed to show the list. Yes I know it's a core feature..."));
    return process.exit(1);
  }
};
