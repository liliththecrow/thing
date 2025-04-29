const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/fetch', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing 'url' parameter");

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Remove JavaScript and styles
    html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
    html = html.replace(/<link.*?rel=["']stylesheet["'].*?>/gi, '');

    res.send(html);
  } catch (err) {
    res.status(500).send("Error fetching page: " + err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
