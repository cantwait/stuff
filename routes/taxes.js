var express = require('express');
var router = express.Router();
const Tax = require('../model/tax');
const Container = require('../model/container');

router.get('/', function(req, res, next) {
    Tax.find({},(err,obj)=>{
        if(err) res.status(500).send(err);
        res.json(obj);
    })
});

router.get('/:container', function(req, res, next) {
    Tax.find({'container': req.params.container},(err,obj)=>{
        if(err) res.status(500).send(err);
        res.json(obj);
    })
});

router.post('/', (req,res,next)=>{
    let tax = new Tax({name: req.body.name, photoUrl: req.body.photoUrl, total: req.body.total, tAmount: req.body.tax, owner: req.body.owner, container: req.body.container});
    tax.save((err,obj)=>{
        if(err) res.status(500).send(err);
        Container.find({"_id": req.body.container}).populate('taxes').exec();
        res.json(obj);
    });
});

router.delete('/:id', (req,res,next)=>{
    Tax.findByIdAndRemove(req.params.id, (err,obj)=>{
        if(err) res.status(500).send(err);
        res.status(201).send();
    })
});

router.put('/:id', (req,res,next)=>{
    Tax.findById(req.params.id, (err,obj)=>{
        if(err) res.status(500).send(err);
        obj.name = req.body.name || obj.name;
        obj.save((err,saved)=>{
            if(err) res.status(500).send(err);
            res.status(201).send();
        })

    })
});

module.exports = router;
