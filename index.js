const express = require('express');
const axios = require('axios');
const app = express();

app.get('/stream', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Falta el parámetro ?url');

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://newkso.ru/'
      },
      responseType: 'stream'
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).send('Error al acceder al stream.');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy activo');
});
