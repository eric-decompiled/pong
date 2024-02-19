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

const paddles = [new Paddle({ x: 10, y: 60, width: 20, height: 50, color: 'teal' })];
const ball = new Ball({ x: 100, y: 60, radius: 12, color: 'yellow' });
let ballSpeedVertical = 1.5;
let ballSpeedHorizontal = 1.5;

const drawBackground = () => {
  c.fillStyle = '#000220'; // set background color
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const drawPaddles = () => {
  paddles.forEach(shape => {
    shape.draw(c);
  });
};

const drawBall = () => {
  ball.draw(c);
};

const updatePaddles = () => {
  paddles.forEach(paddle => paddle.update());
};

const updateBall = () => {
  ball.update();
};

const animate = () => {
  drawBackground();
  drawPaddles();
  drawBall();
  updatePaddles();
  ball.x += ballSpeedHorizontal;
  ball.y += ballSpeedVertical;
  if (ball.x < 10 || ball.x > 949) {
    ballSpeedHorizontal *= -1;
  }
  if (ball.y < 10 || ball.y > 539) {
    ballSpeedVertical *= -1;
  }
  updateBall();

  requestAnimationFrame(animate);
};

animate();
