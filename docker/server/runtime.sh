#!/bin/bash

echo "████ ${APP_NAME^^} - FEATHERS CONTAINER STARTING... ████████████████████████████████████"
figlet $APP_NAME

# Display Docker Image / CI / Release details
echo "Image Build Date/Time: " "$(cat /app_code/build_timestamp.txt)" "UTC"

echo "-----------------------------------------------------------"
echo "NODE_ENV:"
figlet $NODE_ENV
echo "===================================="

# ====================================================================================
# Debug / Sanity check info
# ====================================================================================
echo "  "
echo "======= Current Dir / Files (Debug) ============================================================================="
pwd
ls -al

echo "  "
echo "======= Env Vars (Debug) ========================================================================================"
if [ "${NODE_ENV^^}" != "PRODUCTION" ]; then
  # Only print environment vars in non-prod environments to prevent sensitive variables being sent to logging system
  printenv
fi

echo "  "
echo "======= Linux version (Debug) ==================================================================================="
cat /etc/os-release

echo "  "
echo "======= Node Path & Version (Debug) ==========================================================================="
node -v

# Check for required env vars, exit as failure if missing these critical env vars.
if [[ -z "${NODE_ENV}" ]]; then
    echo "█████████████████████████████████████████████████████████████████████████████████████████████████████████████"
    echo "█ CRITICAL ERROR: Missing 'NODE_ENV' and/or 'APP_DEPLOY_TYPE', environment variables."
    echo "█████████████████████████████████████████████████████████████████████████████████████████████████████████████"
    echo "NODE_ENV=" $NODE_ENV
    echo "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
    exit
fi

# ====================================================================================
# Install extra dependencies if ENV is LOCAL
# ====================================================================================
if [ "${NODE_ENV^^}" = "DEVELOPMENT" ]; then

    # Install some extras
    echo "  "
    echo "======= Installing extra libraries just for DEVELOPMENT env ======================================================="
    yarn install --production=false
fi

# CI TEST DOWN THE TRACK

# ====================================================================================
# Run inbuilt FEATHERS server if ENV is LOCAL
# ====================================================================================
if [ "${NODE_ENV^^}" = "DEVELOPMENT" ]; then

    # Run developments
    echo "  "
    echo "======= Starting inbuilt fEATHERS webserver ==================================================================="
    yarn dev
    exit
fi

yarn start

