import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const FormatDob = (dob?: string) => {
  const parsedDate = dayjs(dob, {
    format: "YYYYMMDDHHmmssSSS",
  });

  return parsedDate.format("DD-MMM-YYYY");
};

export const calculateBMI = (height: number, weight: number) => {
  if (height <= 0 || weight <= 0) {
    return "0";
  }
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);
  return bmi.toFixed(2).toString();
};

export const FormatGender = (genderCode: string) => {
  const upperCaseCode = genderCode?.toUpperCase();
  if (upperCaseCode === "M") {
    return "Male";
  } else if (upperCaseCode === "F") {
    return "Female";
  } else {
    return "Unknown";
  }
};

export function FormatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}

export const FormatDistance = (meters: number): string => {
  if (meters > 1000) {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  }
  else {
    return `${meters.toFixed(0)} m`;
  }
};

export const FormatElevation = (meters: number): string => {
  if (meters == 0) {
    return `---`;
  }
  else {
    return `${meters.toFixed(0)} m`;
  }
};

export function calculateSpeed(meters: number, seconds: number, activityType: string) {
  // Calculate speed in meters per second
  const speedMetersPerSecond = meters / seconds;

  if (activityType === 'Ride') {
    // Calculate speed in km per hour for Ride activity type
    const speedKmPerHour = (speedMetersPerSecond * 3600) / 1000;
    return speedKmPerHour.toFixed(1) + ' km/h';
  } else {
    // Calculate speed in minutes per km for Walk or Run activity types
    if (speedMetersPerSecond === 0) {
      // Avoid division by zero
      return 0;
    }
    const speedMinutesPerKm = 1 / ((speedMetersPerSecond / 1000) / 60);
    return speedMinutesPerKm.toFixed(2) + '/km';
  }
}
export const GetLookupDescription = (itemCode: any, lookupList: any) => {
  for (let i = 0; i < lookupList?.length; i++) {
    if (lookupList[i]?.itemCode === itemCode) {
      return lookupList[i]?.itemDescription;
    }
  }
  return itemCode;
};
