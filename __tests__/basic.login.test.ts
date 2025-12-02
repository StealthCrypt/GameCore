// Mock JWT module before importing the route
jest.mock('../app/api/auth/JWT', () => ({
  signToken: jest.fn(() => 'mock-jwt-token'),
  verifyToken: jest.fn(() => ({ userId: '1' })),
}));

import { POST } from '../app/api/auth/login/route';
import { prisma } from '../stuff/prisma';
import bcrypt from 'bcrypt';

// Mock Prisma and bcrypt
jest.mock('../stuff/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },  
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('Login API', () => {
  const mockUser = {
    id: 1,
    email: 'testuser@example.com',
    password: '$2b$10$hash123', // fake bcrypt hash
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  ////////////// Expected Pass /////////////////
  /**
   * Test: returns 400 is email of password is missing.
   * This test verifies that the login endpoint is validating the input and
   * rejecting request that do not provide email AND password.
   * 
   * In this test: The request body has empty str for email and psswd. The POST
   * should detect that the fields are missing and return 400 status.
   * We Expect: Response Status (400), Response JSON ( {error: 'Email and password
   * are required' })
   */
  test('returns 400 if email or password is missing', async () => {
    const request = { json: async () => ({ email: '', password: '' }) } as any;
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and password are required');
  });

  /**
   * Test: "returns 401 if user not found"
   * 
   * This test ensures login endpoint is correctly handling cases where the email
   * does not exist within our db. The request have a valid email and password from 
   * an appearance standpoint but it does not exist within the db. Prisma is mocked
   * to return null for findUnique, simulating the case of a non-existent user.
   * 
   * We expect the test to give a 401 response status and { error: 'Invalid email or password' }
   */
  test('returns 401 if user not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const request = { json: async () => ({ email: 'notfound@example.com', password: 'Password123!' }) } as Request;
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid email or password');
  });

  /**
   * returns 401 if the email does not exist
   * 
   * This test verifies that the login endpoint returns an error when a provided email
   * is not found within the database. Prisma is mocked to retur a user only if the email
   * matches the mock email (mockUser.email). The request uses a different email to 
   * simulate a mismatch and non existing user.
   * 
   * We expect a 401 response status and { error: 'Invalid email or password' }
   */
  // email testing (checking if email exists)
  test('returns 401 if email does not exist', async () => {
    (prisma.user.findUnique as jest.Mock).mockImplementation(({ where: { email } }) => {
      if (email === mockUser.email) return Promise.resolve(mockUser);
      return Promise.resolve(null);
    });

    // use a different email to trigger the "not found" path
    const request = { json: async () => ({ email: 'unknown@example.com', password: 'Password123!' }) } as Request;
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid email or password');
  });

  /**
   * return 401 if the passowrd is incorrect.
   * 
   * This test makes sure that the login endpoint correctly rejects requests when the
   * email exists but the password hash does not matched the stored one. Prisma is mocked
   * to return a valid user. bcrypt is mocked to return false to mock an incorrect password.
   * So the request will have a correct email and incorrect psswd.
   * 
   * We expect: 401 response status, { error : 'Invalid email or password' }
   */
  // password testing
  test('returns 401 if password is incorrect', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const request = { json: async () => ({ email: mockUser.email, password: '$2b$10$hash123' }) } as Request;
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Invalid email or password');
  });

  /**
   * return a 200 response and user data if the login successful
   * 
   * This test verifies that the login endpoint successfully auths a user
   * when the correct email + passwd are given. Primsa is mocked to return a
   * valid user for the given email. bcrypt is mocked to return true to sim
   * a correct passwd. The req has a correct email + passwd.
   * 
   * We Expect: 200 response and JSON response:{
   *     message: 'Login successful',
   *     user: { email: 'testuser@example.com', ... }  // password removed
   *   }
   */
  test('returns 200 and user data if login successful', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const request = { json: async () => ({ email: 'testuser@example.com', password: 'Password123!' }) } as Request;
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Login successful');
    expect(data.user.email).toBe(mockUser.email);
    expect(data.user.password).toBeUndefined();
  });

  /**
   * returns 500 if prisma throws an error
   * (not passing)
   * 
   * This makes sure that the login endpoint can correctly handle
   * unexpected db errors and returns a server error instead of
   * just crashing. Prisma (findUnique) is mocked to throw an error.
   * This simulates a database fail. The req contains a valid appearance email
   * and passwd. The POST should catch the rorr and respond with 500.
   * 
   * We expect: 500 response status, { error: 'Internal server error' }
   */
  test('returns 500 if prisma throws an error', async () => {
  (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('DB error'));

  const request = { json: async () => ({ email: 'test@example.com', password: 'Password123!' }) } as Request;
  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(500);
  expect(data.error).toBe('Internal server error');
});

/**
 * returns 400 if request JSON is malformed
 * (not passing)
 * 
 * Makes sure login endpoint handles invalid or malformed JSON in the req body
 * instead of craeshing or throwing a unhandled err. The request's json() method is
 * mcked to throw an error mocking a malformed/invalid JSON input. The POST should
 * catch the error and return a 400 status.
 * 
 * We expect: 400 response, JSON { error: 'Invalid request body'}
 */
test('returns 400 if request JSON is malformed', async () => {
  const request = { json: async () => { throw new Error('Malformed JSON'); } } as any;
  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(400);
  expect(data.error).toBe('Invalid request body');
});

  ///////////// Expected Fails ///////////////////

  /**
   * This test will fail because it is expecting the wrong success message. The
   * test intentionally will fail to verify that tests can correctly detect
   * mismatching expected outputs.
   * 
   * If a user exists in the db with email testuser@example.com and has
   * a mocked bycrypt hash, the password comparison is mocked to succeed. The
   * login POST request is sent with correct credentials.
   * 
   * We expect the returned JSON message of User authenticated successfully.
   * The test fails because the POST is returning Login Successful. This does not
   * match the message so the Jest fails the assertion.
   */
  test('fails when expecting wrong success message', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'testuser@example.com',
      password: '$2b$10$hash123',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const request = { json: async () => ({ email: 'testuser@example.com', password: 'Password123!' }) } as Request;
    const response = await POST(request);
    const data = await response.json();

    // This will fail because the actual message is "Login successful"
    expect(data.message).toBe('User authenticated successfully');
  });

  /**
   * fail because expects 200 for invalid credentials
   * 
   * This test will fail to show that the test suite correctly detects wrong
   * expectations. Prisma is moceked to return null, simulating that the user doesnt exist.
   * The req has email and passwd that are not in the db. The POST should return
   * 401 for invalid credentials.
   * 
   * We expect: The test incorrectly expects status 200. Since the response status is 401,
   * the test will fail.
   */
  test('fails because expects 200 for invalid credentials', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const request = { json: async () => ({ email: 'fake@example.com', password: 'badpass' }) } as Request;
    const response = await POST(request);

    // This will fail because actual is 401
    expect(response.status).toBe(200);
  });

  /**
   * fails because expects 200 when fields are missing
   * 
   * This test is made to fail to verify that the tests can detect incorrect
   * expectations when required input fields are missing. The req body has emtpy
   * strings for email + passwd. The POST should return 400 for missing fields.
   * The test wrongly expects a status of 200.
   * 
   * We expect: The actual response is 400 so the assertion for 200 will fail.
   */
  test('fails because expects 200 when fields are missing', async () => {
    const request = { json: async () => ({ email: '', password: '' }) } as any;
    const response = await POST(request);
    const data = await response.json();

    // Will fail because actual status is 400
    expect(response.status).toBe(200);
  });

});