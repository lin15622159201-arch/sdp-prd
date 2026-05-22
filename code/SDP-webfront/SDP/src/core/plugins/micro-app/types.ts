export interface IMICRO_APP_MAP_DATA {
  APP_CODE: string;
  URL: string;
  DEV_SERVER: {
    port: string;
    base: string;
  };
}

export type IMICRO_APP_MAP = Record<string, IMICRO_APP_MAP_DATA>;
