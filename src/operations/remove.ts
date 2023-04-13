import type { Idea } from '../types';
import iq from 'inquirer';
import chalk from 'chalk';
import { store } from '../helpers';
import { randomEntry } from '../utils';

const removalPhrases = [
  'Yeah that one had to go...',
  'SHIT THAT WAS A GOOD ONE!',
  'Hm... yeah I guess that makes sense.',
  'Ok but did that one really have to go?',
  'And just like that a private island is out of the question.',
  'Ladies and Gentlemen an unfortunate decision...',
  'I mean somebody else is gonna do it right?',
  'Happy thoughts, Happy thoughts',
  '👀',
  'I wonder what other ideas are in the shadow realm...',
  'Yeah that idea was teetering on silly.',
];

export const remove = async (): Promise<void> => {
  const entries = await store.get();

  const { idea } = await iq.prompt<{ idea: Idea }>({
    type: 'list',
    name: 'idea',
    message: 'Select an idea to remove it from the bin.',
    choices: entries.map((idea) => ({ name: idea.name, value: idea })),
  });

  try {
    await store.write(idea, 'remove');
    return console.log(chalk.green(`🔥 Removed! ${randomEntry(removalPhrases)}\n`));
  } catch (e) {
    return console.log(chalk.red('Something went wrong removing idea from bin.'));
  }
};
