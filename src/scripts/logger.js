// Description:
//	Provides additional details when logging with `robot.logger`
//
// Configuration:
//
// Commands:
//   NONE
// Author:
//	chambrid
//	nsandona
//
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
'use strict';

const _ = require('lodash');

module.exports = robot => {

	function getAdapter() {
		let adapter = _.isNil(robot.adapterName) ? 'unknown' : robot.adapterName;
		return adapter;
	};

	function getRobotName() {
		let robotName = (_.isUndefined(robot.name) || _.isNull(robot.name)) ? 'unknown' : robot.name;
		return robotName;
	};

	function getRoomName() {
		let roomName = 'unknown';
		if (robot && robot.response && robot.response.message && robot.response.message.room) {
			roomName = robot.response.message.room;
		}
		return roomName;
	};

	function getUserContext() {
		let userContext = {};
		if (robot && robot.response && robot.response.message && robot.response.message.user) {
			userContext.id = robot.response.message.user.id;
			userContext.name = robot.response.message.user.name;
			userContext.real_name = robot.response.message.user.real_name;
			userContext.email_address = robot.response.message.user.email_address;
		}
		return JSON.stringify(userContext);
	};

	function constructLogMessage(message, subject, value) {
		if (message.length > 0) {
			message += ', ';
		}
		message += subject + ': ' + value;
		return message;
	};

	function formatter(message) {
		let logMessage = message;
		let adapter = getAdapter();
		let robotName = getRobotName();
		let roomName = getRoomName();
		let userContext = getUserContext();

		logMessage = constructLogMessage(logMessage, 'Adapter', adapter);
		logMessage = constructLogMessage(logMessage, 'Robot', robotName);
		logMessage = constructLogMessage(logMessage, 'Room', roomName);
		logMessage = constructLogMessage(logMessage, 'User', userContext);

		return logMessage;
	};

	const proto = Object.getPrototypeOf(robot.logger);

	// Copy over all of the logging levels
	['alert', 'critical', 'debug', 'emergency', 'error', 'info', 'notice', 'warning'].reduce(function(logger, type) {
		logger[type] = function() {
			const args = Array.prototype.slice.call(arguments);
			args[0] = formatter(arguments[0] || '');
			proto[type].apply(robot.logger, args);
		};
		return logger;
	}, robot.logger);

	robot.receiveMiddleware(function(context, next, done) {
		robot.response = context.response;
		return next(done);
	});

};
