export interface Player {
  id?: string;
  name: string;
  rooms?: Room[];
}

export interface Room {
  id: string;
  name: string;
  players: Player[];
  matches: Match[];
  language: Language;
}

export interface Match {
  id: string;
  createdAt: string;
  results: Result[];
  word: string;
  room: Room;
  roomId: string;
}

export interface Result {
  id: string;
  createdAt: string;
  match: Match;
  matchId: string;
  guesses: string[];
  player: Player;
  playerId: string;
}

export enum Language {
  EN,
  SE,
}
