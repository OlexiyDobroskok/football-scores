interface Team {
  id: string;
  name: string;
  logo: string;
}

interface Goals {
  for: number,
  against: number,
}
export interface TeamPosition {
  rank: number;
  group:string;
  description: string | null,
  team: Team;
  points: number,
  goalsDiff: number,
  form: string | null,
  played: number,
  win: number,
  draw: number,
  lose: number,
  goals: Goals,
  update: string,
}

export interface Standings {
  group:string,
  groupEvents:string[],
  table: TeamPosition[],
}

