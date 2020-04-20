export const mockRoutes = {
    // '/users/login': '/assets/mocks/userData.json',
    // '/users/signin': '/assets/mocks/userData.json',
    '/hospitals': '/assets/mocks/hospitals.json',
    '/hospitals/1': '/assets/mocks/hospitalIfema.json', // :id_hospital
    '/buildings/byIdHospital/1': '/assets/mocks/buildingsIfema.json', // :id_hospital
    '/floors/byIdBuilding/1': '/assets/mocks/floorsIfema.json', // :id_building
    '/areas/byIdFloor/1': '/assets/mocks/areasIfema.json', // :id_floor
    '/areas/byIdFloor/2': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/4': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/5': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/6': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/7': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/8': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/9': '/assets/mocks/areasIfema.json',
    '/areas/byIdFloor/10': '/assets/mocks/areasIfema.json',
    '/rooms/byIdArea/1': '/assets/mocks/roomsIfema.json',  // :id_area
    '/rooms/byIdArea/2': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/3': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/4': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/5': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/6': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/7': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/8': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/9': '/assets/mocks/roomsIfema.json',
    '/rooms/byIdArea/10': '/assets/mocks/roomsIfema.json',
    '/beds/byIdRoom/1': '/assets/mocks/bedsIfema.json', // :id_room
    '/beds/byIdRoom/2': '/assets/mocks/bedsIfema.json',
    '/beds/byIdRoom/3': '/assets/mocks/bedsIfema.json',
    '/alarms/suscriptions/byIdUser/20': '/assets/mocks/alarmsSubscriptionUser1.json', // :id_user
    '/alarms/byIdUser/20': '/assets/mocks/alarmsUser.json', // :id_user
    '/patient/byIdBed/20': '/assets/mocks/patientData.json', // :id_user
    '/meassurement/byIdSensor/453555': '/assets/mocks/meassurementsData.json', // :id_sensor
}