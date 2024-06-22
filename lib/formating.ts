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

export const FormatFrequency = (interval: number) => {
  switch (interval) {
    case 1:
      return "Monthly";
    case 3:
      return "Quarterly";
    case 6:
      return "Biannualy";
    case 12:
      return "Annualy";
    case 99:
      return "Single Premium";
    default:
      return interval.toString();
  }
};

export const FormatCurrency = (amount: number): string => {
  return amount?.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });
};

export const GetLookupDescription = (itemCode: any, lookupList: any) => {
  for (let i = 0; i < lookupList?.length; i++) {
    if (lookupList[i]?.itemCode === itemCode) {
      return lookupList[i]?.itemDescription;
    }
  }
  return itemCode;
};
