// /js/src/index.d.ts

export type NumericFilter = {
  eq?: number;
  ne?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type BorderEntity = {
  abbreviation: string;
  name: string | null;
};

export type StateBordersResult = {
  state: {
    abbreviation: string;
    name: string;
  };
  borders: {
    states: {
      count: number;
      list: BorderEntity[];
    };
    countries: {
      count: number;
      list: BorderEntity[];
    };
  };
};

export type FindStatesFilters = {
  neighbor_count?: NumericFilter;
};

export type FindStatesResultItem = {
  abbreviation: string;
  name: string;
  neighbor_count: number;
  country_count: number;
};

export declare const STATES: Record<string, { n: string; s: string[]; c: string[] }>;
export declare const COUNTRIES: Record<string, string>;

export declare function normalizeStateInput(input: string): string;
export declare function getStateBorders(input: string): StateBordersResult;
export declare function findStates(filters?: FindStatesFilters): FindStatesResultItem[];

declare const _default: {
  STATES: typeof STATES;
  COUNTRIES: typeof COUNTRIES;
  normalizeStateInput: typeof normalizeStateInput;
  getStateBorders: typeof getStateBorders;
  findStates: typeof findStates;
};

export default _default;
