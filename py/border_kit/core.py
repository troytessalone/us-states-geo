# /py/border_kit/core.py

from __future__ import annotations

from typing import Any, Dict, List, Tuple

from .data import COUNTRIES, STATES

VALID_OPERATORS = {"eq", "ne", "lt", "lte", "gt", "gte"}

STATE_NAME_TO_ABBREVIATION = {
    state["n"].upper(): abbreviation
    for abbreviation, state in STATES.items()
}


def _sort_abbreviations(items: List[str] | None = None) -> List[str]:
    return sorted(items or [])


def _to_state_list(items: List[str] | None = None) -> List[Dict[str, str]]:
    return [
        {"abbreviation": abbreviation, "name": STATES[abbreviation]["n"]}
        for abbreviation in _sort_abbreviations(items)
    ]


def _to_country_list(items: List[str] | None = None) -> List[Dict[str, str | None]]:
    return [
        {"abbreviation": abbreviation, "name": COUNTRIES.get(abbreviation)}
        for abbreviation in _sort_abbreviations(items)
    ]


def normalize_state_input(value: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("State input is required and must be a string.")

    normalized = value.strip().upper()
    abbreviation = normalized if normalized in STATES else STATE_NAME_TO_ABBREVIATION.get(normalized)

    if not abbreviation:
        raise ValueError("Invalid state input. Provide a full state name or 2-letter abbreviation.")

    return abbreviation


def get_state_borders(value: str) -> Dict[str, Any]:
    abbreviation = normalize_state_input(value)
    state_data = STATES[abbreviation]

    neighbor_states = _to_state_list(state_data["s"])
    border_countries = _to_country_list(state_data["c"])

    return {
        "state": {
            "abbreviation": abbreviation,
            "name": state_data["n"],
        },
        "borders": {
            "states": {
                "count": len(neighbor_states),
                "list": neighbor_states,
            },
            "countries": {
                "count": len(border_countries),
                "list": border_countries,
            },
        },
    }


def _get_single_operator(filter_obj: Dict[str, Any]) -> Tuple[str, float]:
    if not isinstance(filter_obj, dict):
        raise ValueError("Numeric filters must be objects like {'eq': 0}.")

    items = list(filter_obj.items())

    if len(items) != 1:
        raise ValueError("Numeric filters must contain exactly one operator.")

    operator, expected = items[0]

    if operator not in VALID_OPERATORS:
        raise ValueError(f"Unsupported operator: {operator}")

    if not isinstance(expected, (int, float)) or isinstance(expected, bool):
        raise ValueError("Numeric filter value must be a valid number.")

    return operator, float(expected)


def _matches_numeric_filter(value: float, filter_obj: Dict[str, Any]) -> bool:
    operator, expected = _get_single_operator(filter_obj)

    if operator == "eq":
        return value == expected
    if operator == "ne":
        return value != expected
    if operator == "lt":
        return value < expected
    if operator == "lte":
        return value <= expected
    if operator == "gt":
        return value > expected
    if operator == "gte":
        return value >= expected

    return False


def find_states(filters: Dict[str, Any] | None = None) -> List[Dict[str, Any]]:
    if filters is None:
        filters = {}

    if not isinstance(filters, dict):
        raise ValueError("Filters must be an object.")

    entries = [
        {
            "abbreviation": abbreviation,
            "name": state["n"],
            "neighbor_count": len(state["s"]),
            "country_count": len(state["c"]),
        }
        for abbreviation, state in STATES.items()
    ]

    if "neighbor_count" not in filters:
        return sorted(entries, key=lambda item: item["abbreviation"])

    return sorted(
        [
            entry
            for entry in entries
            if _matches_numeric_filter(entry["neighbor_count"], filters["neighbor_count"])
        ],
        key=lambda item: item["abbreviation"],
    )
