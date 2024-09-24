const http = require('http');
const url = require('url');
const querystring = require('querystring');  // Import querystring to parse URL-encoded data

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Get Method is processed</h1>');
        // "http://localhost:3000/?username=&age=3&email=&phone=&gender="
        const parsedURL = url.parse(req.url, true);
        const { username, age, email, phone, gender } = parsedURL.query;
        
        res.write(`<h3>Username: ${username}</h3>`);
        res.write(`<h3>Age: ${age}</h3>`);
        res.write(`<h3>Email: ${email}</h3>`);
        res.write(`<h3>Phone: ${phone}</h3>`);
        res.write(`<h3>Gender: ${gender}</h3>`);
        res.end();
    } else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Post Method is processed</h1>');

        let inputs = '';

        req.on('data', (chunk) => {
            inputs += chunk.toString();  // accumulate chunks into 'inputs'
        });

        req.on('end', () => {
            console.log(inputs);  // log the raw form data
            const parsedData = querystring.parse(inputs);  // parse URL-encoded data

            // Extract all fields from the parsed data
            const { username, age, email, phone, gender } = parsedData;

            res.write(`<h3>Username: ${username}</h3>`);
            res.write(`<h3>Age: ${age}</h3>`);
            res.write(`<h3>Email: ${email}</h3>`);
            res.write(`<h3>Phone: ${phone}</h3>`);
            res.write(`<h3>Gender: ${gender}</h3>`);
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.write('<center>Method not Found</center>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running @ http://localhost:3000');
});
