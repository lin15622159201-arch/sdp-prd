/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMeta {
  readonly glob: <T = any>(
    pattern: string | string[],
    options?: { eager?: boolean; import?: string; as?: string; },
  ) => Record<string, T>;
}
