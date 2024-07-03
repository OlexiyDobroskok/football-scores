export const getLeagueLogo = (leagueId: string | number): string =>
  `https://media.api-sports.io/football/leagues/${leagueId}.png`;

export const getTeamLogo = (teamId: string | number): string =>
  `https://media.api-sports.io/football/teams/${teamId}.png`;

export const getCountryFlag = (countryCode: string) =>
  `https://media.api-sports.io/flags/${countryCode.toLowerCase()}.svg`;
