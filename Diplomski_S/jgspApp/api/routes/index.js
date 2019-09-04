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
var ctrlAutoriz = require('../controllers/authorizationCont');
var ctrlTicket = require('../controllers/ticketCont');

router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/resendReqest',ctrlProfile.resendRequst);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/edit',ctrlAuth.edit);
router.post('/editPassword', ctrlAuth.editPassword);

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

router.get('/getAwaitingAdmins', ctrlAutoriz.getAwaitingAdmins);
router.get('/getAwaitingControllers', ctrlAutoriz.getAwaitingControllers);
router.get('/getAwaitingClients', ctrlAutoriz.getAwaitingClients);
router.post('/authorizeAdmin', ctrlAutoriz.authorizeAdmin);
router.post('/declineAdmin', ctrlAutoriz.declineAdmin);
router.post('/authorizeController', ctrlAutoriz.authorizeController);
router.post('/declineController', ctrlAutoriz.declineController);
router.post('/authorizeUser', ctrlAutoriz.authorizeUser);
router.post('/declineUser', ctrlAutoriz.declineUser);

router.get('/getAllTicketTypes',ctrlTicket.getAllTicketTypes);
router.get('/getTypeUser/:email', ctrlTicket.getTypeUser);
router.post('/checkValidity',ctrlTicket.checkValidity);
router.post('/addPayPal',ctrlTicket.addPayPal);
router.get('/getTicketsForOneUser/:email', ctrlTicket.getAllTicketsForOneUser);
router.get('/getTicketPrice',ctrlTicket.getTicketPrice);
router.get('/getTicket/:id',ctrlTicket.getTicket);
router.post('/validateTicketNoUser',ctrlTicket.validateTicketNoUser);
router.post('/validateTicket/:email',ctrlTicket.validateTicket);

module.exports = router;