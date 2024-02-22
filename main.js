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
let ballSpeedVertical = 1.5;
let ballSpeedHorizontal = 1.5;
let paddleOneSpeed = 0;
let paddleTwoSpeed = 0;
let acceleration = 0.2;
let friction = 0.01;
let maxSpeed = 5;

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
  console.log(paddleOneSpeed);

  paddleOneSpeed -= paddleOneSpeed * friction;

  if (paddleOneSpeed > maxSpeed) {
    paddleOneSpeed = maxSpeed;
  }
  if (paddleOneSpeed < -maxSpeed) {
    paddleOneSpeed = -maxSpeed;
  }
  if (paddleTwoSpeed > maxSpeed) {
    paddleTwoSpeed = maxSpeed;
  }
  if (paddleTwoSpeed < -maxSpeed) {
    paddleTwoSpeed = -maxSpeed;
  }

  if (Math.abs(paddleOneSpeed) < friction) {
    paddleOneSpeed = 0;
  }

  if (Math.abs(paddleTwoSpeed) < friction) {
    paddleTwoSpeed = 0;
  }

  paddleOne.y += paddleOneSpeed;
  paddleTwo.y += paddleTwoSpeed;

  if (paddleOne.y < 0) {
    paddleOne.y = 0;
  }
  if (paddleOne.y > canvas.height - paddleOne.height) {
    paddleOne.y = canvas.height - paddleOne.height;
  }
  if (paddleTwo.y < 0) {
    paddleTwo.y = 0;
  }
  if (paddleTwo.y > canvas.height - paddleTwo.height) {
    paddleTwo.y = canvas.height - paddleTwo.height;
  }
};

const updateBall = () => {
  ball.x += ballSpeedHorizontal;
  ball.y += ballSpeedVertical;
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ballSpeedHorizontal *= -1;
  }
  if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
    ballSpeedVertical *= -1;
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
    paddleOneSpeed -= acceleration;
  }
  if (key.code === 'KeyS') {
    paddleOneSpeed += acceleration;
  }
  if (key.code === 'KeyI') {
    paddleTwoSpeed -= acceleration;
  }
  if (key.code === 'KeyK') {
    paddleTwoSpeed += acceleration;
  }
});

animate();
