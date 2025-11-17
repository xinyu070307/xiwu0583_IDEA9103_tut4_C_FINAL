let canvasSize;
let UNIT;
const GRID_COLS = 36;
const GRID_ROWS = 36;

const BG = "#ffffffff";
const YELLOW = "#f4d31f";
const RED = "#d1372a";
const BLUE = "#2956a4";
const GREY = "#d5cfc5";

// INTERACTION
let enableInteraction = true;
let maxScale = 1.5;
let interactionRadius = 200;

//  Segment settings for 50x50 grid 
const SEG_COLS = 50;
const SEG_ROWS = 50;

let segments = [];
let originalImage;
let originalReady = false;

// CLASS RECT
class Segment {
  constructor(col, row, segW, segH) {
    this.col = col;
    this.row = row;
    this.w = segW;
    this.h = segH;

    this.originalX = col * segW;
    this.originalY = row * segH;

    this.x = this.originalX;
    this.y = this.originalY;
  }

  draw(img) {
    const sx = this.col * this.w;
    const sy = this.row * this.h;
    image(img, this.x, this.y, this.w, this.h, sx, sy, this.w, this.h);
  }

  reset() {
    this.x = this.originalX;
    this.y = this.originalY;
  }
}

function createSegments() {
  segments = [];
  const segW = width / SEG_COLS;
  const segH = height / SEG_ROWS;

  for (let row = 0; row < SEG_ROWS; row++) {
    for (let col = 0; col < SEG_COLS; col++) {
      segments.push(new Segment(col, row, segW, segH));
    }
  }
}

// oil and crayon
let oilPaintGraphics;
let crayonGraphics;

// DRAW YELLOW RECT
const YELLOW_HORIZONTAL_LINES = [
  [0, 0, 18, 1], [0, 2, 18, 1],
  [0, 4, 18, 1], [0, 6, 18, 1],
  [0, 8, 18, 1], [0, 10, 18, 1],
  [0, 12, 18, 1], [0, 14, 18, 1],
  [0, 16, 18, 1]
];

const YELLOW_VERTICAL_LINES = [
  [0, 0, 1, 18], [2, 0, 1, 18],
  [4, 0, 1, 18], [6, 0, 1, 18],
  [8, 0, 1, 18], [10, 0, 1, 18],
  [12, 0, 1, 18], [14, 0, 1, 18],
  [16, 0, 1, 18]
];

const YELLOW_RECTANGLES = [
  [0, 0, 18, 18]
];

const SEGMENTS = [
  [0, 1, [
    [2,0,RED],[4,0,BLUE],[6,0,RED],[9,0,BLUE],
    [12,0,RED],[15,0,BLUE],[18,0,RED]
  ]],
  [0, 13, [
    [1,0,RED],[3,0,BLUE],[5,0,RED],[9,0,BLUE],
    [12,0,YELLOW],[15,0,RED],[18,0,BLUE]
  ]],
  [0, 20, [
    [1,0,BLUE],[3,0,RED],[5,0,BLUE],[7,0,RED],
    [9,0,BLUE],[11,0,RED],[13,0,BLUE]
  ]],
  [1, 0, [
    [0,2,RED],[0,4,BLUE],[0,6,RED],[0,20,BLUE],[0,16,RED], [0,27,BLUE], [0,32,RED]
  ]],
  [23, 0, [
    [0,2,RED],[0,4,BLUE],[0,6,RED],[0,9,BLUE],
    [0,13,YELLOW],[0,16,RED]
  ]],
  [32, 0, [
    [0,3,BLUE],[0,5,RED],[0,8,BLUE],[0,11,RED],[0,15,BLUE]
  ]],
  [0, 22, [
    [3,0,BLUE],[5,0,RED],[8,0,BLUE],[11,0,RED],[15,0,BLUE], 
    [17,0,BLUE],[19,0,RED],[21,0,BLUE],[24,0,RED],[26,0,BLUE], 
    [28,0,RED],[30,0,BLUE],[32,0,RED],[34,0,BLUE]
  ]],
  [0, 25, [
    [3,0,BLUE],[5,0,RED],[8,0,BLUE],[11,0,RED],[15,0,BLUE], 
    [17,0,BLUE],[19,0,RED],[21,0,BLUE],[24,0,RED],[26,0,BLUE], 
    [28,0,RED],[30,0,BLUE],[32,0,RED],[34,0,BLUE]
  ]],
  [0, 29, [
    [3,0,BLUE],[5,0,RED],[8,0,BLUE],[11,0,RED],[15,0,BLUE], 
    [17,0,BLUE],[19,0,RED],[21,0,BLUE],[24,0,RED],[26,0,BLUE], 
    [28,0,RED],[30,0,BLUE],[32,0,RED],[34,0,BLUE]
  ]]
];

