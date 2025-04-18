let cart = {};

window.onload = function () {
  const phone = '9123456789'; // change to actual dynamic phone if needed
  fetch(`http://localhost:5000/api/cart/${phone}`)
    .then(res => res.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        rebuildCartUI(data.items);
      }
    })
    .catch(err => {
      console.error("❌ Error loading cart:", err);
      alert("❌ Failed to load cart");
    });
};

function rebuildCartUI(items) {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  let total = 0;

  items.forEach(item => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
    cart[item.name] = { quantity: item.quantity, price: item.price };

    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.quantity} = ₹${subtotal} 
      <button onclick="deleteItem('${item.name}')">❌</button>`;
    cartList.appendChild(li);
  });

  document.getElementById('total-price').textContent = total;
}

function increase(btn) {
  const span = btn.parentElement.querySelector('span');
  span.textContent = parseInt(span.textContent) + 1;
}

function decrease(btn) {
  const span = btn.parentElement.querySelector('span');
  const val = parseInt(span.textContent);
  if (val > 0) span.textContent = val - 1;
}

function addToCart(button) {
  const card = button.closest('.card');
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);
  const qty = parseInt(card.querySelector('.qty-controls span').textContent);
  if (qty === 0) return alert("Please select quantity!");

  if (!cart[name]) cart[name] = { quantity: 0, price };
  cart[name].quantity += qty;

  card.querySelector('.qty-controls span').textContent = 0;
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  let total = 0;

  for (let item in cart) {
    const qty = cart[item].quantity;
    const price = cart[item].price;
    const subtotal = qty * price;
    total += subtotal;

    cartList.innerHTML += `<li>${item} x ${qty} = ₹${subtotal} 
      <button onclick="deleteItem('${item}')">❌</button></li>`;
  }

  document.getElementById('total-price').textContent = total;
}

function deleteItem(itemName) {
  if (cart[itemName]) {
    delete cart[itemName];
    updateCartUI();
  }
}

function getCartItems() {
  return Object.keys(cart).map(item => ({
    name: item,
    quantity: cart[item].quantity,
    price: cart[item].price
  }));
}

function calculateTotal() {
  return Object.values(cart).reduce((acc, item) => acc + (item.quantity * item.price), 0);
}

function saveCartToBackend() {
  const username = prompt("Enter your name:");
  const phone = prompt("Enter your phone number (will be used as unique ID):");
  if (!username || !phone) return alert("Name and phone are required!");

  const cartItems = getCartItems();
  const total = calculateTotal();

  const cartData = {
    username,
    phone,
    items: cartItems,
    totalPrice: total
  };

  console.log("🛒 Sending cart:", cartData);

  fetch('http://localhost:5000/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData)
  })
    .then(res => {
      if (!res.ok) throw new Error("Non-200 response");
      return res.json();
    })
    .then(data => {
      console.log("✅ Cart saved:", data);
      alert("✅ Cart saved successfully!");
    })
    .catch(async err => {
      console.error("❌ Save failed:", err);
      alert("❌ Save failed: " + err.message);
    });
}
