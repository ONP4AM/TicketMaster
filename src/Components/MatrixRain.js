import React, { Component } from 'react';

class MatrixRain extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.fontSize = 10;
    this.columns = Math.floor(window.innerWidth / this.fontSize); // Use Math.floor to get an integer
    this.drops = new Array(this.columns).fill(1);
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+[]{}|;:,.<>?'.split('');
  }

  componentDidMount() {
    this.setupCanvas();
    this.animate();
  }

  setupCanvas() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Dark background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#FFF'; // White letters

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.letters[Math.floor(Math.random() * this.letters.length)];
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      this.drops[i]++;
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.98) {
        this.drops[i] = 0;
      }
    }
  }

  animate() {
    this.draw();
    setTimeout(this.animate.bind(this), 50); // Slower animation (increase or decrease the delay as needed)
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default MatrixRain;
