const path = require("path");
const errorHandler = require(path.resolve("src/errors/errorHandler"));
const notFound = require(path.resolve("src/errors/notFound"));
const isProvided = require(path.resolve("src/utils/helpers"));

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
const orderExists = (req, res, next) => {
  const { orderId } = req.params;
  const foundOrder = orders.find(order => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  } else {
    return notFound();
  }
}

const list = (req, res) => {
  res.json({ data: orders });
}

const read = (req, res) => {
  res.json({ data: res.locals.order });
}

module.exports = {
  list,
  read: [orderExists, read],
}
