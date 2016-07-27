/*
  * Licensed Materials - Property of IBM
  * (C) Copyright IBM Corp. 2016. All Rights Reserved.
  * US Government Users Restricted Rights - Use, duplication or
  * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
  */
'use strict';

var path = require('path');
var TAG = path.basename(__filename);

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const Helper = require('hubot-test-helper');
const helper = new Helper('../src/scripts');

describe('Test logger', function() {

	let room;
	let proto;

	beforeEach(function() {
		room = helper.createRoom({name: 'slack'});
		proto = Object.getPrototypeOf(room.robot.logger);
		// Overwrite the prototype's core logging functions with the spies
		['alert', 'critical', 'debug', 'emergency', 'error', 'info', 'notice', 'warning'].reduce((logger, type) => {
			logger[type] = sinon.spy();
			return logger;
		}, proto);
	});

	afterEach(function() {
		room.destroy();
	});

	context('Logger output', function() {
		it('should handle logging with no message', function() {
			room.robot.logger.info();
			expect(proto.info).to.have.been.calledOnce;
			expect(proto.info).to.have.been.calledWith('Adapter: unknown, Robot: hubot, Room: unknown, User: {}');
		});

		it('should log at info level', function() {
			const message = '%s: An info test';
			room.robot.logger.info(message, TAG);
			expect(proto.info).to.have.been.calledOnce;
			expect(proto.info).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: unknown, User: {}`);
		});

		it('should log at debug level', function() {
			const message = '%s: A debug test';
			room.robot.logger.debug(message, TAG);
			expect(proto.debug).to.have.been.calledOnce;
			expect(proto.debug).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: unknown, User: {}`);
		});

		it('should log at warning level', function() {
			const message = '%s: A warning test';
			room.robot.logger.warning(message, TAG);
			expect(proto.warning).to.have.been.calledOnce;
			expect(proto.warning).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: unknown, User: {}`);
		});

		it('should log at error level', function() {
			const message = '%s: An error test';
			room.robot.logger.error(message, TAG);
			expect(proto.error).to.have.been.calledOnce;
			expect(proto.error).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: unknown, User: {}`);
		});
	});

	context('Logger output in a room', function() {
		const secretRoom = 'secret-stay-out';
		beforeEach(function() {
			room.robot.response = {
				message: {
					room: secretRoom
				}
			};
		});
		it('should log at info level', function() {
			const message = '%s: An info test';
			room.robot.logger.info(message, TAG);
			expect(proto.info).to.have.been.calledOnce;
			expect(proto.info).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: ${secretRoom}, User: {}`);
		});
	});

	context('Logger output for a user', function() {
		beforeEach(function() {
			room.robot.response = {
				message: {
					user: {
						name: 'Me',
						id: 123
					}
				}
			};
		});
		it('should log at info level', function() {
			const message = '%s: An info test';
			room.robot.logger.info(message, TAG);
			expect(proto.info).to.have.been.calledOnce;
			expect(proto.info).to.have.been.calledWith(`${message}, Adapter: unknown, Robot: hubot, Room: unknown, User: {"id":123,"name":"Me"}`);
		});
	});
});
