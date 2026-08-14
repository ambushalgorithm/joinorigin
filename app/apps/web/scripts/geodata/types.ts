/**
 * Pipeline row types — the intermediate representations flowing through
 * CLEAN → DEDUP → JOIN → OVERLAY → LOCALIZE → SNAPSHOT (design §5.3).
 *
 * These are intentionally looser than the committed snapshot types
 * (`lib/seo/data/types.ts`) — rows carry raw GeoNames columns plus the
 * join/overlay enrichment fields the later steps need.
 */

/** A raw GeoNames `cities500` row (tab-separated). */
export interface GeoCityRow {
  geonameId: number;
  name: string;
  asciiName: string;
  alternateNames: string;
  lat: number;
  lng: number;
  featureClass: string;
  featureCode: string;
  countryCode: string;
  cc2: string;
  admin1Code: string;
  admin2Code: string;
  admin3Code: string;
  admin4Code: string;
  population: number;
  elevation: string;
  dem: string;
  timezone: string;
  modificationDate: string;
}

/** A GeoNames `countryInfo.txt` row. */
export interface GeoCountryRow {
  iso2: string;
  iso3: string;
  isoNumeric: string;
  fips: string;
  name: string;
  capital: string;
  area: string;
  population: number;
  continent: string;
  tld: string;
  currencyCode: string;
  currencyName: string;
  phone: string;
  postalFormat: string;
  postalRegex: string;
  languages: string;
  geonameId: number;
  neighbours: string;
}

/** A GeoNames `admin1CodesASCII.txt` row. */
export interface GeoAdmin1Row {
  /** `COUNTRY.ADMIN1` e.g. `US.TX`. */
  code: string;
  name: string;
  asciiName: string;
  geonameId: number;
}

/** A GeoNames `timeZones.txt` row. */
export interface GeoTimeZoneRow {
  countryCode: string;
  timezoneId: string;
  gmtOffsetJan: string;
  dstOffsetJul: string;
  rawOffset: string;
}

/** An alternate name (or Wikidata QID when language is `wkdt`). */
export interface GeoAlternateName {
  geonameId: number;
  isoLanguage: string;
  name: string;
  isPreferredName: boolean;
}

/** A SimpleMaps worldcities.csv row. */
export interface SimpleMapsRow {
  city: string;
  cityAscii: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  iso3: string;
  adminName: string;
  capital: 'primary' | 'admin' | 'minor' | '';
  population: number;
  id: string;
}

/** City after CLEAN + DEDUP + JOIN (before overlay/localize). */
export interface CleanCity {
  id: number;
  qid?: string;
  name: string;
  asciiName: string;
  lat: number;
  lng: number;
  countryIso2: string;
  regionId: string;
  population?: number;
  timezone: string;
  featureCode: string;
  capital: 'primary' | 'admin' | 'minor' | '';
  ranking?: 1 | 2 | 3 | 4 | 5;
  sameName: boolean;
  names: Record<string, string>;
}

/** Region after JOIN (before localization). */
export interface CleanRegion {
  id: string;
  name: string;
  asciiName: string;
  countryIso2: string;
  admin1Code: string;
  geonameId: number;
  population?: number;
  names: Record<string, string>;
}

/** Country after JOIN (before localization). */
export interface CleanCountry {
  iso2: string;
  iso3: string;
  name: string;
  asciiName: string;
  continent: string;
  capital: string;
  population: number;
  currency: string;
  languages: string[];
  tld: string;
  geonameId: number;
  names: Record<string, string>;
}
