/**
 * Implemention of a CCA
 */

const MODULO = 8;

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
 * CCA class
 */
class CCA {

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

    //this.randomize();

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
   * Clear the cca grid
   */
  clear() {
    for (let h = 0; h < this.height; h++) {
      this.cells[this.currentBufferIndex][h].fill(0);
    }
  }

  /**
   * Randomize the cca grid
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
    console.log('inverse currentbBufferIndex', !this.currentBufferIndex);
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];
    
    // see if we have a neighbor that can infect this cell and change its color
    function hasInfectiousNeighbor(x, y) {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // Check West
      if (x > 0) {
        if (currentBuffer[y][x - 1] === nextValue) {
          return true;
        }
      }
      // Check North
      if (y > 0) {
        if (currentBuffer[y - 1][x] === nextValue) {
          return true;
        }
      }
      // Check East
      if (x < this.width - 1) {
        if (currentBuffer[y][x + 1] === nextValue) {
          return true;
        }
      }
      // Check South
      if (y < this.height - 1) {
        if (currentBuffer[y + 1][x] === nextValue) {
          return true;
        }
      }

      // If we've made it here...we're NOT infected!
      return false;
    } // end: hasInfectiousNeighbor()

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        if (hasInfectiousNeighbor.call(this, w, h)) {
          backBuffer[h][w] = (currentBuffer[h][w] + 1) % MODULO;
        } else {
          backBuffer[h][w] = currentBuffer[h][w];
        }
      }
    }

    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default CCA;