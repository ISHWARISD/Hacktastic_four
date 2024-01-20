// // server.js
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/jobPostings.html');
});

const jobData = [];

fs.createReadStream('./internship.csv')
  .pipe(csv())
  .on('data', (row) => {
    jobData.push(row);
  })
  .on('end', () => {
    console.log('job dataset successfully processed.');
  });

// Endpoint to serve Kaggle data
app.get('/job-data', (req, res) => {
  res.json(jobData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
