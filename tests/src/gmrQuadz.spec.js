const { test } = require('@playwright/test');
const axios=require('axios');
const Url = 'http://gmrquadzcs.arthink.ai/api/v1/'

test("API Login Test", async ({}) => {
    const loginData = {
        username: 'testgmr',
        password: 'gmr@123',
    };

    try {
        const response = await axios.post(Url+ "login", loginData);
        console.log(response.data); // Log the response data for verification
    } catch (error) {
        console.error('Login failed:', error.message);
    }
});
