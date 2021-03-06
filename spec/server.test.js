const express = require('express');
const request = require('supertest');
const app = require('../server/app.js');


describe('should send back a 200 if static file is found', () => {
  test('It should respond with a 200', (done) => {
    request(app).get('/restaurants/Restaurant 10090976').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('should receive a 404 if route isnt correct', () => {
  test('should receive a 404 from bad url', (done) => {
    request(app).get('/gibberish').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe('GET route to /restaurants/:name/ should return 200 status', () => {
  test('should receive 200 status code', (done) => {
    request(app).get('/restaurants/Restaurant 10090976').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('GET route to /restaurants/:name', () => {
  test('should receive appropriate body from database', (done) => {
    request(app).get('/restaurants/Restaurant 10089104').then((response) => {
      expect(response.body[0].id).toBe(10089104);
      expect(response.body[0].name).toBe('Restaurant 10089104');
      done();
    });
  });
});
