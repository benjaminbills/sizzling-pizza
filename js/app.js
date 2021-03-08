const pizzaForm = document.getElementById("pizzaForm");
const orderContent = document.getElementById("order-content");
const orderTotal = document.getElementById("order-total");
const orderDetails = document.querySelector(".order-details");
const clearOrder = document.querySelector("clear-order");
const deliveryForm = document.getElementById("delivery");
const addAddress = document.getElementById("add-address");

function Pizza(name, size, crust, topping, quantity) {
  this.name = name;
  this.size = size;
  this.crust = crust;
  this.topping = topping;
  this.quantity = quantity;
  this.total = function () {
    let pizzPrice = [];
    pizzPrice.push(this.price);
    pizzPrice.reduce((a, b) => a + b, 0);
  };
  this.price = function () {
    let smallPizza = 1000;
    let mediumPizza = 1200;
    let largePizza = 1400;
    if (this.size == "Small" && this.topping != 0) {
      return smallPizza + 150;
    }
    if (this.size == "Medium" && this.topping != 0) {
      return mediumPizza + 150;
    }
    if (this.size == "Large" && this.topping != 0) {
      return largePizza + 150;
    }
    if (this.size == "Small") {
      return smallPizza;
    }
    if (this.size == "Medium") {
      return mediumPizza;
    }
    if (this.size == "Large") {
      return largePizza;
    }
  };
}

let prices = [];
pizzaForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let size = document.getElementById("pizzaSize").value;
  let crust = document.getElementById("pizzaCrust").value;
  let topping = document.getElementById("pizzaTopping").value;
  let quantity = document.getElementById("pizzaQuantity").value;
  let name = document.getElementById("pizzaName").value;

  let pizza = new Pizza(name, size, crust, topping, quantity);

  prices.push(pizza.price() * quantity);
  let totalPrice = prices.reduce((a, b) => a + b);
  console.log(totalPrice);
});
