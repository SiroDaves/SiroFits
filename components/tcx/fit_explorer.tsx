"use client";

import { useState } from 'react';
import { FITParser } from '@sports-alliance/sports-lib';

// Define basic TypeScript interfaces for the data we'll extract
interface FitSession {
  totalDistance?: number;
  totalTimerTime?: number;
  startTime?: Date;
  sport?: string;
  avgSpeed?: number;
  maxSpeed?: number;
}

interface FitRecord {
  timestamp?: Date;
  position?: {
    lat: number;
    long: number;
  };
  heartRate?: number;
  cadence?: number;
  power?: number;
}

interface FitEvent {
  sessions: FitSession[];
  records: FitRecord[];
  laps: any[];
  deviceInfos: any[];
}

export default function FITFileViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<FitEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsLoading(true);
    setError(null);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Parse FIT file
      const parser = new FITParser();
      const parsedEvents = await parser.parse(arrayBuffer);
      
      // Extract first event (most FIT files have one event)
      const firstEvent = parsedEvents[0] as FitEvent;
      
      // Convert timestamps to Date objects
      firstEvent.sessions?.forEach(session => {
        if (session.startTime) session.startTime = new Date(session.startTime);
      });
      
      firstEvent.records?.forEach(record => {
        if (record.timestamp) record.timestamp = new Date(record.timestamp);
      });

      setEvents(firstEvent);
    } catch (err) {
      console.error('Error parsing FIT file:', err);
      setError('Failed to parse FIT file. Please ensure it\'s a valid file from Strava.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">FIT File Viewer</h1>
      
      <div className="mb-6">
        <input
          type="file"
          accept=".fit"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {isLoading && <p className="text-gray-600">Loading and parsing file...</p>}
      
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {events && (
        <div className="space-y-6">
          {/* Session Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
            {events.sessions?.map((session, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Sport:</p>
                  <p>{session.sport || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium">Start Time:</p>
                  <p>{session.startTime?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium">Distance:</p>
                  <p>{(session.totalDistance || 0).toFixed(2)} meters</p>
                </div>
                <div>
                  <p className="font-medium">Duration:</p>
                  <p>{formatDuration(session.totalTimerTime)}</p>
                </div>
                <div>
                  <p className="font-medium">Avg Speed:</p>
                  <p>{(session.avgSpeed || 0).toFixed(2)} m/s</p>
                </div>
                <div>
                  <p className="font-medium">Max Speed:</p>
                  <p>{(session.maxSpeed || 0).toFixed(2)} m/s</p>
                </div>
              </div>
            ))}
          </div>

          {/* Records Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Track Points ({events.records?.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Heart Rate</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cadence</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Power</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.records?.slice(0, 10).map((record, index) => ( // Show first 10 records
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {record.timestamp?.toLocaleTimeString() || 'N/A'}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {record.position 
                          ? `${record.position.lat.toFixed(5)}, ${record.position.long.toFixed(5)}`
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {record.heartRate || 'N/A'}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {record.cadence || 'N/A'}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {record.power || 'N/A'} W
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {events.records && events.records.length > 10 && (
              <p className="mt-4 text-sm text-gray-500">
                Showing first 10 of {events.records.length} records
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}