#!/bin/bash

# Get the current value of REACT_APP_INITIAL_COUNT from the environment
count_value=0
API_URL="https://www.nytimes.com/svc/wordle/v2/2025-05-18.json"
RESPONSE=$(curl -s "$API_URL")

if [[ -n "$RESPONSE" ]]; then
  echo "Response received successfully." "${RESPONSE:0:100}" # Print first 100 characters for brevity
  date_value=$(echo "$RESPONSE" | jq '.print_date' | tr -d '"')
  for (( i=0; i<${#date_value}; i++ )); do
    digit="${date_value:i:1}"
    if [[ "$digit" =~ [0-9] ]]; then
      count_value=$((count_value + digit))
    fi
  done
else
  echo "Failed to fetch data from the API."
fi
echo "Count value calculated: $count_value"

# Set the new environment variable for subsequent steps
echo "REACT_APP_INITIAL_COUNT=$count_value" >> "$GITHUB_ENV"

echo "Updated REACT_APP_INITIAL_COUNT: $count_value"
