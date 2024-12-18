export interface ICacheService {
  get<T>(key: string): Promise<T>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
};
