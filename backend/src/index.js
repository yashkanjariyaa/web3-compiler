const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const connectDatabase = require("../config/database");
const compilerRoutes = require("./routes/compilerRoutes");
const questionsRoutes = require("./routes/questionsRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', compilerRoutes);
app.use('/api', questionsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
