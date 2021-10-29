var express = require("express");
var expressLayouts = require("express-ejs-layouts");

var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session = require("express-session");

const mongoose = require("mongoose");

module.exports = {
  express,
  expressLayouts,
  flash,
  cookieParser,
  session,
  mongoose,
};
