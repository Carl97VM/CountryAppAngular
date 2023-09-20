import { Country } from "./country";
import { Region } from "./region.type";


export interface CacheStore {
  byCapital: termCountries;
  byCountries: termCountries;
  byRegion: RegionCountries;
}

export interface termCountries {
  term: string,
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
