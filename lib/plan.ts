export const Contains = (codes: number[], code: number): boolean => {
  for (const c of codes) {
    if (c === code) {
      return true;
    }
  }
  return false;
};

export const DisplayQuestion = (key: string) => {
  switch (key) {
    case "userWeight":
      return `What is your Weight(kg)?`;
    case "height":
      return `What is Height(cm)?`;
    case "hasConsultedDoctorLast10Years":
      return `Have you consulted or been examined by any doctor within the last 10 years?`;
    case "doctorConsultationDetails":
      return `If yes, give the name, address, diagnosis and treatment you received?`;
    case "hasHealthConditions":
      return `Do you have any health conditions, are undergoing treatment or taking medication of any kind?`;
    case "hasTobaccoAlcoholDrugUse":
      return `Have you used tobacco products, alcohol, or any habit-forming drugs within the last 10 years?`;
    case "tobaccoAlcoholDrugUseDetails":
      return `If yes, state type of product and average daily use`;
    case "hasFamilyMedicalHistory":
      return `Have you ever had or any member of your family been advised to have a surgery, suffered from diabetes, hypertension, heart disease, mental illness or cancer of any nature or any blood vessels related conditions?`;
    case "otherAbnormalities":
      return `Do you have any abnormality, disease or disorder not mentioned above?`;
    case "isPregnant":
      return `Are you pregnant?`;
    case "pregnancyWeeks":
      return `If Yes, give the number of weeks?`;
    case "hasEngagedInHazardousActivities":
      return `Have you ever engaged in racing under water, diving, parachuting or any other hazardous occupation or sport or is any such activity contemplated?`;
    default:
      return key;
  }
};
