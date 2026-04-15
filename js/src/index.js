// /js/src/index.js

import { COUNTRIES, STATES } from "./data.js";

/**
 * @typedef {{ abbreviation: string, name: string }} BorderEntity
 * @typedef {{
 *   state: { abbreviation: string, name: string },
 *   borders: {
 *     states: { count: number, list: BorderEntity[] },
 *     countries: { count: number, list: BorderEntity[] }
 *   }
 * }} StateBordersResult
 */

const STATE_NAME_TO_ABBREVIATION = Object.fromEntries(
  Object.entries(STATES).map(([abbreviation, state]) => [state.n.toUpperCase(), abbreviation])
);

const VALID_OPERATORS = new Set(["eq", "ne", "lt", "lte", "gt", "gte"]);

function sortAbbreviations(items = []) {
  return [...items].sort();
}

function toStateList(items = []) {
  return sortAbbreviations(items).map((abbreviation) => ({
    abbreviation,
    name: STATES[abbreviation].n
  }));
}

function toCountryList(items = []) {
  return sortAbbreviations(items).map((abbreviation) => ({
    abbreviation,
    name: COUNTRIES[abbreviation] || null
  }));
}

/**
 * Normalize a state name or abbreviation into a 2-letter abbreviation.
 * Accepts any capitalization.
 * @param {string} input
 * @returns {string}
 */
export function normalizeStateInput(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("State input is required and must be a string.");
  }

  const normalizedInput = input.trim().toUpperCase();
  const abbreviation = STATES[normalizedInput]
    ? normalizedInput
    : STATE_NAME_TO_ABBREVIATION[normalizedInput];

  if (!abbreviation) {
    throw new Error("Invalid state input. Provide a full state name or 2-letter abbreviation.");
  }

  return abbreviation;
}

/**
 * Get border data for a state.
 * @param {string} input
 * @returns {StateBordersResult}
 */
export function getStateBorders(input) {
  const abbreviation = normalizeStateInput(input);
  const stateData = STATES[abbreviation];

  const neighborStates = toStateList(stateData.s);
  const borderCountries = toCountryList(stateData.c);

  return {
    state: {
      abbreviation,
      name: stateData.n
    },
    borders: {
      states: {
        count: neighborStates.length,
        list: neighborStates
      },
      countries: {
        count: borderCountries.length,
        list: borderCountries
      }
    }
  };
}

function getSingleOperator(filter) {
  if (!filter || typeof filter !== "object" || Array.isArray(filter)) {
    throw new Error("Numeric filters must be objects like { eq: 0 }.");
  }

  const entries = Object.entries(filter);

  if (entries.length !== 1) {
    throw new Error("Numeric filters must contain exactly one operator.");
  }

  const [operator, expected] = entries[0];

  if (!VALID_OPERATORS.has(operator)) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  if (typeof expected !== "number" || Number.isNaN(expected)) {
    throw new Error("Numeric filter value must be a valid number.");
  }

  return [operator, expected];
}

function matchesNumericFilter(value, filter) {
  const [operator, expected] = getSingleOperator(filter);

  switch (operator) {
    case "eq":
      return value === expected;
    case "ne":
      return value !== expected;
    case "lt":
      return value < expected;
    case "lte":
      return value <= expected;
    case "gt":
      return value > expected;
    case "gte":
      return value >= expected;
    default:
      return false;
  }
}

/**
 * Find states by simple numeric filters.
 * Currently supports neighbor_count only.
 * @param {{ neighbor_count?: { eq?: number, ne?: number, lt?: number, lte?: number, gt?: number, gte?: number } }} [filters={}]
 * @returns {{ abbreviation: string, name: string, neighbor_count: number, country_count: number }[]}
 */
export function findStates(filters = {}) {
  if (!filters || typeof filters !== "object" || Array.isArray(filters)) {
    throw new Error("Filters must be an object.");
  }

  const entries = Object.entries(STATES).map(([abbreviation, state]) => ({
    abbreviation,
    name: state.n,
    neighbor_count: state.s.length,
    country_count: state.c.length
  }));

  if (!("neighbor_count" in filters)) {
    return entries.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
  }

  return entries
    .filter((entry) => matchesNumericFilter(entry.neighbor_count, filters.neighbor_count))
    .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
}

export { COUNTRIES, STATES };
export default {
  COUNTRIES,
  STATES,
  normalizeStateInput,
  getStateBorders,
  findStates
};
