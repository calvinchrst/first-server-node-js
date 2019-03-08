const fs = require('fs');

// This is an arrow syntax for method creation
// Basically this creates a method requet Handler that accepts 2 arguments input: req and res.
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message:</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    if(url === "/message" && method === "POST") {
        const body = [];
        
        req.on('data', (chunk) => {
            console.log("Chunk:", chunk);
            body.push(chunk);
        });
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("ParsedBody:", parsedBody);
    
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

// We can only have 1 export and below is different ways to do the exports
// module.exports = requestHandler;
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };
exports.handler = requestHandler;
exports.someText = 'Some hard coded text'
// exports is a global keyword that node js accepts. We don't have to write module.exports