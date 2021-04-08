/**
 * Ping database model
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 */

/**
 * Libs
 */
// library for easy database manipulations
const mongoose = require('../libs/db');

// the schema itself
var PingSchema = new mongoose.Schema({
  date: Date,
  result: {
    inputHost: String,
    host: String,
    alive: Boolean,
    output: String,
    time: String,
    times: [Number],
    min: String,
    max: String,
    avg: String,
    stddev: String,
    packetLoss: String,
    numeric_host: String,
  },
});

// export
module.exports = mongoose.model('Ping', PingSchema, 'Ping');
