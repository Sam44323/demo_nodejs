const fs = require('fs');

/*
Note:
---------------------------------------------------------------------------------------------------

When we press the button, then our server automatically listens the request and calls the callback
function therefore and then the requires logic takes place. During the redirecting, we set the
status code of the response to 302 which means that, during the sending of the response the user is
automatically reidireted to the mentioned setHeader location.

Buffer.concat(body) creates a one single buffer of all the chunks

----------------------------------------------------------------------------------------------------
*/

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter the message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>'
    ); // localhost:3000 is automatically added in front of the /message url
    res.write('</html>');
    return res.end(); // using return so that the control doesn't go further
  }
  if (url === '/message' && method === 'POST') {
    /*using the stream and buffer concept to read the incoming datas (see net ninja lec) */
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk); // pushing the recieved chunk.
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // chunks ----> readable string format
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        console.log(err);
      });
    });
    res.statusCode = 302; // meaning to redirect
    res.setHeader('Location', '/text'); // redirecting the user to the text url
    return res.end(); // same as the prev return
  }
  if (url === '/text') {
    res.write('<h3>Thank you for using our service!');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first webpage</title></head>');
  res.write('<body><h1>Welcome from NodeJS</h1></body>');
  res.write('</html>');
  res.end(); // sending response contents
};

/*way 1 for exporting a module */

module.exports = requestHandler; // exporting a module

/*way 2 for exporting a module(when we want to export  multiple things) 
-----------------------------------------------------------------------
module.exports = {
    handler: requestHandler,
}

way 3
----------
module.exports.handler = requestHandler;

shortcut way
------------
exports.handler = requestHandler;
*/
