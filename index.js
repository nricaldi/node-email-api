const express = require("express");
const cors = require("cors")
const port = 8000;
// const db_name = "ninjasdb";
const app = express();

app.use(cors());
app.use(express.json());

// require('./server/mongoose')(db_name);
require('./server/routes')(app);

app.listen(port, () => console.log(`listening on port ${port}`));