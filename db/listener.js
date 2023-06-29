const app = require('./app');
const { PORT = 1970 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));