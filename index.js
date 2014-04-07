'use strict';

var jwt = require('jwt-simple');


exports.decode = function(options, safeRoutes){
  var safe, headerToken, secret;

  if(options){
    options.secret ? secret = options.secret : secret = 0;
    options.header ? headerToken = options.header : headerToken = 0;
  }

  if(safeRoutes && Array.isArray(safeRoutes)){
    safeRoutes.forEach(function (route){
      safe[route] = true;
    });
  }

  return function (req, res, next){
    if(!headerToken || !secret){
      return next(new Error('Must Provide Options'));
    }

    if(req.headers[headerToken]){
      var token = jwt.decode(req.headers.token, secret);
      req.user = {
        number: token.number,
        _id: token._id,
        verified: token.verified
      };
      next();
    } else if(!req.headers[headerToken]){
      if(safe[req.url]){
        next();
      } else{
        res.send(401);
      }
    }
  };
};