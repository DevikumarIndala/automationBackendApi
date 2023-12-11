const { test } = require('@playwright/test');
const axios = require('axios');
const Url = 'http://98.70.33.161:8118/api/v1/login'
test("API Login Test", async ({}) => {
    const loginData = {
        username: 'devi',
        password: '1234',
    };

    try {
        const response = await axios.post(Url, loginData);
        console.log(response.data); // Log the response data for verification
    } catch (error) {
        console.error('Login failed:', error.message);
    }
});
