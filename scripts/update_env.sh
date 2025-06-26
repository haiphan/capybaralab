#!/bin/bash

SCRIPT_DIR="$(dirname "$0")"
elec_data=$(./$SCRIPT_DIR/getElec.py)
temp_data=$(./$SCRIPT_DIR/getTemp.py)
today=$(date +%Y-%m-%d)
count_value=0
API_URL="https://www.nytimes.com/svc/wordle/v2/$today.json"
RESPONSE=$(curl -s "$API_URL")
date_value=""
wordle=""
# bash function. given a string, return the sum of all digits in it
sum_digits() {
  local str="$1"
  local sum=0
  for (( i=0; i<${#str}; i++ )); do
    digit="${str:i:1}"
    if [[ "$digit" =~ [0-9] ]]; then
      sum=$((sum + digit))
    fi
  done
  echo "$sum"
}

get_wordle() {
    local str="$1"
    date_value=$(echo "$str" | jq '.print_date' | tr -d '"')
    solution=$(echo "$str" | jq '.solution' | tr -d '"')
    echo "$date_value,$solution"
}

if [[ -n "$RESPONSE" ]]; then
  echo "Response received successfully." "${RESPONSE:0:100}" # Print first 100 characters for brevity
  date_value=$(echo "$RESPONSE" | jq '.print_date' | tr -d '"')
  count_value=$(sum_digits "$date_value")
  wordle=$(get_wordle "$RESPONSE")
else
  echo "Failed to fetch data from the API."
fi
echo "Count value calculated: $count_value"

# Set the new environment variable for subsequent steps
echo "REACT_APP_INITIAL_COUNT=$count_value" >> "$GITHUB_ENV"
echo "REACT_APP_WORDLE=$wordle" >> "$GITHUB_ENV"
echo "REACT_APP_ELEC=$elec_data" >> "$GITHUB_ENV"
echo "REACT_APP_TEMP=$temp_data" >> "$GITHUB_ENV"

echo "Updated REACT_APP_INITIAL_COUNT: $count_value"
echo "Updated REACT_APP_WORDLE: $wordle"
echo "Updated REACT_APP_ELEC: $elec_data"
echo "Updated REACT_APP_TEMP: $temp_data"