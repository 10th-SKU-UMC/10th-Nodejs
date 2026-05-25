const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running: http://localhost:${PORT}`);
});
