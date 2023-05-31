import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent {
  questions = [
    {
      text: 'What is Angular?',
      choices: [
        'A JavaScript framework for building web applications',
        'A tool for managing dependencies in JavaScript projects',
        'A text editor for web development',
        'A version control system for web projects'
      ],
      correctAnswer: 0
    },
    // Add more questions here
  ];

  // The current question being displayed
  currentQuestion = 0;

  // The user's answers to the questions
  answers: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  incrementCurrentQuestion() {
    this.currentQuestion++;
  }

  // Called when the user selects an answer
  selectAnswer(answer: number) {
    // Save the answer to the current question
    this.answers[this.currentQuestion] = answer;

    // Go to the next question
    this.currentQuestion++;
  }

  // Called when the user clicks the "Finish Quiz" button
  finishQuiz() {
    // Calculate the number of correct answers
    let numCorrect = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].correctAnswer === this.answers[i]) {
        numCorrect++;
      }
    }

    // Display the number of correct answers to the user
    alert('You got ' + numCorrect + ' out of ' + this.questions.length + ' questions correct!');
  }
}
