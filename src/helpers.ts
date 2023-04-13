import type { Idea } from './types';
import fs from 'fs/promises';
import { STORE_NAME } from './constants';

const getEntries = async (): Promise<Array<Idea>> => {
  try {
    const text = await fs.readFile(`${STORE_NAME}.json`, 'utf-8');
    const data: Array<Idea> = JSON.parse(text);
    return data;
  } catch (e) {
    throw new Error('Failed to retrieve entries from bin.');
  }
};

const writeEntry = async (idea: Idea, method: 'add' | 'remove'): Promise<void> => {
  try {
    const entries = await getEntries();
    if (method === 'remove') {
      return await fs.writeFile(
        `${STORE_NAME}.json`,
        JSON.stringify(entries.filter((entry) => entry.name !== idea.name))
      );
    }
    return await fs.writeFile(`${STORE_NAME}.json`, JSON.stringify([...entries, idea]));
  } catch (e) {
    throw new Error('Failed to write to bin.');
  }
};

export const store = { get: getEntries, write: writeEntry };
