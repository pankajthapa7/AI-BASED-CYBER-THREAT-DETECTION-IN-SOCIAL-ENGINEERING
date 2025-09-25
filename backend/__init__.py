"""
Backend package initializer.

This file makes the 'backend' directory a Python package.
You can also import common utilities here if needed.
"""

# Example: make ThreatDetector available directly from backend
from .detector import ThreatDetector

__all__ = ["ThreatDetector"]
