import { Activity, Record } from "@/state/activity";

export const mergeTwoActivities = (
    first: Activity,
    second: Activity
  ): Activity => {
    if (!first.records.length || !second.records.length) {
      throw new Error('Activities must have records');
    }
  
    const lastFirstRecord = first.records[first.records.length - 1];
    const firstSecondRecord = second.records[0];
    
    const timeOffset = lastFirstRecord.timestamp.getTime() - 
                      firstSecondRecord.timestamp.getTime() + 1000;
  
    const adjustedSecondRecords: Record[] = second.records.map(record => ({
      ...record,
      timestamp: new Date(record.timestamp.getTime() + timeOffset)
    }));
  
    return {
      ...first,
      records: [...first.records, ...adjustedSecondRecords],
      laps: [...first.laps, ...second.laps],
      sessions: [...first.sessions, ...second.sessions],
      name: `${first.name} + ${second.name}`
    };
  };