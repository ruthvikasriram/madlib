const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// POST route handler for form submission
server.post('/submit', (req, res) => {
    // Retrieve form data from request body
    const {PluralNoun, verb, adjective, noun, adverb } = req.body;

    // Check if all fields are filled
    if (!PluralNoun || !verb || !adjective || !noun || !adverb) {
        return res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/">Go Back to Form</a>
        `);
    }

    // Create the mad lib using the form data
    const madLib = `The ${madLib.PluralNoun} are${madLib.verb} on the ${madLib.adjective} ${madLib.noun} ${madLib.adverb}.`;

    // Send the filled-in mad lib back as the response
    res.send(`
        <h1>Mad Lib Generated</h1>
        <p>${madLib}</p>
        <a href="/">Go Back to Form</a>
    `);
});

// Serve static files
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Set port to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));