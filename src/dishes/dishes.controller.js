const path = require("path");
const errorHandler = require(path.resolve("src/errors/errorHandler"));
const notFound = require(path.resolve("src/errors/notFound"));
const isProvided = require(path.resolve("src/utils/helpers"));

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

const dishExists = (req, res, next) => {
  const { dishId } = req.params;
  const foundDish = dishes.find(dish => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  } else {
    return notFound();
  }
}

const nameProvided = (req, res, next) => {
  const { data: { name } = {} } = req.body;
  if (isProvided(name)) {
    next();
  } else {
    errorHandler({
      status: 400,
      message: "Dish must include a name"
    });
  }
}

const descriptionProvided = (req, res, next) => {
  const { data: { description } = {} } = req.params;
  if (isProvided(description)) {
    next();
  } else {
    errorHandler({
      status: 400,
      message: "Dish must include a description"
    });
  }
}

const priceProvided = (req, res, next) => {
  const { data: { price } = {} } = req.body;
  if (isProvided(price)) {
    next();
  } else {
    errorHandler({
      status: 400,
      message: "Dish must include a price"
    });
  }
}

const checkPrice = (req, res, next) => {
  const { data: { price } = {} } = req.body;
  if (Number.isInteger(price) && price > 0) {
    next();
  } else {
    errorHandler({
      status: 400,
      message: "Dish must have a price that is an integer greater than 0"
    });
  }
}

// TODO: Implement the /dishes handlers needed to make the tests pass
const list = (req, res) => {
  res.json({ data: dishes });
}

const read = (req, res) => {
  res.json({ data: res.locals.dish });
}

const create = (req, res) => {
  const { data: { dish } = {} } = req.body;
  console.log(dish);
  res.send(200);
}

module.exports = {
  list,
  read: [dishExists, read],
  create: [nameProvided, descriptionProvided, priceProvided, checkPrice, create],
}
