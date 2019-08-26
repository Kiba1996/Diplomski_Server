var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlStation = require('../controllers/stationCont');
var ctrlDayType = require('../controllers/dayTypeCont');
var ctrlLine = require('../controllers/lineCont');
var ctrlVehicle = require('../controllers/vehicleCont');
var ctlPricelist = require('../controllers/pricelistCont');
var ctrTimetable = require('../controllers/timetableCont');
router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/edit',ctrlAuth.edit);
router.post('/editPassword', ctrlAuth.editPassword);
//router.post('',ctrlDayTypeConf.saveDayType);
router.post('/addStation', ctrlStation.addStation);
router.get('/getAllStations', ctrlStation.getAllStations);
router.post('/changeStation', ctrlStation.changeStation);
router.delete('/removeStation/:_id',ctrlStation.removeStation);

var ctrlPassengerType = require('../controllers/passengerTypeCont');
router.get('/getPassengerTypes',  ctrlPassengerType.findAllPassengerType);

router.post('/addLine', ctrlLine.addLine);
router.get('/getAllLines',  ctrlLine.getAllLines);
router.post('/changeLine/:_id',  ctrlLine.changeLine);
router.delete('/removeLine/:_id', ctrlLine.removeLine);

router.post('/addVehicle', ctrlVehicle.addVehicle);
router.get('/getAllVehicles', ctrlVehicle.getAllVehicles);
router.get('/getAllAvailableVehicles', ctrlVehicle.getAllAvailableVehicles);
router.delete('/removeVehicle/:_id', ctrlVehicle.removeVehicle);

router.post('/addPricelist',ctlPricelist.addPricelist);
router.get('/getPricelist', ctlPricelist.getPricelist);
router.get('/getTicketPrices', ctlPricelist.getTicketPrices);

router.post('/addTimetable', ctrTimetable.addTimetable);
router.get('/getAllTimetables', ctrTimetable.getAllTimetables);
router.post('/changeTimetable', ctrTimetable.changeTimetable);
router.delete('/removeTimetable/:_id', ctrTimetable.removeTimetable);
router.get('/findVehicleId', ctrTimetable.findVehicleId);
router.get('/getAllDayTypes', ctrlDayType.getAllDayTypes);
module.exports = router;