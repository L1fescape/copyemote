import { Team } from '../models/team';
export declare function getAccessTokens(): string[];
export declare function getTeam(token: string): Promise<Team>;
