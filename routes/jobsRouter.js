const express = require('express');
const authenticate = require('../authenticate');
const Jobs = require('../models/jobs');
const logger = require('../config/winston');

const router = express.Router();

router.use(express.json());

router.route('/')
.all((req,res,next) => {
    logger.info('Routing Jobs/');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    logger.info('Routing GET Jobs - returns Jobs collection');
    Jobs.find({})
    .then((jobs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(jobs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing POST jobs - creates a job');
    Jobs.create(req.body)
    .then((job) => {
        logger.info('job created successfully');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT job - does nothing - need to specify the job id');
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE jobs - does nothing - need to specify the job id');
    res.statusCode = 403;
    res.end('DELETE operation not supported');
});

router.route('/:jobId')
.all((req,res,next) => {
    logger.info('Routing properties/:jobId');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    logger.info('Routing GET jobs/:jobId', req.params.jobId);
    Jobs.findById(req.params.jobId)
    .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    logger.info('Routing POST properties/:jobId');
    res.statusCode = 403;
    res.end('POST operation not supported on /jobs/'+ req.params.jobId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing PUT properties/:jobId', req.params.jobId);
    Jobs.findByIdAndUpdate(req.params.jobId, {
        $set: req.body
    }, { new: true })
    .then((job) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(job);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    logger.info('Routing DELETE jobs/:jobId', req.params.jobId);
    // enhancement needed: do not DELETE physically. Create logical deletion
    Jobs.findByIdAndRemove(req.params.jobId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;