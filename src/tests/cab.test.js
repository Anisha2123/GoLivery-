


const request = require('supertest');
const app = require('../server'); // Import your Express app
const mongoose = require('mongoose');
const Cab = require('../models/Cab'); // Import Cab model
const User = require('../models/User'); // Import User model
const jwt = require('jsonwebtoken');
require('dotenv').config();

let adminToken, userToken;

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    // Clear Users before inserting new ones
    await User.deleteMany({});

    // Create test users
    const adminUser = await User.create({
        name: 'Admin',
        email: 'admin@test.com',
        password: 'hashedpassword', // Assume bcrypt-hashed
        isAdmin: true,
    });

    const normalUser = await User.create({
        name: 'Regular User',
        email: 'user@test.com',
        password: 'hashedpassword',
        isAdmin: false,
    });

    // Generate JWT tokens
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    adminToken = jwt.sign({ id: adminUser._id, isAdmin: true }, secret, { expiresIn: '1h' });
    userToken = jwt.sign({ id: normalUser._id, isAdmin: false }, secret, { expiresIn: '1h' });
});

beforeEach(async () => {
    // Clear existing cabs before adding new ones
    await Cab.deleteMany({});

    // Seed test database with sample cabs
    await Cab.insertMany([
        { name: 'Toyota Camry', type: 'Sedan', capacity: 4, farePerKm: 12 },
        { name: 'Hyundai Creta', type: 'SUV', capacity: 6, farePerKm: 15 },
    ]);
});

afterEach(async () => {
    // Clear the Cab collection after each test
    await Cab.deleteMany({});
});

afterAll(async () => {
    // Clear Users and Cabs before closing connection
    await User.deleteMany({});
    await Cab.deleteMany({});

    // Disconnect from the database after all tests
    await mongoose.connection.close();
});

describe('GET /api/cabs/list', () => {
    it('✅ Should return all available cabs', async () => {
        const res = await request(app)
            .get('/api/cabs/list') // ✅ Corrected Route
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty('name', 'Toyota Camry');
    });

    it('✅ Should return an empty array if no cabs exist', async () => {
        await Cab.deleteMany({}); // Ensure DB is empty

        const res = await request(app)
            .get('/api/cabs/list') // ✅ Corrected Route
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('❌ Should return 401 if no authentication token is provided', async () => {
        const res = await request(app).get('/api/cabs/list'); // ✅ Corrected Route

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Not authorized, no token');
    });

    // it('❌ Should return 403 if the user is not an admin', async () => {
    //     const res = await request(app)
    //         .get('/api/cabs/list') // ✅ Corrected Route
    //         .set('Authorization', `Bearer ${userToken}`);

    //     expect(res.status).toBe(403);
    //     expect(res.body.message).toBe('Not authorized as admin');
    // });
    test('❌ Should return 403 if the user is not an admin', async () => {
        const res = await request(app)
            .get('/api/cabs/list')
            .set('Authorization', `Bearer ${userToken}`);
    
        // console.log('❌ Debug: Response Body', res.body); // Debug the response
    
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Not authorized as admin');
    });
    

    test('❌ Should return 400 for invalid query parameter', async () => {
        // console.log('🔍 Debug: Sending invalid query parameter "invalidType"');
    
        const res = await request(app)
            .get('/api/cabs/list?type=invalidType') // Invalid query param
            .set('Authorization', `Bearer ${adminToken}`);
    
        // console.log('❌ Debug: Response Body', res.body); // Check the response
    
        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Invalid query parameter');
    });
    
});
