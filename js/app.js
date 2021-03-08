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
    let pizzaPrice = [];
    pizzaPrice.push(this.price);
    pizzaPrice.reduce((a, b) => a + b, 0);
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
  if (pizza.size == "0" || pizza.crust == "0" || pizza.quantity == "0") {
    alert("please select size, crust and quantity");
  } else {
    const tr = document.createElement("tr");

    tr.classList.add(".order-item");
    tr.innerHTML = `
      <th scope="row">${pizza.name}</th>
      <td>${pizza.size}</td>
      <td>${pizza.crust}</td>
      <td>${pizza.quantity}</td>
      <td>${pizza.price()}</td>
    `;
    orderContent.appendChild(tr);
    orderTotal.innerHTML = `${totalPrice}`;
    pizzaForm.reset();
    orderDetails.classList.add("visible");
  }
});
deliveryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let addressDetails = document.getElementById("address-details");
  let addInput = document.getElementById("address-input").value;
  addressDetails.innerHTML = addInput;
});
document.getElementById("checkout").addEventListener("click", function (e) {
  alert("you will recieve your order in 20mins");
  location.reload();
});
