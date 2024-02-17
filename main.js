import './style.css';
import { Paddle } from './js/paddle';

const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

if (!c) {
  throw new Error('canvas was not found');
}

const paddles = [new Paddle({ x: 10, y: 60, width: 20, height: 50, color: 'teal' })];

const drawBackground = () => {
  c.fillStyle = '#000220'; // set background color
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const drawPaddles = () => {
  paddles.forEach(shape => {
    shape.draw(c);
  });
};

const updatePaddles = () => {
  paddles.forEach(paddle => paddle.update());
};

const animate = () => {
  drawBackground();
  drawPaddles();

  updatePaddles();

  requestAnimationFrame(animate);
};

animate();
