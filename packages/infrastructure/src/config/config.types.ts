import { DeepPartial } from '@backend/core/common/custom.type';
import { z } from 'zod';

export interface IConfigService<T = any> {
  find(key: string): string | undefined;
  get<K extends keyof T>(key: K): T[K];
  getConfig(): T;
}

export type Env = { [k: string]: string | undefined };

export interface ConfigServiceOptions<T> {
  envFilePath: string;
  validationSchema: z.ZodSchema<T>;
  name?: string;
  configBuilder: (
    findFn: (key: string) => string | undefined,
  ) => DeepPartial<T>;
}
