# Open IoT Oxymeter

## Install & run

- Start postgres e.g with docker:

 `docker-compose up -d`

- Install dependencies:

`yarn` or `npm install`


Run it with:

`node src/index`


### Develope mode

`yarn dev` or `npm run dev`


## REST API calls

There is an Insomnia export at http_api_call folder.

### meassurement

```bash
curl --request POST \
  --url http://localhost:9001/meassurement/1 \
  --header 'content-type: application/json' \
  --data '{"spo2": 322, "ppm": 226, "sequence": "1984", "batt":"23", "auth_id": "f00b4r" }'
  ```

To add a meassurement you'll need first to create a Sensor

### Sensor

Create sensor

```bash
curl --request POST \
  --url http://localhost:9001/sensors \
  --header 'content-type: application/json' \
  --data '{"type":1,"auth_id":"f00b4r"}'
```

Update sensor

```bash
curl --request PUT \
  --url http://localhost:9001/sensors/1 \
  --header 'content-type: application/json' \
  --data '{"type":0,"auth_id":"f00boo"}'
```

Get list of sensors

```bash
curl --request GET \
  --url 'http://localhost:9001/sensors?offset=50'
```

Get sensor by Id

```
curl --request GET \
  --url http://localhost:9001/sensors/2
```

Delete sensor

```bash
curl --request DELETE \
  --url http://localhost:9001/sensors/6 \
  --header 'content-type: application/json'
```