const RED_BLOCKS = [
  [12, 18, 12, 18],
  [0, 18, 6, 6],
  [6, 30, 6, 6],
  [24, 18, 6, 9],
  [30, 27, 6, 9]
];

const BLUE_BLOCKS = [
  [18, 10, 18, 8],
  [0, 24, 6, 6],
  [6, 18, 6, 6],
  [24, 27, 6, 9],
  [30, 18, 6, 9]
];

const GREY_BLOCKS = [
  [24, 27, 12, 9]
];

const NESTED_BLOCKS = [
  {
    base: [0, 18],
    outer: [6, 0, 6, 6, BG],
    inner: [7, 1, 4, 4, BLUE],
    innermost: [8, 2, 2, 2, BG]
  },
  {
    base: [24, 18],
    outer: [0, 9, 6, 9, BG],
    inner: [1, 10, 4, 7, RED],
    innermost: [2, 11, 2, 5, BG]
  }
];

function setupTextures() {
  createOilPaintTexture();
  createCrayonTexture();
}

function createOilPaintTexture() {
  oilPaintGraphics = createGraphics(100, 100);
  oilPaintGraphics.noStroke();
  
  for (let i = 0; i < 120; i++) { 
    const x = random(100);
    const y = random(100);
    const size = random(2, 6); 
    const alpha = random(15, 35); 
    
    oilPaintGraphics.fill(255, 255, 255, alpha);
    oilPaintGraphics.ellipse(x, y, size, size * 0.7);
  }
}

function createCrayonTexture() {
  crayonGraphics = createGraphics(150, 150);
  crayonGraphics.noStroke();
  
  for (let i = 0; i < 600; i++) {
    const x = random(150);
    const y = random(150);
    const size = random(2, 5);
    const alpha = random(15, 35);
    const brightness = random(220, 255);
    
    crayonGraphics.fill(brightness, brightness, 180, alpha);
    crayonGraphics.ellipse(x, y, size, size * 0.6);
  }
}

class Mondrian {
  constructor() {
    this.rects = [];
    this.build();
  }

  addRect(gx, gy, gw, gh, color) {
    this.rects.push({ gx, gy, gw, gh, color });
  }

  addBatch(list, color) {
    list.forEach(([x,y,w,h]) => this.addRect(x, y, w, h, color));
  }

  addOffsetPoints(baseX, baseY, points) {
    points.forEach(([dx,dy,color]) => {
      this.addRect(baseX + dx, baseY + dy, 1, 1, color);
    });
  }

  build() {
    this.buildYellow();
    this.buildSegments();
    this.buildBlocks();
    this.buildNested();
    this.buildGreys();
  }

  draw() {
    // DRAW RECT
    for (const r of this.rects) {
      let scale = 1;
      if (enableInteraction && (r.color === RED || r.color === BLUE)) {
        scale = this.calculateScaleForRect(r);
      }
      this.drawScaledRect(r, scale);
    }
    
    // OIL AND CRAYON EFFECT
    for (const r of this.rects) {
      if (r.color === RED || r.color === BLUE) {
        this.drawOilPaintEffect(r);
      } else if (r.color === YELLOW || r.color === GREY) {
        this.drawCrayonEffect(r);
      }
    }
    
    this.drawGridLines();
  }

  calculateScaleForRect(rectObj) {
    const x = (rectObj.gx + rectObj.gw / 2) * UNIT;
    const y = (rectObj.gy + rectObj.gh / 2) * UNIT;
    const d = dist(mouseX, mouseY, x, y);
    if (d > interactionRadius) return 1;
    const t = 1 - d / interactionRadius;
    return 1 + t * (maxScale - 1);
  }

  drawScaledRect(rectObj, scale) {
    const x = rectObj.gx * UNIT;
    const y = rectObj.gy * UNIT;
    const w = rectObj.gw * UNIT;
    const h = rectObj.gh * UNIT;
    
    let drawX = x;
    let drawY = y;
    let drawW = w;
    let drawH = h;
    
    if (scale !== 1) {
      drawW = w * scale;
      drawH = h * scale;
      drawX = x - (drawW - w) / 2;
      drawY = y - (drawH - h) / 2;
    }
    
    noStroke();
    fill(rectObj.color);
    rect(drawX, drawY, drawW, drawH);
  }

