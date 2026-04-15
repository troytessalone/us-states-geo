# us-states-geo for Python

Lightweight U.S. state border lookup utilities for Python.

## Install

```bash
pip install us-states-geo
```

## Exports

- `normalize_state_input(value)`
- `get_state_borders(value)`
- `find_states(filters)`
- `STATES`
- `COUNTRIES`

## Usage

```python
from border_kit import get_state_borders, find_states

texas = get_state_borders("tx")
print(texas)

isolated = find_states({"neighbor_count": {"eq": 0}})
print(isolated)
```

## API

### `normalize_state_input(value)`

Accepts a full state name or 2-letter abbreviation in any capitalization.

```python
normalize_state_input("ca")          # "CA"
normalize_state_input("California")  # "CA"
```

### `get_state_borders(value)`

Returns the matched state and its bordering states and countries.

### `find_states(filters=None)`

Returns a list of states with lightweight numeric filtering.

Supported operators:

- `eq`
- `ne`
- `lt`
- `lte`
- `gt`
- `gte`

Example:

```python
find_states({"neighbor_count": {"eq": 0}})
find_states({"neighbor_count": {"gte": 6}})
```

## Development

```bash
python -m pytest
```

## License

MIT
