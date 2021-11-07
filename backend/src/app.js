const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/products' ,require('./routes/products.routes'));
app.use('/api/users' ,require('./routes/users.routes'));
app.use('/api/sales' , require('./routes/sales.routes'));
app.use('/api/carts' ,require('./routes/carts.routes'));
app.use('/api/auth' ,require('./routes/auth'));

module.exports = app;