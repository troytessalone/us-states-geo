// /js/test/index.test.js

import test from "node:test";
import assert from "node:assert/strict";
import { findStates, getStateBorders, normalizeStateInput } from "../src/index.js";

test("normalizeStateInput supports names and abbreviations in any capitalization", () => {
  assert.equal(normalizeStateInput("tx"), "TX");
  assert.equal(normalizeStateInput("Texas"), "TX");
  assert.equal(normalizeStateInput("tExAs"), "TX");
});

test("getStateBorders returns Texas border data", () => {
  const result = getStateBorders("TX");

  assert.equal(result.state.abbreviation, "TX");
  assert.equal(result.borders.states.count, 4);
  assert.deepEqual(
    result.borders.countries.list,
    [{ abbreviation: "MX", name: "Mexico" }]
  );
});

test("findStates filters by neighbor_count eq 0", () => {
  const result = findStates({ neighbor_count: { eq: 0 } });

  assert.deepEqual(
    result.map((item) => item.abbreviation),
    ["AK", "HI"]
  );
});
