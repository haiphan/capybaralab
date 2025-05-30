#!/bin/bash

# Get the current value of REACT_APP_INITIAL_COUNT from the environment
current_count=$(gh variable get INIT_CNT)
if [ $? -ne 0 ]; then
  echo "Error getting GitHub Variable INIT_CNT. Assuming initial value 0."
  current_count=0
fi

# Update the count, cycling through 0-9
new_count=$(( (1 + current_count) % 10 ))

echo "Setting GitHub Variable INIT_CNT to: $new_count"
gh variable set INIT_CNT "$new_count"

if [ $? -eq 0 ]; then
  echo "Successfully updated GitHub Variable INIT_CNT."
else
  echo "Error setting GitHub Variable INIT_CNT."
fi

# Set the new environment variable for subsequent steps
echo "REACT_APP_INITIAL_COUNT=$new_count" >> "$GITHUB_ENV"

echo "Updated REACT_APP_INITIAL_COUNT from $current_count to $new_count"
