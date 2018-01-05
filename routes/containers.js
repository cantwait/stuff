var express = require('express');
var router = express.Router();
const Container = require('../model/container');

router.get('/', function(req, res, next) {
    Container.find({},(err,obj)=>{
        if(err) res.status(500).send(err);
        res.json(obj);
    })
});

router.post('/', (req,res,next)=>{
    console.log('saving container...');
    let container = new Container({name: req.body.name});
    container.save((err,obj)=>{
        if(err) res.status(500).send(err);
        res.json(obj);
    });
});

router.delete('/:id', (req,res,next)=>{
    Container.findByIdAndRemove(req.params.id, (err,obj)=>{
        if(err) res.status(500).send(err);
        res.status(201).send();
    })
});

router.put('/:id', (req,res,next)=>{
    Container.findById(req.params.id, (err,obj)=>{
        if(err) res.status(500).send(err);
        obj.name = req.body.name || obj.name;
        obj.save((err,saved)=>{
            if(err) res.status(500).send(err);
            res.status(201).send();
        })

    })
});

module.exports = router;
