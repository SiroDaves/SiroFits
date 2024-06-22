import { Athlete } from "../athlete/types";

export interface Login {
  token_type:    string;
  expires_at:    number;
  expires_in:    number;
  refresh_token: string;
  access_token:  string;
  athlete:       Athlete;
}
