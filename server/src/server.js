const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { initDb } = require('./utils/dbUtils');
const { deployContract, subscribeToContract } = require('./utils/contractsUtils');
const { DISTRICTS, CANDIDATES, CURRENT_CONTRACT } = require('./constants/contractConstants');

const app = express();

app.enable('trust proxy');
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500'
    ]
}));
app.use(express.json());

app.use(routes);

app.get('/', function (req, res) {
    res.send('Opa')
});

const initialize = async () => {
    try {
        await initDb();
        await subscribeToContract(CURRENT_CONTRACT);
        app.listen(5000, () => console.log('App is running on port 5000'));
    } catch (error) {
        console.log(error)
    }
}

initialize();

