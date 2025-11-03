import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import type { FetchResult } from './types';

export interface SaveOptions {
  outputPath: string;
  format?: 'json' | 'typescript';
  pretty?: boolean;
}

export function saveData<T>(
  data: T,
  options: SaveOptions
): void {
  const { outputPath, format = 'json', pretty = true } = options;

  // Ensure directory exists
  const dir = dirname(outputPath);
  mkdirSync(dir, { recursive: true });

  if (format === 'json') {
    const content = pretty
      ? JSON.stringify(data, null, 2)
      : JSON.stringify(data);

    writeFileSync(outputPath, content, 'utf-8');
  } else if (format === 'typescript') {
    const content = `export default ${JSON.stringify(data, null, 2)} as const;\n`;
    writeFileSync(outputPath, content, 'utf-8');
  }
}

export function consolidateResults<T>(
  results: FetchResult<T>[]
): { success: FetchResult<T>[]; failed: FetchResult<T>[] } {
  const success: FetchResult<T>[] = [];
  const failed: FetchResult<T>[] = [];

  results.forEach(result => {
    if (result.success) {
      success.push(result);
    } else {
      failed.push(result);
    }
  });

  return { success, failed };
}

export function logResults(results: FetchResult[]): void {
  const { success, failed } = consolidateResults(results);

  console.log(`\n✓ Successfully fetched: ${success.length}`);
  success.forEach(r => {
    console.log(`  - ${r.source}`);
  });

  if (failed.length > 0) {
    console.log(`\n✗ Failed: ${failed.length}`);
    failed.forEach(r => {
      console.log(`  - ${r.source}: ${r.error}`);
    });
  }
}

