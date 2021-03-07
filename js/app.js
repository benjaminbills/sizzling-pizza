const orderBtn = document.querySelector(".order-btn");
const clearOrderBtn = document.querySelector(".clear-order");
const orderDOM = document.querySelector(".order-details");
const orderContent = document.querySelector(".order-content");
const orderItems = document.querySelector(".order-items");
const orderTotal = document.querySelector(".order-total");
const productsDOM = document.querySelector(".products-center");

//order
let order = [];
//button
let buttonsDom = [];

function getSelectedSize() {
  let selectedSizeValue = document.getElementById("size").value;
  return selectedSizeValue;
}
function getSelectedCrust() {
  let selectedCrustValue = document.getElementById("crust").value;
  return selectedCrustValue;
}
function getSelectedTopping() {
  let selectedToppingValue = document.getElementById("topping").value;
  return selectedToppingValue;
}

class Products {
  async getProducts() {
    try {
      let result = await fetch("pizzaData.json");
      let products = await result.json();
      console.log(products);

      products = products.map((pizza) => {
        const price = pizza.price;
        const id = pizza.id;
        const image = pizza.image;
        const name = pizza.name;
        const ingredient = pizza.ingredient;
        return { name, price, id, image, ingredient };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <tr>
              <th scope="row">
                <img
                  src=${product.image}
                  alt=""
                  style="width: 80px; height: 80px"
                />
              </th>
              <td>${product.name}</td>
              
              <td class="ingredient">${product.ingredient}</td>
              <td>Ksh ${product.price}</td>
              <td><button  class="btn btn-primary order-btn" data-id=${product.id}>Order now</button></td>
            </tr>`;
    });
    productsDOM.innerHTML = result;
  }
  getOrderButtons() {
    let sizeArray = ["small", "medium", "large"];
    const buttons = [...document.querySelectorAll(".order-btn")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      // let inCart = cart.find((item) => item.id === id);
      // if (inCart) {
      //   button.innerText = "In Cart";
      //   button.disabled = true;
      // }
      button.addEventListener("click", (event) => {
        let orderItem = { ...Storage.getProduct(id), amount: 1 };
        console.log(orderItem);
        //add product to the cart
        order = [...order, orderItem];

        //save cart in local storage
        Storage.saveOrder(order);
        //set cart values
        this.setCartValues(order);
        //display order item
        this.addOrderItem(orderItem);
      });
    });
  }
  setCartValues(order) {
    let itemTotal = 0;
    let itemsTotal = 0;
    order.map((item) => {
      itemTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    orderTotal.innerText = parseFloat(itemTotal.toFixed(2));
    //orderItems.innerText = itemsTotal;
    console.log(itemTotal, itemsTotal);
  }
  addOrderItem(product) {
    const tr = document.createElement("tr");
    tr.classList.add(".order-item");
    tr.innerHTML = `
            <th scope="row">
              <img
                src=${product.image}
                alt=""
                style="width: 80px; height: 80px"
              />
            </th>
            <td>${product.name}
            
            </td>
            <td>
              <select id='size' onchange="getSelectedSize()" class="form-select" aria-label="Default select example">
                <option selected value="0">Size</option>
                <option value="1">Small</option>
                <option value="2">Medium</option>
                <option value="3">Large</option>
              </select>
            </td>
            <td>
              <select id="crust" onchange="getSelectedCrust()" class="form-select" aria-label="Crust Options">
                <option selected value="0">Crust</option>
                <option value="1">Thin</option>
                <option value="2">Thick</option>
              </select>
            </td>
            <td>
              <select id="topping" onchange="getSelectedTopping()" class="form-select" aria-label="Default select example">
                <option selected value="0">Toppings</option>
                <option value="1">Chicken</option>
                <option value="2">Cheddar</option>
                <option value="3">Mushroom</option>
              </select>
            </td>
            <td>
            <div>
            <i class="fas fa-chevron-up" data-id=${product.id}></i>
            <p class="item-amount">${product.amount}</p>
            <i class="fas fa-chevron-down" data-id=${product.id}></i>
            </div>
            </td>
            <td>Price: ksh ${product.price}</td>
    
    `;
    orderContent.appendChild(tr);
  }

  setupAPP() {
    order = Storage.getCart();
    this.setCartValues(order);
    this.populateCart(order);
  }
  populateCart(order) {
    order.forEach((item) => this.addOrderItem(item));
  }
  cartLogic() {
    // clear cart button
    clearOrderBtn.addEventListener("click", () => {
      this.clearCart();
    });
    // cart functionality
    orderContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        orderContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = order.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveOrder(order);
        this.setCartValues(order);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = order.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount >= 1) {
          Storage.saveOrder(order);
          this.setCartValues(order);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          orderContent.removeChild(
            lowerAmount.parentElement.parentElement.parentElement
          );
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    let orderItems = order.map((item) => item.id);
    orderItems.forEach((id) => this.removeItem(id));
    console.log(orderContent.children);
    while (orderContent.children.length > 0) {
      orderContent.removeChild(orderContent.children[0]);
    }
  }
  removeItem(id) {
    order = order.filter((order) => order.id !== id);
    this.setCartValues(order);
    Storage.saveOrder(order);
    let button = this.getSingleButton(id);
    button.disabled = false;
  }
  getSingleButton(id) {
    return buttonsDom.find((button) => button.dataset.id === id);
  }
}

//local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveOrder() {
    localStorage.setItem("order", JSON.stringify(order));
  }
  static getCart() {
    return localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : [];
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //setup app
  ui.setupAPP();
  //get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getOrderButtons();
      ui.cartLogic();
    });
});
