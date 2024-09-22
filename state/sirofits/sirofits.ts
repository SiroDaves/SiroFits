import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { parseStringPromise, Builder } from 'xml2js';

interface SirofitsState {
  loading: boolean;
  submit: boolean;
  fileData: any | null;
  selectedFile: any | null;
  selectedFileType: any | null;

  toggleAppModal: (payload: any) => void;
  updateSelectedFile: (payload: any) => void;
  setSelectedFileType: (payload: any) => void;
  viewFile: (
    fileSize: string,
    fileType: string,
  ) => Promise<any>;
  parseGpsData: (xmlData: string) => Promise<any>;
  alterGpsData: (xmlData: string, newStartTime: string) => Promise<any>;
  combineGpsFiles: (files: File[]) => Promise<any>;
}

export const useSirofitsStore = create<SirofitsState>()(
  persist(
    (set) => ({
      loading: false,
      submit: false,
      fileData: {
        'movingTime': 0,
        'elapsedTime': 0,
        'avgSpeed': 0,
        'maxSpeed': 0,
        'avgHeartRate': 0,
        'maxHeartRate': 0,
        'startTime': 0,
      },
      selectedFile: null,
      selectedFileType: null,

      toggleAppModal: (payload) => { },
      updateSelectedFile: (payload) => {
        set({ selectedFile: payload });
      },
      setSelectedFileType: (payload) => {
        set({ selectedFileType: payload });
      },
      viewFile: async (fileSize: string, fileType: string) => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          try {

          } catch (error: any) {
            set({ loading: false, fileData: null });
            return reject(error);
          }
        });
      },
      parseGpsData: async (xmlData: string) => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "text/xml");

          const trackpoints = xmlDoc.getElementsByTagName("Trackpoint");

          if (trackpoints.length === 0) {
            console.log("No trackpoints found");
            return;
          }

          let totalSpeed = 0;
          let maxSpeed = 0;
          let totalHeartRate = 0;
          let maxHeartRate = 0;
          let heartRateCount = 0;
          let movingTime = 0;
          const speedThreshold = 0.5;

          const startTime = new Date(trackpoints[0].getElementsByTagName("Time")[0].textContent || '');
          const endTime = new Date(trackpoints[trackpoints.length - 1].getElementsByTagName("Time")[0].textContent || '');

          for (let i = 0; i < trackpoints.length; i++) {
            const speedEl = trackpoints[i].getElementsByTagName("ns3:Speed")[0] || trackpoints[i].getElementsByTagName("Speed")[0];
            const speed = speedEl ? parseFloat(speedEl.textContent || '0') : 0;

            if (speed > 0) {
              totalSpeed += speed;
              if (speed > maxSpeed) {
                maxSpeed = speed;
              }
            }

            if (speed > speedThreshold && i > 0) {
              const currentTime = new Date(trackpoints[i].getElementsByTagName("Time")[0].textContent || '').getTime();
              const prevTime = new Date(trackpoints[i - 1].getElementsByTagName("Time")[0].textContent || '').getTime();
              movingTime += (currentTime - prevTime) / 1000;
            }

            const heartRateEl = trackpoints[i].getElementsByTagName("HeartRateBpm")[0];
            if (heartRateEl) {
              const heartRate = parseInt(heartRateEl.getElementsByTagName("Value")[0].textContent || '0', 10);
              totalHeartRate += heartRate;
              heartRateCount++;
              if (heartRate > maxHeartRate) {
                maxHeartRate = heartRate;
              }
            }
          }

          const averageSpeed = totalSpeed / trackpoints.length;
          const averageHeartRate = heartRateCount > 0 ? totalHeartRate / heartRateCount : 0;

          set({
            fileData: {
              movingTime: movingTime.toFixed(0),
              elapsedTime: ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(0),
              avgSpeed: (averageSpeed * 3.6).toFixed(1),
              maxSpeed: (maxSpeed * 3.6).toFixed(1),
              avgHeartRate: averageHeartRate.toFixed(0),
              maxHeartRate: maxHeartRate.toFixed(0),
              startTime: startTime,
            },
            loading: false,
          });
        });
      },
      alterGpsData: async (xmlData: string, newStartTime: string) => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "text/xml");

          const idElement = xmlDoc.getElementsByTagName("Id")[0];
          if (idElement) {
            idElement.textContent = newStartTime;
          }

          const lapElement = xmlDoc.getElementsByTagName("Lap")[0];
          if (lapElement) {
            lapElement.setAttribute("StartTime", newStartTime);
          }

          const trackpointElements = xmlDoc.getElementsByTagName("Trackpoint");
          for (let i = 0; i < trackpointElements.length; i++) {
            const timeElement = trackpointElements[i].getElementsByTagName("Time")[0];
            if (timeElement) {
              const currentTime = new Date(newStartTime);
              currentTime.setSeconds(currentTime.getSeconds() + i);
              timeElement.textContent = currentTime.toISOString().substring(0, 19) + "Z";
            }
          }

          const serializer = new XMLSerializer();
          set({
            selectedFile: serializer.serializeToString(xmlDoc),
            loading: false,
          });
        });
      },
      combineGpsFiles: (files: File[]) => {
        set({ loading: true });

        return new Promise(async (resolve, reject) => {
          try {
            const serializer = new XMLSerializer();
            let combinedXml = '';

            for (const file of files) {
              const text = await file.text(); // Read file content
              const doc = new DOMParser().parseFromString(text, "application/xml");
              const trackpoints = Array.from(doc.getElementsByTagName("Trackpoint")) as Element[];

              // Serialize each Trackpoint and append to the combined string
              trackpoints.forEach(trackpoint => {
                combinedXml += serializer.serializeToString(trackpoint);
              });
            }

            set({
              selectedFile: combinedXml,
              loading: false,
            });
          } catch (error) {
            set({ loading: false });
            reject(error);
          }
        });
      }
    }),

    {
      name: "siro-fits-app:files",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedFile: state.selectedFile,
      }),
    }
  )
);
