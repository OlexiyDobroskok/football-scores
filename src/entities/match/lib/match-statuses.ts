export const matchShortStatuses = {
  TBD: 'TBD',
  NS: 'NS',
  '1H': '1H',
  HT: 'HT',
  '2H': '2H',
  ET: 'ET',
  BT: 'BT',
  P: 'P',
  SUSP: 'SUSP',
  INT: 'INT',
  FT: 'FT',
  AET: 'AET',
  PEN: 'PEN',
  PST: 'PST',
  CANC: 'CANC',
  ABD: 'ABD',
  AWD: 'AWD',
  WO: 'WO',
  LIVE: 'LIVE',
} as const;

export const upcomingStatusesQuery = `${matchShortStatuses.TBD}-${matchShortStatuses.NS}-${matchShortStatuses.PST}`;
export const liveStatusesQuery = `${matchShortStatuses['1H']}-${matchShortStatuses.HT}-${matchShortStatuses['2H']}-${matchShortStatuses.ET}-${matchShortStatuses.BT}-${matchShortStatuses.P}-${matchShortStatuses.SUSP}-${matchShortStatuses.INT}-${matchShortStatuses.LIVE}`;
export const finishedStatusesQuery = `${matchShortStatuses.FT}-${matchShortStatuses.AET}-${matchShortStatuses.PEN}-${matchShortStatuses.CANC}-${matchShortStatuses.ABD}-${matchShortStatuses.AWD}-${matchShortStatuses.WO}`;

