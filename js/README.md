# us-states-geo for JavaScript

Lightweight U.S. state border lookup utilities for JavaScript.

## Install

```bash
npm install us-states-geo
```

## Exports

- `normalizeStateInput(input)`
- `getStateBorders(input)`
- `findStates(filters)`
- `STATES`
- `COUNTRIES`

## Usage

```js
import { getStateBorders, findStates } from "us-states-geo";

const texas = getStateBorders("tx");
console.log(texas);

const isolated = findStates({ neighbor_count: { eq: 0 } });
console.log(isolated);
```

## API

### `normalizeStateInput(input)`

Accepts a full state name or 2-letter abbreviation in any capitalization.

```js
normalizeStateInput("ca"); // "CA"
normalizeStateInput("California"); // "CA"
```

### `getStateBorders(input)`

Returns the matched state and its bordering states and countries.

```js
getStateBorders("TX");
```

Example output:

```json
{
  "state": {
    "abbreviation": "TX",
    "name": "Texas"
  },
  "borders": {
    "states": {
      "count": 4,
      "list": [
        { "abbreviation": "AR", "name": "Arkansas" },
        { "abbreviation": "LA", "name": "Louisiana" },
        { "abbreviation": "NM", "name": "New Mexico" },
        { "abbreviation": "OK", "name": "Oklahoma" }
      ]
    },
    "countries": {
      "count": 1,
      "list": [
        { "abbreviation": "MX", "name": "Mexico" }
      ]
    }
  }
}
```

### `findStates(filters = {})`

Returns a list of states with lightweight numeric filtering.

Supported operators:

- `eq`
- `ne`
- `lt`
- `lte`
- `gt`
- `gte`

Example:

```js
findStates({ neighbor_count: { eq: 0 } });
findStates({ neighbor_count: { gte: 6 } });
```

Example output:

```json
[
  {
    "abbreviation": "AK",
    "name": "Alaska",
    "neighbor_count": 0,
    "country_count": 1
  },
  {
    "abbreviation": "HI",
    "name": "Hawaii",
    "neighbor_count": 0,
    "country_count": 0
  }
]
```

## Development

```bash
npm test
```

## License

MIT
