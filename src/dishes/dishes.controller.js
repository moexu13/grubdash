const path = require("path");
const errorHandler = require(path.resolve("src/errors/errorHandler"));
const notFound = require(path.resolve("src/errors/notFound"));

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

const dishExists = (req, res, next) => {
  const { dishId } = req.params;
  const foundDish = dishes.find(dish => dish.id === Number(dishId));
  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  } else {
    return notFound();
  }
}

const nameProvided = (req, res) => {
  const { data: { name } = {} } = req.body;
  if (name && name.length > 0) {
    next();
  } else {
    errorHandler({
      status: 400,
      message: "Dish name required"
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
}
