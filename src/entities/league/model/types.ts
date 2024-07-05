export interface League {
  id: string;
  name: string;
  logo: string;
  country: Country;
  seasons: LeagueSeason[];
}

interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface LeagueSeason {
  year: string;
  start: string;
  end: string;
  current: boolean;
}
