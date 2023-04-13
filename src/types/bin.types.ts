export interface Idea {
  name: string;
  description: string;
  feasibility: number;
}

export type Operation = 'create' | 'random' | 'list' | 'remove' | 'clear' | 'exit';
