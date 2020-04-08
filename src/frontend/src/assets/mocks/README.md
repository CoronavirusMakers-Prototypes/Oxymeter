# Servicios consumidos por front: 

Ejemplo paginación
```
{"offset":50,
"limit":50,
"currentPage":2,
"totalPages":2,
"totalRecords":54,
"result":[{"id":"51","type":"0","auth_id":"f00b4rboo1984"},{"id":"52","type":"0","auth_id":"f00b4rboo1984"},{"id":"53","type":"0","auth_id":"f00b4rboo1984"},{"id":"54","type":"0","auth_id":"f00b4rboo1984"}]}
```

# Login:

```
Url: /login
Type: POST
 ```

## Request data:

```
{
    "login": "UserLogin",
    "password": "encryptedPassword md5"
}
```

## Response expected:

```
{
    "token": "mocked_token",
    "user": {
        "id": "1",
        "surname": "Marcos",
        "lastname": "González",
        "professionalId": "x34522",
        "lastLogin": 1585681143878,
        "role": "admin",
        "login": "x34522",
        "idHospital": 1 
    }
}
```

# User Registration:


```
Url: /user
Type: POST
 ```

## Request data:

```
{
    id: undefined
    surname: "Nombre"
    lastname: "Apellido"
    professionalId: "idProfesional"
    lastLogin: undefined
    role: undefined
    login: "CampoLogin"
    idHospital: 1
    password: "487f7b22f68312d2c1bbc93b1aea445b"
}
```

## Response expected:

```
{
    "token": "mocked_token",
    "user": {
        "id": "1",
        "surname": "Marcos",
        "lastname": "González",
        "professionalId": "x34522",
        "lastLogin": 1585681143878,
        "role": "admin",
        "login": "x34522",
        "idHospital": 1 
    }
}
```

# Hospitals: devuelve todos los hospitales

```
Url: /hospitals
Type: GET
 ```

## Response expected:

```
[
    {
        "id": 1,
        "desc": "Ifema"
    }
]
```

# Hospital: devuelve info de un hospital

```
Url: /hospitals/:id
Type: GET
 ```

## Response expected:

```
{
    "id": 1,
    "desc": "Ifema"
}
```

# Buildings: devuelve los buildings de un hospital

```
Url: /buildings/byIdHospital/:id_hospital
Type: GET
 ```

## Response expected:

```
[
    {
        "id": 1,
        "desc": "Pabellón 7"
    },...
]
```

# Floors: devuelve los floors de un building

```
Url: /floors/byIdBuilding/:id_building
Type: GET
 ```

## Response expected:

```
[
    {
        "id": 1,
        "desc": "Planta 1"
    }
]
```

# Areas: devuelve las areas de un floor

```
Url: /areas/byIdFloor/:id_floor
Type: GET
 ```

## Response expected:

```
[
    {
        "id": "1",
        "desc": "UE7.01"
    },...
]
```

# Rooms: devuelve las rooms de un area

```
Url: /rooms/byIdArea/:id_area
Type: GET
 ```

## Response expected:

```
[
    {
        "id": 1,
        "desc": "Hab 1"
    }, ...
]
```

# Beds: devuelve las beds de una room

```
Url: /beds/byIdRoom/:id_room
Type: GET
 ```

## Response expected:

```
[
    {
        "id": 1,
        "desc": "Cama 1"
    }, ...
]
```

# Bed: devuelve info de una cama

```
Url: /bed/:id_bed
Type: GET
 ```

## Response expected:

```
SIN DEFINIR
```

# Alarms: devuelve las alarmas para un usuario

```
Url: /alarms/byIdUser/:id_user
Type: GET
 ```

## Response expected:

```
[
    {
        "id": "1",
        "id_floor": "1",
        "id_area": "1",
        "id_room": "",
        "id_user": "1"
    },{
        "id": "1",
        "id_floor": "1",
        "id_area": "2",
        "id_room": "1",
        "id_user": "1"
    },
]

En el primer caso la alarma es a nivel de todo el area porque el id_room viene vacío.
En el segundo se trata de una alarma a nivel de habitación.
```

# NEW - Patient by bed_id: devuelve el paciente asignado a una cama

```
Url: /patient/byIdBed/:id_bed
Type: GET
 ```

## Response expected:

```
{
    "surname": "María",
    "lastname": "López",
    "hospital_reference": "Ramón y Cajal",
    "suscribed": 1586103005311,
    "unsuscribed": null,
    "id_bed": 1,
    "id_sensor": 453555,
    "spo2_max": 20,
    "spo2_min": 5,
    "pulse_max": 140,
    "pulse_min": 50,
    "temp_max": 37,
    "temp_min": 34,
    "status": 1
}
```

# NEW - Meassurements for sensor id: devuelve las últimas mediciones registradas para un sensor

```
Url: /meassurement/byIdSensor/:id_sensor?timestamp=446465461
Type: GET
 ```

## Response expected:

```
"firstTimestamp": 4564564,
"lastTimestamp": 456456456
"result": [
    {
        "id": 1,
        "time": 1586103700333,
        "spo2": 95,
        "ppm": 95,
        "batt": 90,
        "temp": 35.7,
        "sequence": 1222,
        "sensorId": 45645644
    }, ...
]
```