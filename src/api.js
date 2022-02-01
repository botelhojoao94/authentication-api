const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const userRouter = require('./router/userRouter')
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

router.get("/", (req, res) => res.json({
    mensagem: 'API online!'
}));

app.use('/user', userRouter)



app.listen(process.env.PORT || 8080)
