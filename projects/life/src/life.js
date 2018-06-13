/**
 * Implementation of Conway's game of Life
 */

 const MODULO = 2;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];

    this.currentBufferIndex = 0;

    this.randomize();

    this.clear();

  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let h = 0; h < this.height; h++) {
      this.cells[this.currentBufferIndex][h].fill(0);
    }
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        this.cells[this.currentBufferIndex][h][w] = Math.random() * MODULO | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    /* If you put logic from CCA here it works as should */

    /* In the Game of Life, these rules examine each cell of the grid. 
    For each cell, it counts that cell's eight neighbors
    (up, down, left, right, and diagonals), and then act on that result.

    If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
    If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead. */

    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];
    
    // see if we have a neighbor that can infect this cell and change its color
    function checkNeighbors(w, h) {
      let neighbors = 0;

      // Check West
      if (w) {
        if (currentBuffer[h][w - 1]) {
          neighbors++;
        }
      }
      // Check NW
      if (h && w) {
        if (currentBuffer[h - 1][w - 1])
          neighbors++;
      }
      // Check North
      if (h) {
        if (currentBuffer[h - 1][w]) {
          neighbors++;
        }
      }
      // Check NE
      if ((w < this.width - 1) && h) {
          if (currentBuffer[h - 1][w + 1]) {
            neighbors++;
          }
      }
      // Check East
      if (w < this.width - 1) {
        if (currentBuffer[h][w + 1]) {
          neighbors++;
        }
      }
      // Check SE
      if ((h < this.height - 1) && (w < this.width - 1)) {
        if (currentBuffer[h + 1][w + 1]) {
          neighbors++;
        }
      }
      // Check South
      if (h < this.height - 1) {
        if (currentBuffer[h + 1][w]) {
          neighbors++;
        }
      }
      // Check SW
      if ((h < this.height - 1) && w) {
        if (currentBuffer[h + 1][w - 1]) {
          neighbors++;
        }
      }

      return neighbors;
    } // end: checkNeightbors()

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        let neighborCount = checkNeighbors.call(this, w, h);

        // is current cell alive?
        if (currentBuffer[h][w]) {
          if (neighborCount === 2 || neighborCount === 3) {
            backBuffer[h][w] = currentBuffer[h][w]; // cell stay alives
          }
          else { // else it dies
            backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
          }
        }
        else { // current cell is dead
          if (neighborCount === 3) {
            backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO; // bring cell to life
          }
          else { // else cell remains dead
            backBuffer[h][w] = currentBuffer[h][w];
          }
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
