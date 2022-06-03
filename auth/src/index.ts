import express from 'express';
import { json } from 'body-parser';
try { 

const app = express();
app.use(json());


app.get('/api/users/currentUser', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
});

} catch (err) {
    console.log(err)
}