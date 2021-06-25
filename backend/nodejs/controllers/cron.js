/**
 * Cron controller
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 */

/**
 * Libs
 */
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const moment = require('moment');

/**
 * Models
 */
const Ping = require('../models/Ping');

/**
 * Controllers
 */
const pingController = require('./ping');
const emailController = require('./email');

/**
 * Variable
 */
let lastTimeOnline = true;

/**
 * CronJobs
 */
new CronJob(
    global.CONFIG.cron.timer,
    () => {
        pingController.singlePing(
            global.CONFIG.cron.ping.host,
            global.CONFIG.cron.ping.config
        )
            .then(result => {
                if (!result.alive && lastTimeOnline) {
                    result.html = result.output.replace(/\n/g, "<br>");
                    emailController
                        .send(
                            'pingNotAlive',
                            {
                                host: global.CONFIG.cron.ping.host,
                                ping: result,
                                user: {
                                    name: {
                                        full: 'Lukas Matuska',
                                        first: 'Lukas',
                                        last: 'Matuska',
                                    },
                                    email: 'lukynmatuska@gmail.com',
                                }
                            },
                            (emailErr, info, response) => {
                                if (emailErr) {
                                    console.error(emailErr.message)
                                }
                            })
                } else {
                    if (!lastTimeOnline) {
                        result.html = result.output.replace(/\n/g, "<br>");
                        emailController
                            .send(
                                'pingBackOnline',
                                {
                                    host: global.CONFIG.cron.ping.host,
                                    ping: result,
                                    user: {
                                        name: {
                                            full: 'Lukas Matuska',
                                            first: 'Lukas',
                                            last: 'Matuska',
                                        },
                                        email: 'lukynmatuska@gmail.com',
                                    }
                                },
                                (emailErr, info, response) => {
                                    if (emailErr) {
                                        console.error(emailErr.message)
                                    }
                                })
                    }
                }
                new Ping({
                    date: new Date(),
                    result,
                }).save((err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            })
            .catch(err => {
                return console.error(err)
            });
    },
    null,
    true,
    global.CONFIG.cron.time_zone,
).start();