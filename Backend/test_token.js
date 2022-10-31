const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVlODVlNGZkODA5ZDc5ZjQzMjUyMDIiLCJpYXQiOjE2NjcxNDQ5ODAsImV4cCI6MTY2Nzc0OTc4MH0.XizpOtD-gPQ1CZCrHVMG7QbYk1BFV67s4EqW99HttdA';
const SECRET_KEY_DEV = 'dev-secret';
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);

  console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
