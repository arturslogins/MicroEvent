#!/bin/bash

# Initialize underlying infrastructure
cd Infrastructure && vagrant up && cd ..
if [ $? -eq 0 ]
then
  echo "Successfully initialized underlying infrastructure"
else
  echo "Error initializing underlying infrastructure" >&2
  exit 1
fi

#Initialize API Gateway
cd APIGateway && npm install && npm test && cd ..
if [ $? -eq 0 ]
then
  echo "Successfully initialized API Gateway"
else
  echo "Error initializing API Gateway" >&2
  exit 2
fi

#Initialize StuffMS
cd StuffMS && npm install && npm test && cd ..
if [ $? -eq 0 ]
then
  echo "Successfully initialized StuffMS"
else
  echo "Error initializing StuffMS" >&2
  exit 3
fi

#Initialize frontend
cd TheDashboard && npm install && npm test && cd ..
if [ $? -eq 0 ]
then
  echo "Successfully initialized frontend"
else
  echo "Error initializing frontend" >&2
  exit 4
fi

trap 'kill %1; kill %2' SIGINT

swagger project start APIGateway/ | tee logs/APIGateway.log | sed -e 's/^/[APIGateway] /' &
NODE_CONFIG_DIR=StuffMS/src/config bash -c "node StuffMS/src/app.js | tee logs/StuffMS.log | sed -e 's/^/[StuffMS] /'" &
cd TheDashboard && npm run dev