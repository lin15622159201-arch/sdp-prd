import { SYSTEM_ENUM } from '@/core/http/env';

export interface IEnvItem {
  domainSystem: SYSTEM_ENUM; // 域名所属系统
  domainBaseUrl: string; // 域名地址
}

export interface AppState {
  systemDomain: Partial<Record<SYSTEM_ENUM, string>> | null;
}
