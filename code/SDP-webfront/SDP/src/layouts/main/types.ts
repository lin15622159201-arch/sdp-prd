export type IUserConfig = {
  userName?: string;
  companyName?: string;
  operations: Array<{
    name: string;
    onClick: () => void;
    hidden?: boolean;
    icon: string;
  }>;
};
