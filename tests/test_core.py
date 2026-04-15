# /py/tests/test_core.py

from border_kit import find_states, get_state_borders, normalize_state_input


def test_normalize_state_input_supports_names_and_abbreviations() -> None:
    assert normalize_state_input("tx") == "TX"
    assert normalize_state_input("Texas") == "TX"
    assert normalize_state_input("tExAs") == "TX"


def test_get_state_borders_returns_texas_data() -> None:
    result = get_state_borders("TX")

    assert result["state"]["abbreviation"] == "TX"
    assert result["borders"]["states"]["count"] == 4
    assert result["borders"]["countries"]["list"] == [
        {"abbreviation": "MX", "name": "Mexico"}
    ]


def test_find_states_filters_by_neighbor_count_eq_zero() -> None:
    result = find_states({"neighbor_count": {"eq": 0}})

    assert [item["abbreviation"] for item in result] == ["AK", "HI"]
