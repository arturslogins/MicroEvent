#!/bin/bash
set -e

# Initialize underlying infrastructure
cd Infrastructure && vagrant up && cd ..
cd APIGateway && npm install && npm test && cd ..
cd StuffMS && npm install && npm test && cd ..
cd TheDashboard && npm install && npm test && cd ..

trap 'kill %1; kill %2' SIGINT

swagger project start APIGateway/ | tee logs/APIGateway.log | sed -e 's/^/[APIGateway] /' &
NODE_CONFIG_DIR=StuffMS/src/config bash -c "node StuffMS/src/app.js | tee logs/StuffMS.log | sed -e 's/^/[StuffMS] /'" &
cd TheDashboard && npm run dev