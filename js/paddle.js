export class Paddle {
  /**
   * Creates a new Paddle instance.
   * @param {Object} param0 - The paddle properties.
   * @param {number} param0.x - The x-coordinate of the paddle.
   * @param {number} param0.y - The y-coordinate of the paddle.
   * @param {number} param0.width - The width of the paddle.
   * @param {number} param0.height - The height of the paddle.
   * @param {string} param0.color - The color of the paddle. Can be hex code or named color
   */
  constructor({ x, y, width, height, color }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  /**
   * Draws the shape using the given rendering context
   * @param {CanvasRenderingContext2D} c - Canvas 2D rendering context to draw the shape
   */
  draw(c) {
    const { x, y, color, width, height } = this;

    c.fillStyle = color;
    c.beginPath();
    c.rect(x, y, width, height);
    c.fill();
  }

  /**
   * TODO
   *
   * Updates the paddle's state a single frame
   */
  update() {
    // should update the position one frame worth
  }
}
