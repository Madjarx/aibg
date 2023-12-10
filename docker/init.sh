#!/bin/bash

# Colors
Color_Off='\033[0m' # Text Reset
Green='\033[0;32m'  # Green

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

if [ -f "$DIR/.env" ]; then
    # Export the variables from .env file
    export $(grep -v '^#' "$DIR/.env" | xargs)
else
    echo -e "${Green}Error: .env file not found.${Color_Off}"
    exit 1
fi

if [ -z "$API_ENDPOINT" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
    echo -e "${Green}Error: API_ENDPOINT, USERNAME, and PASSWORD must be set in the .env file.${Color_Off}"
    exit 1
fi

for i in {1..4}
do
    # Prepare the payload
    PAYLOAD="{\"username\":\"${USERNAME}${i}\",\"password\":\"$PASSWORD\"}"

    # Make the POST request using curl
    RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$API_ENDPOINT")

    # Print the response
    echo -e "${Green}$RESPONSE${Color_Off}"
done