var express = require('express');
var router = express.Router();
var Question = require('../models/question');

router.get('/', (req, res) => {
    Question.find()
       .exec((err, list_questions) => {
          if (err) {
            rest.status(400).json({error: 'Error in the search', err});
          }
          res.status(200).json(list_questions);
       })
});

router.post('/id', (req, res) => {
    console.log(req.body);
    let question = Question.findById(req.body._id)
       .exec((err, question) => {
          if (err) {
            rest.status(400).json({error: 'Error in the search', err});
          }
          console.log(question);
          res.status(200).json(question);
       })
});

router.put('/id', async (req, res) => {
  console.log('entrou no put');
  console.log(req.body);
  console.log(req.body.type);
  console.log(req.body.description);

  try {
    if (!req.body._id) {
      question = new Question({type: req.body.type, description: req.body.description});
      question.save(function (err) {
        if (err) return handleError(err);
        res.json(question);
      });
    } else {
      let question = await Question.findByIdAndUpdate(req.body._id,
                                 {type: req.body.type, description: req.body.description},
                                 {new: true, upsert: true});
      return res.json(question);
    }

  } catch (err) {
        console.log(err);
  }
  });

  router.delete('/id', (req, res) => {
      console.log(req.body);
      let question = Question.findByIdAndDelete(req.body._id)
         .exec((err, question) => {
            if (err) {
              rest.status(400).json({error: 'Error in the search', err});
            }
            console.log(question);
            res.status(200).json(question);
         })
  });

module.exports = router;
