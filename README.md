jwt-express-decode
==========

## Middleware to decode incoming request in Express

## Usage
`npm install jwt-express-decode` 

### Configuring options

**Required**

The  params object must be given as the first argument or an error will be passed along `next(error)`

1. secret = Your JWT token secret
2. header = the property on the header of the incoming  where the JWT can be found
3. req = this property name will be attached to the request and set to the decoded token

**Not Required**

1. Whitelist = array of request url's that will not need JWT protection. It's important to remember that when using Express mounting, Express will *strip away* the pre fixed mounted url before the url is inside the middleware. So
`app.use('/api', doSomething())`. 
Inside of the `doSomething()` middleware, `req.url` will not include `/api`. So if we sent a request to `/api/users/all` the url inside `doSomething` will be `/users/all`.

``` javascript
exports.doSomething = function(req, res, next){
  req.url === // '/users/all'  
}
```
This is important to remember when including a whitelist of url's. You have to make sure you don't include the mounted prefix on the url's you're wanting to whitelist. So in this case, we would not include the `/api` prefix to the url's in the array, because we will use `app.use('/api', decode(params, ['/users/new'])`

Now in your server config
``` javascript
var express   = require('express'),
      decode  = require('jwt-express-decode'),
      app     = express();

var params = {
  secret: process.env.JWT_SECRET,
  header: 'token',
  req: 'token'
};

// white list request that we don't want to lock down with JWT like new user
// signup
var whitelist = ['/user/new', 'user/verify']

app.use('/api', decode(params, whitelist));
```

