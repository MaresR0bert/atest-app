import express from 'express';
import cors from 'cors';
import router from './algorithmEndpoints.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/optimal', router);

const port = 3002;
app.listen(port, function(){
    console.log('Server running on port: '+ port);
});