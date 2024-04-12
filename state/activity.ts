export interface Activity {
    name: string;
    startTime: Date;
    records: Record[];
    laps: Lap[];
    sessions: Session[];
}

export interface Record {
    timestamp: Date;
    position?: {
        lat: number;
        lon: number;
    };
    heartRate?: number;
    cadence?: number;
    power?: number;
    altitude?: number;
}

export interface Lap {
    startTime: Date;
    totalDistance: number;
    totalTimerTime: number;
}

export interface Session {
    sport: string;
    startTime: Date;
    totalDistance: number;
}