import type { FetchResult, FetchOptions, DataSourceConfig } from './types';

export async function fetchData<T = any>(
  config: DataSourceConfig,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const {
    retries = 3,
    timeout = 30000,
    headers = {}
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(config.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'AWS Price Tracker',
          ...headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform if needed
      const transformedData = config.transform
        ? config.transform(data)
        : data;

      // Validate if needed
      if (config.validate && !config.validate(transformedData)) {
        throw new Error(`Validation failed for ${config.id}`);
      }

      return {
        success: true,
        data: transformedData,
        source: config.id
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Unknown error',
    source: config.id
  };
}

export async function fetchMultiple<T = any>(
  configs: DataSourceConfig[],
  options: FetchOptions = {}
): Promise<FetchResult<T>[]> {
  const results = await Promise.allSettled(
    configs.map(config => fetchData<T>(config, options))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return {
      success: false,
      error: result.reason?.message || 'Unknown error',
      source: configs[index].id
    };
  });
}

