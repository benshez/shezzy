import LRU from 'lru-cache'

export interface ICacheOptions<T> {
  lru: LRU.Options<string, T>,
  cache: {
    key: string;
    request: { name: Function, args: any }
  }
}