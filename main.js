import './style.css';
import { Paddle } from './js/paddle.js';
import { Ball } from './js/ball.js';

const canvas = document.querySelector('#canvas');

// normalizes canvas ratio to avoid pixelation
const devicePixelRatio = window.devicePixelRatio || 1;
canvas.width = 960 * devicePixelRatio;
canvas.height = 540 * devicePixelRatio;

const c = canvas.getContext('2d');

if (!c) {
  throw new Error('canvas was not found');
}

const paddleOne = new Paddle({ x: 10, y: 60, width: 20, height: 50, color: 'teal' });
const paddleTwo = new Paddle({ x: canvas.width - 30, y: 60, width: 20, height: 50, color: 'red' });
const ball = new Ball({ x: 100, y: 60, radius: 12, color: 'yellow' });
const paddleOneControls = { up: false, down: false };
const paddleTwoControls = { up: false, down: false };

let ballSpeedVertical = 1.5;
let ballSpeedHorizontal = 1.5;
let paddleOneSpeed = 0;
let paddleTwoSpeed = 0;
let acceleration = 0.2;
let friction = 0.01;
let border = 5;
let buffer = 50;
let justHit = false;
let evaporation = 5;

const drawBackground = () => {
  c.fillStyle = '#000220'; // set background color
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const drawPaddles = () => {
  paddleOne.draw(c);
  paddleTwo.draw(c);
};

const drawBall = () => {
  ball.draw(c);
};

const updatePaddles = () => {
  paddleOneSpeed -= friction * paddleOneSpeed;
  paddleTwoSpeed -= friction * paddleTwoSpeed;

  //if they are moving pretty slow, just stop them.
  if (Math.abs(paddleOneSpeed) < friction) {
    paddleOneSpeed = 0;
  }
  if (Math.abs(paddleTwoSpeed) < friction) {
    paddleTwoSpeed = 0;
  }

  //add intertia from keypresses
  if (paddleOneControls.up) {
    paddleOneSpeed -= acceleration;
  }
  if (paddleOneControls.down) {
    paddleOneSpeed += acceleration;
  }
  if (paddleTwoControls.up) {
    paddleTwoSpeed -= acceleration;
  }
  if (paddleTwoControls.down) {
    paddleTwoSpeed += acceleration;
  }

  paddleOne.y += paddleOneSpeed;
  paddleTwo.y += paddleTwoSpeed;

  //bounce off the top and bottom
  if (paddleOne.y < 0) {
    paddleOne.y = 0;
    paddleOneSpeed *= -1;
  }
  if (paddleOne.y > canvas.height - paddleOne.height) {
    paddleOne.y = canvas.height - paddleOne.height;
    paddleOneSpeed *= -1;
  }
  if (paddleTwo.y < 0) {
    paddleTwo.y = 0;
    paddleTwoSpeed *= -1;
  }
  if (paddleTwo.y > canvas.height - paddleTwo.height) {
    paddleTwo.y = canvas.height - paddleTwo.height;
    paddleTwoSpeed *= -1;
  }
};

const updateBall = () => {
  if (justHit) {
    if (ball.x < buffer) {
      ballSpeedHorizontal = Math.abs(ballSpeedHorizontal);
    } else if (ball.x + buffer > canvas.width) {
      ballSpeedHorizontal = -1 * Math.abs(ballSpeedHorizontal);
    } else {
      justHit = false;
    }
  }
  ball.x += ballSpeedHorizontal;
  ball.y += ballSpeedVertical;

  //scoring
  if (ball.x - border < ball.radius) {
    ballSpeedHorizontal = Math.abs(ballSpeedHorizontal + Math.random() / 50);
    paddleTwo.height -= evaporation;
  }
  if (ball.x + border > canvas.width - ball.radius) {
    ballSpeedHorizontal = -1 * Math.abs(ballSpeedHorizontal + Math.random() / 50);
    paddleOne.height -= evaporation;
  }

  //is the game over?
  if (paddleOne.height <= 0) {
    alert('Player Left is the Winner!  Click okay to replay!');
    location.reload();
  }
  if (paddleTwo.height <= 0) {
    alert('Player Right is the Winner!  Click okay to replay!');
    location.reload;
  }

  //check if ball is off the top and bottom
  if (ball.y - border < ball.radius) {
    ballSpeedVertical = Math.abs(ballSpeedVertical + Math.random() / 50);
  }
  if (ball.y + border > canvas.height - ball.radius) {
    ballSpeedVertical = -1 * Math.abs(ballSpeedVertical + Math.random() / 50);
  }
  // detect if ball is beyond right paddle
  if (ball.x + ball.radius > paddleTwo.x) {
    // detect if ball is within right paddle vertical space
    if (ball.y > paddleTwo.y && ball.y < paddleTwo.y + paddleTwo.height) {
      ballSpeedHorizontal *= 1.02;
      ballSpeedVertical += paddleTwoSpeed;
      ballSpeedHorizontal *= -1;
      justHit = true;
    }
  }

  // detect if ball is beyond left paddle
  if (ball.x - ball.radius < paddleOne.x + paddleOne.width) {
    // detect if ball is within left paddle vertical space
    if (ball.y > paddleOne.y && ball.y < paddleOne.y + paddleOne.height) {
      ballSpeedHorizontal *= 1.02;
      ballSpeedVertical += paddleOneSpeed;
      ballSpeedHorizontal *= -1;
      justHit = true;
    }
  }
};

const animate = () => {
  drawBackground();
  drawPaddles();
  drawBall();
  updatePaddles();
  updateBall();
  requestAnimationFrame(animate);
};

addEventListener('keydown', function (key) {
  if (key.code === 'KeyW') {
    paddleOneControls.up = true;
  }
  if (key.code === 'KeyS') {
    paddleOneControls.down = true;
  }
  if (key.code === 'KeyI') {
    paddleTwoControls.up = true;
  }
  if (key.code === 'KeyK') {
    paddleTwoControls.down = true;
  }
});

addEventListener('keyup', function (key) {
  if (key.code === 'KeyW') {
    paddleOneControls.up = false;
  }
  if (key.code === 'KeyS') {
    paddleOneControls.down = false;
  }
  if (key.code === 'KeyI') {
    paddleTwoControls.up = false;
  }
  if (key.code === 'KeyK') {
    paddleTwoControls.down = false;
  }
});

animate();
