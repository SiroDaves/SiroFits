export interface NotificationProps {
  openNotification: boolean;
  type: "success" | "error" | "warning" | "general";
  message?: string;
}

export interface UserMenuNavigationProps {
  label: string;
  path: string;
}

export interface NavigationProps {
  label: string;
  path: string;
  icon: string;
  children?: {
    label: string;
    path: string;
  }[];
}

export interface TabItemProps {
  label: string;
  key: string;
  path: string;
}

export interface PaginationProps {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
