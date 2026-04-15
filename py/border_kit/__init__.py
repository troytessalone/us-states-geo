# /py/border_kit/__init__.py

from .core import (
    COUNTRIES,
    STATES,
    find_states,
    get_state_borders,
    normalize_state_input,
)

__all__ = [
    "STATES",
    "COUNTRIES",
    "normalize_state_input",
    "get_state_borders",
    "find_states",
]

__version__ = "1.0.0"
