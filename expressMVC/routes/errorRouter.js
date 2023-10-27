var express = require('express');
var router = express.Router();

// const errorCatcher = require('../utils/errorCatcher');

const errorCatcher = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next)
          .catch((err) => {
            res.status(500)
              .send({
                message: 'error'
            });
        });
    }
}

const catchError = async (req, res, next) =>{
    res.status(200).send({
      message: '正常狀態'
    })
  }

router.get('/', errorCatcher(catchError));

// router.get('/', catchError);


module.exports = router;
