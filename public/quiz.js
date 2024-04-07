fetch('/questions')
    .then(response => response.json())
    .then(questions => {
        const quizForm = document.getElementById('quizForm');
        const questionsContainer = document.getElementById('questions');
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
                ${question.options.map((option, optionIndex) => `
                    <input type="radio" id="answer${index}_${optionIndex}" name="answer${index}" value="${option}">
                    <label for="answer${index}_${optionIndex}">${option}</label><br>
                `).join('')}
            `;
            questionsContainer.appendChild(questionDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

document.getElementById('quizForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userAnswers = [];
    for (const pair of formData.entries()) {
        userAnswers.push(pair[1]);
    }
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: userAnswers })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Your Score: ${data.score}</p>
            <ul>
                ${data.feedback.map(feedback => `<li>${feedback.question}: ${feedback.correct ? 'Correct' : 'Incorrect (Correct Answer: ' + feedback.correctAnswer + ')'}</li>`).join('')}
            </ul>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
