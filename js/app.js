let type, size, topping, quantity, crust;
function Pizza(type, size, quantity, crust) {
  this.size = size;
  this.quantity = quantity;
  this.type = type;
  this.crust = crust;
  this.topping = [];
}
function Order(size, quantity, topping) {}
