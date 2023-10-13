const productButtons = document.querySelectorAll(".add-to-cart");
const cart = document.getElementById("cart");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const inputPromoCode = document.getElementById("promo-code");
const promoDiscount = document.getElementById("discount");
const cartItems = [];

const discountedCartTotal = document.getElementById("discounted-total");

let discount = 0;

// promo
const promo = [
  {
    label: "DISC10",
    value: 0.1,
  },
  {
    label: "DISC50",
    value: 0.5,
  },
  {
    label: "DISC75",
    value: 0.75,
  },
];

// Event Listener
productButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

inputPromoCode.addEventListener("blur", checkPromo);

// Event Handler
function addToCart(event) {
  const productName = event.target.getAttribute("data-name");
  const productPrice = event.target.getAttribute("data-price");

  if (cartItems.length === 0) {
    cartItems.push({
      productName: productName,
      productPrice: productPrice,
      productCount: 1,
    });
  } else {
    for (let i = 0; i < cartItems.length + 1; i++) {
      if (i === cartItems.length) {
        cartItems.push({
          productName: productName,
          productPrice: productPrice,
          productCount: 1,
        });
        break;
      }

      if (productName === cartItems[i].productName) {
        cartItems[i].productCount++;
        break;
      }
    }
  }

  displayCart();
  displayPrice();
}

function displayCart() {
  cart.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.setAttribute("class", "product row rounded p-2");

    // Item Details
    const itemDetail = document.createElement("div");
    itemDetail.setAttribute("class", "col d-flex align-items-center");

    const itemDetailContainer = document.createElement("div");
    const productName = document.createElement("h4");
    const productPrice = document.createElement("p");

    productName.setAttribute("class", "m-0 p-0");
    productName.innerText = item.productName;
    productPrice.setAttribute("class", "m-0 p-0");
    productPrice.innerText = `Price: Rp${item.productPrice}`;

    itemDetailContainer.appendChild(productName);
    itemDetailContainer.appendChild(productPrice);

    itemDetail.appendChild(itemDetailContainer);

    // Item Count
    const itemCount = document.createElement("div");
    itemCount.setAttribute(
      "class",
      "col d-flex justify-content-center align-items-center"
    );

    const itemCountText = document.createElement("h5");
    itemCountText.innerText = `${item.productCount}x`;

    itemCount.appendChild(itemCountText);

    // Append all col into row
    cartItem.appendChild(itemDetail);
    cartItem.appendChild(itemCount);

    // Append row to cart
    cart.appendChild(cartItem);
  });
}

function displayPrice() {
  let subtotal = 0;
  let total = 0;
  
  cartItems.forEach((item) => {
    subtotal += parseInt(item.productPrice) * item.productCount;
  });

  cartSubtotal.innerText = subtotal;

  total = subtotal * (1 - discount);
  cartTotal.innerText = total;
}

function checkPromo() {
  const promoCode = inputPromoCode.value;

  promo.forEach((code) => {
    if (promoCode === code.label) {
      discount = code.value;
    }
  });

  promoDiscount.innerText = `Discount: ${discount*100}%`;

  if (cartTotal != "0") {
    let total = parseInt(cartTotal.innerText);
    total = total * (1 - discount);
    cartTotal.innerText = total;
  }
}