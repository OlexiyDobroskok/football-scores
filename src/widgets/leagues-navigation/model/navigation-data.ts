import { getLeagueLogo } from '@shared/api/football-api';

export interface NavLeague {
  id: string ;
  name: string;
  logo: string;
}

export const staticLeagues: NavLeague[] = [
  {
    id: '39',
    name: 'Premier League',
    logo: getLeagueLogo('39'),
  },
  {
    id: '78',
    name: 'Bundesliga',
    logo: getLeagueLogo('78'),
  },
  {
    id: '140',
    name: 'LaLiga',
    logo: getLeagueLogo('140'),
  },
  {
    id: '135',
    name: 'Serie A',
    logo: getLeagueLogo('135'),
  },
  {
    id: '61',
    name: 'Ligue 1',
    logo: getLeagueLogo('61'),
  },
];
