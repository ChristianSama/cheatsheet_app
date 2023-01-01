export interface ICheatsheet {
  id?: number;
  title?: string;
  description?: string;
  sections?: ISection[];
  user?: any;
  tags?: string[];
  vote_score?: number;
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

export interface Token {
  access: string;
  refresh: string;
}
