import type { Idea } from '@/types';
import iq from 'inquirer';
import chalk from 'chalk';
import { store } from '../helpers';
import { randomEntry } from '../utils';

const creationPhrases = [
  'I like the look of this one...',
  'THIS IS IT! THE MILLION DOLLAR IDEA!',
  'Wait we seriously adding that?',
  'Where the VCs at...',
  'WOOOOOOOOO YEAAHHHHHHH!',
  'tbh... yeah I fw that idea',
  'We sure about the feasibility on that one?',
  'This is gonna be expensive...',
  "GET THE TEAM WE'RE MAKING THIS HAPPEN RIGHT NOW!",
  'Now that is just silly...',
];

export const create = async () => {
  const idea = await iq.prompt<Idea>([
    {
      type: 'input',
      name: 'description',
      message: 'Describe your idea',
    },
    {
      type: 'input', // optional skip?
      name: 'name', // name validation?
      message: 'What would you like to name this idea?',
    },
    {
      type: 'input',
      name: 'feasibility',
      message: 'What is the feasibility of this idea? (1-10)',
      validate: (input) => {
        if (Number.isNaN(input)) return 'feasibility must be a number from 1-10';
        if (!Array.from({ length: 10 }, (_, i) => i + 1).includes(Number(input)))
          return 'feasibility must be a number from 1-10';
        return true;
      },
    },
  ]);

  try {
    await store.write(idea, 'add');
    return console.log(chalk.green(`🌳 Added! ${randomEntry(creationPhrases)}\n`));
  } catch (e) {
    return console.log(chalk.red('WTF! Something went wrong adding idea to bin.'));
  }
};
