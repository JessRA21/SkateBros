(function () {
  "use strict";
  const key = "skatebrosCart";
  let cart = JSON.parse(localStorage.getItem(key) || "[]");
  const money = (n) => `$${n.toLocaleString("es-MX")} MXN`;
  const save = () => { localStorage.setItem(key, JSON.stringify(cart)); updateCount(); };
  const updateCount = () => document.querySelectorAll("#cart-count").forEach((e) => e.textContent = cart.reduce((s, i) => s + i.quantity, 0));
  function renderDrawer() {
    const box = document.getElementById("cart-items"), total = document.getElementById("cart-total-price");
    if (!box || !total) return;
    box.innerHTML = cart.length ? cart.map((i) => `<div class="cart-item"><div><strong>${i.name}</strong><p>${money(i.price)} × ${i.quantity}</p></div><button class="remove-button" type="button" data-remove="${i.id}">Eliminar</button></div>`).join("") : '<p class="empty-msg">Tu carrito está vacío.</p>';
    total.textContent = money(cart.reduce((s, i) => s + i.price * i.quantity, 0));
  }
  function renderFull() {
    const box = document.getElementById("cart-items"), total = document.getElementById("cart-total");
    if (!box || !total) return;
    box.innerHTML = cart.length ? cart.map((i) => `<div class="cart-row"><div><h3>${i.name}</h3><p>${money(i.price)} c/u</p></div><div><button class="quantity-button" type="button" data-change="${i.id}" data-amount="-1">−</button><span class="quantity">${i.quantity}</span><button class="quantity-button" type="button" data-change="${i.id}" data-amount="1">+</button></div><strong class="price">${money(i.price * i.quantity)}</strong><button class="remove-button" type="button" data-remove="${i.id}">Eliminar</button></div>`).join("") : '<p class="empty-cart">Tu carrito está vacío.</p>';
    total.textContent = money(cart.reduce((s, i) => s + i.price * i.quantity, 0));
  }
  const open = () => { document.getElementById("cart-drawer")?.classList.add("open"); document.getElementById("cart-overlay")?.classList.add("active"); renderDrawer(); };
  const close = () => { document.getElementById("cart-drawer")?.classList.remove("open"); document.getElementById("cart-overlay")?.classList.remove("active"); };
  document.addEventListener("click", (e) => {
    const add = e.target.closest(".add-to-cart-btn");
    if (add?.dataset.id) { const id = Number(add.dataset.id), old = cart.find((i) => i.id === id); old ? old.quantity++ : cart.push({ id, name: add.dataset.name, price: Number(add.dataset.price), quantity: 1 }); save(); renderDrawer(); open(); return; }
    const remove = e.target.closest("[data-remove]");
    if (remove) { cart = cart.filter((i) => i.id !== Number(remove.dataset.remove)); save(); renderDrawer(); renderFull(); return; }
    const change = e.target.closest("[data-change]");
    if (change) { const item = cart.find((i) => i.id === Number(change.dataset.change)); if (item) item.quantity += Number(change.dataset.amount); cart = cart.filter((i) => i.quantity > 0); save(); renderDrawer(); renderFull(); }
  });
  document.getElementById("cart-icon-btn")?.addEventListener("click", open);
  document.getElementById("close-cart-btn")?.addEventListener("click", close);
  document.getElementById("cart-overlay")?.addEventListener("click", close);
  document.getElementById("checkout-button")?.addEventListener("click", () => cart.length && alert("¡Gracias por tu compra! Pronto nos pondremos en contacto contigo."));
  updateCount(); renderDrawer(); renderFull();
})();
