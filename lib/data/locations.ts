import locationsData from './locations.json';

export type AWSLocationType = 'AWS Region' | 'AWS Wavelength Zone' | 'AWS Local Zone';

export interface AWSLocation {
  name: string;
  code: string;
  type: AWSLocationType;
  label: string;
  continent: string;
}

export type LocationsData = Record<string, AWSLocation>;

export const locations: LocationsData = locationsData as LocationsData;

export function getAllRegions(): AWSLocation[] {
  return Object.values(locations).filter((loc) => loc.type === 'AWS Region');
}

export function getRegionsByContinent(continent: string): AWSLocation[] {
  return Object.values(locations).filter(
    (loc) => loc.type === 'AWS Region' && loc.continent === continent
  );
}

export function getLocationByCode(code: string): AWSLocation | undefined {
  return Object.values(locations).find((loc) => loc.code === code);
}

export function getAllContinents(): string[] {
  const continents = new Set(
    Object.values(locations)
      .filter((loc) => loc.type === 'AWS Region')
      .map((loc) => loc.continent)
  );
  return Array.from(continents).sort();
}

