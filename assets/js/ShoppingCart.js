const products = [
  { id: 1, name: 'Tabla Street Flame 8.0"', price: 899 },
  { id: 2, name: "Lija Pro Grip Orange", price: 250 },
  { id: 3, name: "Ruedas Uretano 52mm", price: 450 },
];

let cart = JSON.parse(localStorage.getItem("skatebrosCart")) || [];

function saveCart() {
  localStorage.setItem("skatebrosCart", JSON.stringify(cart));
}

function renderHomeCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total-price");
  const cartCount = document.getElementById("cart-count");
  if (!cartItems) return;

  let total = 0;
  let itemCount = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
    cartTotal.textContent = "$0 MXN";
    cartCount.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;
    cartItems.innerHTML += `<div class="cart-item">
      <div><strong>${item.name}</strong><p>$${item.price} MXN x ${item.quantity}</p></div>
      <button class="remove-button" onclick="removeFromCart(${item.id})">Eliminar</button>
    </div>`;
  });

  cartTotal.textContent = `$${total} MXN`;
  cartCount.textContent = itemCount;
}

function renderFullCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML =
      '<p class="empty-cart">Tu carrito está vacío.</p>';
    totalElement.textContent = "$0 MXN";
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsContainer.innerHTML += `<div class="cart-row">
      <div><h3>${item.name}</h3><p>$${item.price} MXN c/u</p></div>
      <div><button class="quantity-button" onclick="changeQuantity(${item.id}, -1)">−</button>
      <span class="quantity">${item.quantity}</span>
      <button class="quantity-button" onclick="changeQuantity(${item.id}, 1)">+</button></div>
      <strong class="price">$${itemTotal} MXN</strong>
      <button class="remove-button" onclick="removeItem(${item.id})">Eliminar</button>
    </div>`;
  });
  totalElement.textContent = `$${total} MXN`;
}

function addToCart(button) {
  const id = Number(button.dataset.id);
  const item = cart.find((product) => product.id === id);
  if (item) item.quantity++;
  else
    cart.push({
      id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1,
    });
  saveCart();
  renderHomeCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderHomeCart();
}

function changeQuantity(id, amount) {
  const item = cart.find((product) => product.id === id);
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter((product) => product.id !== id);
  saveCart();
  renderFullCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderFullCart();
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("active");
  renderHomeCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("active");
}

const cartButton = document.getElementById("cart-icon-btn");
if (cartButton) {
  cartButton.addEventListener("click", openCart);
  document
    .getElementById("close-cart-btn")
    .addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => addToCart(button));
  });
  renderHomeCart();
} else {
  renderFullCart();
}
