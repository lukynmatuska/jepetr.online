/**
 * Ping controller
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 */

/**
 * Libs
 */
const ping = require('ping');

async function singlePing(host, config) {
    return ping.promise.probe(host, config);
}

module.exports.postSinglePing = (req, res) => {
    if (!req.body.host) {
        return res
            .status(422)
            .json({
                status: 'error',
                error: 'bad-host'
            });
    }
    singlePing(req.body.host, req.body.config).then(result => {
        return res
            .status(200)
            .json({
                status: 'ok',
                result
            });
    });
};

module.exports.getSinglePing = async (req, res) => {
    if (!req.params.host) {
        return res
            .status(422)
            .json({
                status: 'error',
                error: 'bad-host'
            });
    }
    singlePing(req.params.host).then((result) => {
        return res
            .status(200)
            .json({
                status: 'ok',
                result
            });
    });
};