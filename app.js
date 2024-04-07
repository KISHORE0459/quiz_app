const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module
const questions = require('./questions.json'); // Load questions from JSON file

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving quiz questions
app.get('/questions', (req, res) => {
    res.json(questions);
});

// Route for submitting answers
app.post('/submit', (req, res) => {
    const userAnswers = req.body.answers;
    let score = 0;
    const feedback = [];
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
            feedback.push({ question: question.question, correct: true });
        } else {
            feedback.push({ question: question.question, correct: false, correctAnswer: question.answer });
        }
    });
    res.json({ score, feedback });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
