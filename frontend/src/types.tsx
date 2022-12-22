export interface ICheatsheet {
  id?: number;
  title?: string;
  description?: string;
  sections?: ISection[];
}

export interface ISection {
  id?: number;
  title?: string;
  description?: string;
  lines?: ILine[];
}

export interface ILine {
  id?: number;
  description: string;
  snippet: string;
}