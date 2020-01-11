var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');

router.get('/', (req, res) => {
    Tag.find()
       .exec((err, list_tags) => {
          if (err) {
            rest.status(400).json({error: 'Error in the search', err});
          }
          res.status(200).json(list_tags);
       })
});

router.post('/id', (req, res) => {
    console.log(req.body);
    let tag = Tag.findById(req.body._id)
       .exec((err, tag) => {
          if (err) {
            rest.status(400).json({error: 'Error in the search', err});
          }
          console.log(tag);
          res.status(200).json(tag);
       })
});

router.put('/id', async (req, res) => {
  console.log('entrou no put');
  console.log(req.body);
  console.log(req.body.type);
  console.log(req.body.description);

  try {
    if (!req.body._id) {
      tag = new Tag({type: req.body.type, description: req.body.description});
      tag.save(function (err) {
        if (err) return handleError(err);
        res.json(tag);
      });
    } else {
      let tag = await Tag.findByIdAndUpdate(req.body._id,
                                 {type: req.body.type, description: req.body.description},
                                 {new: true, upsert: true});
      return res.json(tag);
    }

  } catch (err) {
        console.log(err);
  }
  });

  router.delete('/id', (req, res) => {
      console.log(req.body);
      let tag = Tag.findByIdAndDelete(req.body._id)
         .exec((err, tag) => {
            if (err) {
              rest.status(400).json({error: 'Error in the search', err});
            }
            console.log(tag);
            res.status(200).json(tag);
         })
  });

module.exports = router;
