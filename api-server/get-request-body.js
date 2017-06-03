'use strict';

module.exports = function getRequestBody(request, maxLength = Infinity) {
  return new Promise((resolve, reject) => {
    const body = [];
    let length = 0;

    request.on('data', (chunk) => {
      length += chunk.length;
      if (length > maxLength) {
        reject(new Error(`The request body was too long (expected max ${maxLength} bytes)`));
      }

      body.push(chunk);
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.on('end', () => {
      resolve(Buffer.concat(body).toString());
    });
  });
};
