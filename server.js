const app = require('./app');

const PORT = 3000;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});