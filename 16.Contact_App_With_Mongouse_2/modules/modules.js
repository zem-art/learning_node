var express = require("express");
var expressLayouts = require("express-ejs-layouts");

var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var methodOverride = require("method-override");

const mongoose = require("mongoose");

module.exports = {
  express,
  expressLayouts,
  flash,
  cookieParser,
  session,
  mongoose,
  methodOverride,
};
