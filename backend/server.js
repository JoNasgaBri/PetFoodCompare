const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS com opções específicas
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Simulação de dados em memória (substituir por banco de dados depois)
let products = [
  { id: 1, name: "Royal Canin Maxi Adult", petType: "DOG", prices: [{ store: "Loja A", price: 289.90, shipping: 15.00 }] },
  { id: 2, name: "Whiskas Sachê", petType: "CAT", prices: [{ store: "Loja B", price: 49.90, shipping: 10.00 }] }
];

// Endpoint GET /products - Consulta de produtos
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint POST /products/compare - Comparação de preços
app.post('/products/compare', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json({ message: "Preços comparados", prices: product.prices });
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));

