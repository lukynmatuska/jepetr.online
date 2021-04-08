/**
 * Ping controller
 * @author Lukas Matuska (lukynmatuska@gmail.com)
 * @version 1.0
 */

/**
 * Libs
 */
const ping = require('ping');

/**
 * Models
 */
const Ping = require('../models/Ping');

module.exports.singlePing = (host, config) => {
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
    this.singlePing(
        req.body.host,
        {
            timeout: 10,
            extra: ['-c', '3'],
        },
    ).then(result => {
        return res
            .status(200)
            .json({
                status: 'ok',
                result
            });
    }).catch(err => {
        console.error(err)
        return res
            .status(500)
            .json({
                status: 'error',
                error: err
            });
    });
};

module.exports.getSinglePing = (req, res) => {
    if (!req.params.host) {
        return res
            .status(422)
            .json({
                status: 'error',
                error: 'bad-host'
            });
    }
    this.singlePing(
        req.params.host,
        {
            timeout: 10,
            extra: ['-c', '3'],
        },
    ).then(result => {
        return res
            .status(200)
            .json({
                status: 'ok',
                result
            });
    }).catch(err => {
        console.error(err)
        return res
            .status(500)
            .json({
                status: 'error',
                error: err
            });
    });
};

module.exports.getAll = (req, res) => {
    Ping.find(
        {}
    ).exec((err, result) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({
                    status: 'error',
                    error: err
                });
        }
        return res
            .status(200)
            .json({
                status: 'ok',
                data: result
            });
    });
};

module.exports.getWithFilter = (req, res) => {
    if (!req.query.filter) {
        return res
            .status(422)
            .json({
                status: 'error',
                error: 'not-send-filter'
            })
    }
    Ping.find(
        req.query.filter
    ).exec((err, result) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({
                    status: 'error',
                    error: err
                });
        }
        return res
            .status(200)
            .json({
                status: 'ok',
                data: result
            });
    });
};

async function getDataForChartFromMongoResult(resultFromMongo, host) {
    const ret = {
        labels: [],
        datasets: [{
            label: host,
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };
    for (const obj of resultFromMongo) {
        ret.labels.push(obj._id)
        let sumOfFloats = 0;
        for (const str of obj.data) {
            sumOfFloats += parseFloat(str);
        }
        const avg = sumOfFloats / obj.data.length;
        ret.datasets[0].data.push(avg)
    }
    return ret
}

module.exports.getDataForChart = (req, res) => {
    const host = 'termius.eu';
    Ping
        .aggregate([{ $match: { 'result.host': host } }])
        .group({
            _id: {
                $dateToString: {
                    // format: "%Y-%m-%d %H:%M",
                    format: "%Y-%m-%d %H",
                    date: "$date",
                },
            },
            data: {
                $push: '$result.avg',
            },
            // description: {
            //     $push: '$result.output',
            // },
        })
        .exec(async (err, mongoRes) => {
            if (err) {
                console.error(err);
            }
            const data = await getDataForChartFromMongoResult(mongoRes, host);
            return res
                .status(200)
                .json({
                    status: 'ok',
                    data,
                });
        });
};