  drawGridLines() {
    stroke(0);
    strokeWeight(4);
    
    for (let i = 0; i <= GRID_COLS; i++) {
      const x = i * UNIT;
      line(x, 0, x, canvasSize);
    }
    
    for (let j = 0; j <= GRID_ROWS; j++) {
      const y = j * UNIT;
      line(0, y, canvasSize, y);
    }
  }

  buildYellow() {
    this.addBatch(YELLOW_RECTANGLES, YELLOW);
    this.addBatch(YELLOW_HORIZONTAL_LINES, YELLOW);
    this.addBatch(YELLOW_VERTICAL_LINES, YELLOW);
  }

  buildSegments() {
    SEGMENTS.forEach(([baseX, baseY, points]) => {
      this.addOffsetPoints(baseX, baseY, points);
    });
  }

  buildBlocks() {
    this.addBatch(RED_BLOCKS, RED);
    this.addBatch(BLUE_BLOCKS, BLUE);
  }

  buildNestedBlock(config) {
    const [bx, by] = config.base;
    const [ox, oy, ow, oh, outerColor] = config.outer;
    const [ix, iy, iw, ih, innerColor] = config.inner;
    const [nx, ny, nw, nh, innermostColor] = config.innermost;
    
    this.addRect(bx + ox, by + oy, ow, oh, outerColor);
    this.addRect(bx + ix, by + iy, iw, ih, innerColor);
    this.addRect(bx + nx, by + ny, nw, nh, innermostColor);
  }

  buildNested() {
    NESTED_BLOCKS.forEach(config => this.buildNestedBlock(config));
  }

  buildGreys() {
    this.addBatch(GREY_BLOCKS, GREY);
  }

  drawOilPaintEffect(rectObj) {
    const x = rectObj.gx * UNIT;
    const y = rectObj.gy * UNIT;
    const w = rectObj.gw * UNIT;
    const h = rectObj.gh * UNIT;
    
    push();
    blendMode(OVERLAY);
    
    const scaleX = w / oilPaintGraphics.width;
    const scaleY = h / oilPaintGraphics.height;
    
    push();
    translate(x, y);
    scale(scaleX, scaleY);
    image(oilPaintGraphics, 0, 0);
    pop();
    
    pop();
  }

  drawCrayonEffect(rectObj) {
    const x = rectObj.gx * UNIT;
    const y = rectObj.gy * UNIT;
    const w = rectObj.gw * UNIT;
    const h = rectObj.gh * UNIT;
    
    push();
    blendMode(HARD_LIGHT);
    
    const scaleX = w / crayonGraphics.width;
    const scaleY = h / crayonGraphics.height;
    
    push();
    translate(x, y);
    scale(scaleX, scaleY);
    image(crayonGraphics, 0, 0);
    pop();
    
    pop();
  }
}

let mondrian;

function setup() {
  createCanvas(800, 800);
  resizeCanvasCalc();
  rectMode(CORNER);
  noStroke();
  
  setupTextures();
  mondrian = new Mondrian();
  
  noLoop();
  redraw();
}

function draw() {
  // draw 2500 个 segment
  if (!originalReady) {
    background(BG);
    mondrian.draw();
    originalImage = get();
    createSegments();
    originalReady = true;
  }

  // segment 
  background(BG);
  for (const s of segments) {
    s.draw(originalImage);
  }
}

function mouseMoved() {
  if (enableInteraction) {
    redraw();
  }
  return false;
}

function mouseDragged() {
  if (enableInteraction) {
    redraw();
  }
  return false;
}

function keyPressed() {
  // SPACE KEY SIMPLE glitch）
  if (key === ' ') {
    const jitter = 10;
    for (const s of segments) {
      s.x = s.originalX + random(-jitter, jitter);
      s.y = s.originalY + random(-jitter, jitter);
    }
    redraw();
    return false;
  }
  // R：INCOVER
  else if (key === 'r' || key === 'R') {
    for (const s of segments) {
      s.reset();
    }
    redraw();
    return false;
  }
}

function windowResized() {
  resizeCanvasCalc();
  redraw();
}

function resizeCanvasCalc() {
  canvasSize = min(windowWidth, windowHeight);
  UNIT = canvasSize / GRID_COLS;
  resizeCanvas(canvasSize, canvasSize);
}
