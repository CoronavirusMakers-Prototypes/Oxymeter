#!/bin/bash

PATH=$PATH:/usr/bin

i=0

while true;  
# Random value: $(shuf -i <lower>-<upper> -n 1)
SENSOR_ID=1
SPO2=$(shuf -i 70-99 -n 1)
PPM=$(shuf -i 60-100 -n 1)
BATT=$(shuf -i 0-100 -n 1)
AUTH_ID=1
i=$((i+1))
echo $SPO2

DATA='{"spo2": '$SPO2', "ppm": '$PPM', "sequence": '$i', "batt":'$BATT', "auth_id": '$AUTH_ID', "id": '$SENSOR_ID'}'

echo $DATA

curl \
  --header "Content-type: application/json" \
  --request PUT \
  --data "$DATA" \
  http://54.171.248.105:9001/meassurement

sleep 3s


done
