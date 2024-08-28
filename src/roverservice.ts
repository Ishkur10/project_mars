import { Position } from './types';

const directions = ["N", "E", "S", "W"] as const;

export class roverService {
  position: Position;
  gridSize: number;
  obstacles: Set<string>;

  constructor(x: number, y: number, direction: Position['direction'], gridSize = 200) {
    this.position = { x, y, direction };
    this.gridSize = gridSize;
    this.obstacles = new Set();
  }

  placeObstacle(x: number, y: number) {
    this.obstacles.add(`${x},${y}`);
  }

  move(commands: string): string {
    for (const command of commands) {
      let moveResult;

      if (command === "f") {
        moveResult = this.moveForward();
      } else if (command === "r") {
        this.turnRight();
        continue;
      } else if (command === "l") {
        this.turnLeft();
        continue;
      }

      if (moveResult && !moveResult.success) {
        return `Obstacle encountered at (${moveResult.x}, ${moveResult.y})! Aborting sequence.`;
      }
    }

    return `Rover position: (${this.position.x}, ${this.position.y}) facing ${this.position.direction}`;
  }

  private moveForward(): { success: boolean; x: number; y: number } {
    let { x, y } = this.position;

    switch (this.position.direction) {
      case "N":
        y = (y + 1) % this.gridSize;
        break;
      case "S":
        y = (y - 1 + this.gridSize) % this.gridSize;
        break;
      case "E":
        x = (x + 1) % this.gridSize;
        break;
      case "W":
        x = (x - 1 + this.gridSize) % this.gridSize;
        break;
    }

    if (this.obstacles.has(`${x},${y}`)) {
      return { success: false, x, y };
    }

    this.position.x = x;
    this.position.y = y;
    return { success: true, x, y };
  }

  private turnRight() {
    const currentIndex = directions.indexOf(this.position.direction);
    this.position.direction = directions[(currentIndex + 1) % 4];
  }

  private turnLeft() {
    const currentIndex = directions.indexOf(this.position.direction);
    this.position.direction = directions[(currentIndex - 1 + 4) % 4];
  }
}
