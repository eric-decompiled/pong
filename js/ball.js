export class Ball {
  /**
   * Creates a new Ball instance.
   * @param {Object} param0 - The ball properties.
   * @param {number} param0.x - The x-coordinate of the ball.
   * @param {number} param0.y - The y-coordinate of the ball.
   * @param {number} param0.radius - The radius of the ball.
   * @param {string} param0.color - The color of the ball. Can be hex code or named color
   */

  constructor({ x, y, radius, color }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   * Draws the shape using the given rendering context
   * @param {CanvasRenderingContext2D} c - Canvas 2D rendering context to draw the shape
   */

  draw(c) {
    const { x, y, color, radius } = this;

    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, radius, Math.PI * 2);
    c.fill();
  }

  /**
   * TODO
   *
   * Updates the balls' state a single frame
   */

  update() {
    // should update the position one frame worth
  }
}
