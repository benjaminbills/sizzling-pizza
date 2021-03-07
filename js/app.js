const orderBtn = document.querySelector(".order-btn");
const clearOrderBtn = document.querySelector(".clear-order");
const orderDOM = document.querySelector(".order-details");
const orderContent = document.querySelector(".order-content");
const orderItems = document.querySelector(".order-items");
const orderTotal = document.querySelector(".order-total");
const productsDOM = document.querySelector(".products-center");

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
}
