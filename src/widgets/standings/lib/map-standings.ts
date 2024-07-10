import { getTeamLogo, type StandingsDTO } from '@shared/api/football-api';

import { Standings, type TeamPosition } from '../model/types';

export const mapStandings = (standingsDTO: StandingsDTO): Standings[] => {
  const groups = new Set<string>();
  const events = new Set<string>()

  const teamPositions: TeamPosition[] = standingsDTO.league.standings
    .flat()
    .map((teamPositionDTO) => {
      groups.add(teamPositionDTO.group);
    
      if (teamPositionDTO.description) {
        events.add(teamPositionDTO.description)
      }

      return {
        rank: teamPositionDTO.rank,
        group: teamPositionDTO.group,
        description: teamPositionDTO.description,
        points: teamPositionDTO.points,
        team: {
          id: teamPositionDTO.team.id.toString(),
          name: teamPositionDTO.team.name,
          logo: getTeamLogo(teamPositionDTO.team.id),
        },
        goalsDiff: teamPositionDTO.goalsDiff,
        form: teamPositionDTO.form,
        played: teamPositionDTO.all.played,
        win: teamPositionDTO.all.win,
        draw: teamPositionDTO.all.draw,
        lose: teamPositionDTO.all.lose,
        goals: teamPositionDTO.all.goals,
        update: teamPositionDTO.update,
      };
    });

  return Array.from(groups).map((group) => ({
    group,
    groupEvents: Array.from(events),
    table: teamPositions.filter((teamPosition) => teamPosition.group === group),
  }));
};
