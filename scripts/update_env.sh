#!/bin/bash

# Get the current value of REACT_APP_INITIAL_COUNT from the environment
current_count="${REACT_APP_INITIAL_COUNT}"

# Toggle the count: 0 to 1, 1 to 0
new_count=$((1 - current_count))

# Set the new environment variable for subsequent steps
echo "REACT_APP_INITIAL_COUNT=$new_count" >> "$GITHUB_ENV"

echo "Toggled REACT_APP_INITIAL_COUNT from $current_count to $new_count"
