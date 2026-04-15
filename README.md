# border-kit

Lightweight U.S. state border lookup utilities for JavaScript and Python.

This package build includes two language folders:

- `/js` for the npm package
- `/py` for the Python package

Both versions include:

- state lookup by full name or 2-letter abbreviation
- case-insensitive input normalization
- `getStateBorders()` / `get_state_borders()`
- `findStates()` / `find_states()` with simple numeric filters

## Current query support

The current lightweight query helper supports:

- `neighbor_count.eq`
- `neighbor_count.ne`
- `neighbor_count.lt`
- `neighbor_count.lte`
- `neighbor_count.gt`
- `neighbor_count.gte`

Example:

```js
findStates({ neighbor_count: { eq: 0 } });
```

```py
find_states({"neighbor_count": {"eq": 0}})
```

## Notes

- This version is based on the user-provided state border dataset and logic.
- It currently models the 50 U.S. states and the two bordering countries used in the dataset: Canada and Mexico.
- DC is not included in this version.
