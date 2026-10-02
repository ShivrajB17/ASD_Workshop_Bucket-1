const request = require('supertest');
const app = require('./index');
const assert = require('assert');

async function runTests() {
  console.log('Running tests...');

  // Test 1: GET /products should return MISS
  let res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  assert.strictEqual(res.body.length, 2);
  console.log('Test 1 passed');

  // Test 2: GET /products should return HIT
  res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'HIT');
  assert.strictEqual(res.body.length, 2);
  console.log('Test 2 passed');

  // Test 3: POST /products should invalidate cache
  res = await request(app).post('/products').send({ name: 'Product 3', price: 300 });
  assert.strictEqual(res.statusCode, 201);
  console.log('Test 3 passed');

  // Test 4: GET /products should return MISS again because cache was invalidated
  res = await request(app).get('/products');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  assert.strictEqual(res.body.length, 3);
  console.log('Test 4 passed');

  // Test 5: GET /products/:id should MISS then HIT
  res = await request(app).get('/products/1');
  assert.strictEqual(res.headers['x-cache'], 'MISS');
  res = await request(app).get('/products/1');
  assert.strictEqual(res.headers['x-cache'], 'HIT');
  console.log('Test 5 passed');

  console.log('All tests passed successfully!');
}

runTests().catch(console.error);
