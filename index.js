var express = require('express');
var compress = require('compression');
var logger = require('morgan');
var path = require('path');
var settings = {
  root: path.resolve(process.cwd(), 'public'),
  port: 61427,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
}

express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port);
