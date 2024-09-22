import _ from "lodash";

export const getURL = (url: string, queryParams = {}) => {
  if (_.isEmpty(queryParams)) {
    return url;
  }
  const params = new URLSearchParams({
    ...queryParams,
  });
  return `${url}?${params.toString()}`;
};

export const getInitials = (name?: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const matchSidebarPaths = (routerPath: string, optionPath: string) => {
  switch (true) {
    case routerPath.includes("/proposals"):
      return optionPath.includes("/proposals");
    case routerPath.includes("/dashboard"):
      return optionPath.includes("/dashboard");
    case routerPath.includes("/aml-apps"):
      return optionPath.includes("/aml-apps");
    case routerPath.includes("/medical-underwriting"):
      return optionPath.includes("/medical-underwriting");
    default:
      return routerPath.includes(optionPath);
  }
};

export const tryToParse = ({
  value,
  defaultValue,
}: {
  value: string;
  defaultValue: any;
}) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return defaultValue;
  }
};

export const CapitalizeFirstLetter = (string: any) => {
  return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
};
