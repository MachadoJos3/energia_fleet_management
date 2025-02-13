const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send("AAPI de Gerenciamento de frotas")
});

const vehicleRoutes = require('./src/routes/vehichleRoutes');
app.use('/api/vehicles',vehicleRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})