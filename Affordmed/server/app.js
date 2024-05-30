const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const registrationDetails = {
    companyName: "goMart",
    clientID: "6c0bc659-df4b-488d-9f65-5bbd3066181a",
    clientSecret: "RDydPdQmkyGrMYTC",
    ownerName: "mukesh",
    ownerEmail: "927621bit066@mkce.ac.in",
    rollNo: "927621BIT066"
};

// Function to fetch access token
async function getAccessToken() {
    try {
        const response = await fetch('http://20.244.56.144/test/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationDetails)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}

// Middleware to fetch access token before each request
app.use(async (req, res, next) => {
    try {
        const accessToken = await getAccessToken();
        console.log('Access token:', accessToken);
        req.headers['authorization'] = `Bearer ${accessToken}`;
        next();
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get categories
app.get('/categories/:category/products', async (req, res) => {
    try {
        const category = req.params.category;
        const n = parseInt(req.query.n) || 10;
        const page = parseInt(req.query.page) || 1;
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
        const company = req.query.company;
        const response = await fetch(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?n=${n}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
            headers: {
                'Authorization': req.headers['authorization']
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// get products by id
app.get('/categories/:category/products/:productid', async (req, res) => {
    try {
        const category = req.params.category;
        const productId = req.params.productid;
        const company = req.query.company;
        const response = await fetch(`http://20.244.56.144/test/companies/${company}/categories/${category}/products/${productId}`, {
            headers: {
                'Authorization': req.headers['authorization']
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch product details');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
