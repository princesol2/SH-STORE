const express = require('express');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/vendor', vendorRoutes);

app.listen(PORT, () => {
  console.log('SHivy Backend Running on http://localhost:4000');
});
