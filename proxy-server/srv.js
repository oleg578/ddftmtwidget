const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Use cors middleware to set Access-Control-Allow-Origin header
app.use(cors({origin: '*'}));

app.get('/*', async (req, res) => {
    const urlPath = req.path.replace(/\/$/, '');
    const urlTail = urlPath.split('/').pop();
    try {
        const filePath = urlTail+'.json';
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(jsonData);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`local API server is running on http://localhost:${PORT}`);
});