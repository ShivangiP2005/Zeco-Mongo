const BASE_URL = 'https://zeco-backend.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const api = {
  // Auth
  register: (data) => fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  login: (data) => fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  // Products
  getProducts: (params = '') => fetch(`${BASE_URL}/products${params}`).then(r => r.json()),
  getCategories: () => fetch(`${BASE_URL}/products/categories`).then(r => r.json()),
checkPincode: (pincode) => fetch(`${BASE_URL}/products/check-pincode/${pincode}`).then(r => r.json()),

  // Cart
  getCart: () => fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  addToCart: (data) => fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  updateCart: (productId, quantity) => fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ quantity })
  }).then(r => r.json()),

  removeFromCart: (productId) => fetch(`${BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  clearCart: () => fetch(`${BASE_URL}/cart`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  // Orders
  placeOrder: (data) => fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  getOrders: () => fetch(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  cancelOrder: (id) => fetch(`${BASE_URL}/orders/${id}/cancel`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),
  // Admin
  getStats: () => fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAdminOrders: () => fetch(`${BASE_URL}/admin/orders`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAnalytics: () => fetch(`${BASE_URL}/admin/analytics`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  updateOrderStatus: (id, status) => fetch(`${BASE_URL}/admin/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ status })
  }).then(r => r.json()),

  getAdminUsers: () => fetch(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  getAddresses: () => fetch(`${BASE_URL}/address`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),

  addAddress: (data) => fetch(`${BASE_URL}/address`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  deleteAddress: (id) => fetch(`${BASE_URL}/address/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(r => r.json()),
};