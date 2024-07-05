export interface League {
  id: string;
  name: string;
  logo: string;
  country: Country;
  seasons: Season[];
}

interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

interface Season {
  year: string;
  start: string;
  end: string;
  current: boolean;
}
