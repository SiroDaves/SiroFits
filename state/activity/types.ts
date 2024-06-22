import { Athlete } from "../athlete/types";

export interface Activity {
    resource_state:                number;
    athlete:                       Athlete;
    name:                          string;
    distance:                      number;
    moving_time:                   number;
    elapsed_time:                  number;
    total_elevation_gain:          number;
    type:                          Type;
    sport_type:                    Type;
    workout_type?:                 number | null;
    id:                            number;
    start_date:                    Date;
    start_date_local:              Date;
    timezone:                      Timezone;
    utc_offset:                    number;
    location_city:                 null;
    location_state:                null;
    location_country:              LocationCountry;
    achievement_count:             number;
    kudos_count:                   number;
    comment_count:                 number;
    athlete_count:                 number;
    photo_count:                   number;
    map:                           Map;
    trainer:                       boolean;
    commute:                       boolean;
    manual:                        boolean;
    private:                       boolean;
    visibility:                    Visibility;
    flagged:                       boolean;
    gear_id:                       GearID | null;
    start_latlng:                  number[];
    end_latlng:                    number[];
    average_speed:                 number;
    max_speed:                     number;
    average_temp?:                 number;
    average_watts?:                number;
    kilojoules?:                   number;
    device_watts?:                 boolean;
    has_heartrate:                 boolean;
    heartrate_opt_out:             boolean;
    display_hide_heartrate_option: boolean;
    elev_high:                     number;
    elev_low:                      number;
    upload_id:                     number;
    upload_id_str:                 string;
    external_id:                   string;
    from_accepted_tag:             boolean;
    pr_count:                      number;
    total_photo_count:             number;
    has_kudoed:                    boolean;
    average_cadence?:              number;
    average_heartrate?:            number;
    max_heartrate?:                number;
}

export enum GearID {
    B13820055 = "b13820055",
    G15999668 = "g15999668",
    G16417216 = "g16417216",
}

export enum LocationCountry {
    Kenya = "Kenya",
}

export interface Map {
    id:               string;
    summary_polyline: string;
    resource_state:   number;
}

export enum Type {
    Ride = "Ride",
    Run = "Run",
    Walk = "Walk",
    Swim = "Swim",
    Hike = "Hike",
}

export enum Timezone {
    GMT0300AfricaNairobi = "(GMT+03:00) Africa/Nairobi",
}

export enum Visibility {
    Everyone = "everyone",
}
