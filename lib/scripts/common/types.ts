export interface FetchResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  source: string;
}

export interface FetchOptions {
  retries?: number;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface DataSourceConfig {
  id: string;
  name: string;
  url: string;
  type: 'locations' | 'pricing';
  transform?: (data: any) => any;
  validate?: (data: any) => boolean;
}

