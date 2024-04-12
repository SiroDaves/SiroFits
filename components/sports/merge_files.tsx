"use client";

import { useState, useRef } from 'react';
import { FITParser, FITBuilder } from '@sports-alliance/sports-lib';
import type { Activity } from '@/types/fit';

export default function FitMerger() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mergedData, setMergedData] = useState<ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Type-safe file handling
  const handleFiles = async (files: FileList) => {
    const newActivities: Activity[] = [];
    
    for (const file of Array.from(files)) {
      const buffer = await file.arrayBuffer();
      const parser = new FITParser();
      const [event] = await parser.parse(buffer);
      newActivities.push(processActivity(event));
    }

    setActivities(prev => [...prev, ...newActivities]);
  };

  // Main merge logic (move to lib/fit-utils.ts)
  const mergeActivities = () => {
    if (activities.length < 2) return;
    
    const merged = activities.reduce((acc, activity) => {
      // Merge logic here
      return mergeTwoActivities(acc, activity);
    }, activities[0]);

    const builder = new FITBuilder(merged);
    setMergedData(builder.build());
  };

  return (
    <div className="merger-container">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={e => e.target.files && handleFiles(e.target.files)}
        accept=".fit"
      />
      
      <ActivityList activities={activities} />
      
      <button 
        onClick={mergeActivities}
        disabled={activities.length < 2}
      >
        Merge Activities
      </button>
      
      {mergedData && (
        <DownloadButton data={mergedData} filename="merged-activity.fit" />
      )}
    </div>
  );
}