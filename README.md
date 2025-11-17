# xiwu0583_IDEA9103_tut4_C_FINAL
Individual assignment
# IDEA9103_Tut04_C_XIWU0583
// Mondrian Interactive Art Project
I choose “ User Input:Incorporate mouse or keyboard inputs for animation.”

An interactive digital recreation of Piet Mondrian's iconic abstract art style with dynamic visual effects and real-time user interactions.

  Live Demo & Interaction

// Immediate Interaction
- Simply load the page and the Mondrian composition will appear
- Move your mouse around the canvas to see segments dynamically scale

// Interactive Controls

// Mouse Movement
- Slowly move your mouse across the canvas to observe the scaling effects
- Segments scale based on distance from your cursor**:
  -  Close to mouse: Segments shrink to 0.8x size
  -  Far from mouse: Segments grow to 1.5x size

// Keyboard Shortcuts
- SPACEBAR: Press to activate glitch effect - small segments randomly shift positions
- R KEY: Press to reset all segments to their original organized positions

//  Personal Animation Approach

// Core Animation Driver: Interactive Scaling
I chose real-time mouse interaction as the primary animation driver, specifically implementing a distance-based scaling system. This approach creates a direct physical connection between the viewer and the artwork.

// Animated Properties & Uniqueness

// What Animates:
- Dynamic Scaling: Each segment transforms based on cursor proximity
- Texture Intensity: Oil paint and crayon effects intensify with scaling
- Spatial Depth: Creates 3D-like perception in a 2D composition

// How I Differ from Team Members:
While other team members explore:
-  Audio-responsive color changes
-  Time-based sequential reveals

My implementation focuses exclusively on spatial relationship animation where the user's physical movements directly manipulate the artwork's structural geometry.

// Inspiration & References
![An image of a game](thomas_was_alone_6.jpg)
- This game of Thomas gave me an inspiration for creating animated games. Even simple rectangles can be transformed through movement and resizing, creating a kind of playful interaction.

![Rafael Rozendaal.jpg](<Rafael Rozendaal.jpg>)
- Rafael Rozendaal provided some inspiration for various arrangements. Different colors and sizes of rectangles, through interactive behaviors such as changing size, make the simple rectangles interesting and create a visual impact effect.

// Artistic Inspirations
| Inspiration and Influence on My Work 
| Piet Mondrian's Composition| Geometric structure, primary color palette, grid system |
| Digital Glitch Art| Temporary displacement effects, digital aesthetics |
| Interactive Installations| Viewer-responsive art, spatial relationships |

// Technical References
- p5.js Official Documentation: `dist()`, `map()`, transformation functions
- Course Tutorial: Object-oriented segment management (Week 7 tutorial)
- Computer Graphics: Coordinate space manipulation, matrix transformations

// Technical Implementation

// Core Animation Algorithm
```javascript
// Real-time distance calculation
const distance = dist(mouseX, mouseY, centerX, centerY);
const scaleFactor = map(distance, 0, maxDistance, 0.8, 1.5);

// Matrix transformation around center point
translate(centerX, centerY);
scale(scaleFactor);
translate(-centerX, -centerY);
```
// Class Architecture
The `Mondrian` class efficiently handles:
- Segment Management: Grid-based positioning and storage
- Texture Rendering: Separate graphics buffers for oil and crayon effects
- Interaction Processing: Real-time transformation calculations
- State Control: Glitch effects and reset functionality

// Interactive Features Breakdown

1. Mouse-Based Scaling
- Uses p5.js `dist()` for cursor distance calculation
- Applies non-uniform scaling while maintaining composition integrity
- Preserves texture consistency during transformations

2. Keyboard-Controlled Glitch Effects
- Selective Application: Only affects 1x1 grid segments
- Controlled Randomness: Limited offset range (-2 to +2 pixels)
- Unit Consistency: Grid-based calculations for proper scaling

3. Texture System
- Oil Paint Effect: Soft light blending with elliptical brush strokes
- Crayon Texture: Hard light blending with rectangular streaks
- Dynamic Intensity: Texture effects scale with segment transformations

// Installation & Setup

// Quick Start
1. Download all project files to a single folder
2. Open `index.html` in any modern web browser
3. Start interacting immediately - no setup required!

// File Structure
```
mondrian-interactive/
1. index.html          # Main HTML file
2. sketch.js           # p5.js drawing code (main project file)
3.README.md           # This documentation
4. (optional CSS files)
```

// Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No additional dependencies - uses p5.js CDN

// Interaction Tips

// For Best Experience:
- Slow, deliberate mouse movements reveal the scaling relationships best
- Try circular motions to create wave patterns across the composition
- Combine glitch + mouse movement for complex visual effects
- Reset frequently to compare transformed vs. original states

// Advanced Interactions:
- Distance exploration: Notice how far/near segments react differently
- Glitch accumulation: Multiple spacebar presses increase displacement
- Edge detection: Move cursor to canvas edges to see maximum scaling

// Development Journey

// Commit History & Evolution
1. Initial layout (submission number 1): A basic Modiano grid structure with color divisions, processed in a mosaic style
2. Mosaic Optimization (Submission No. 2): Maintain the original grid structure and reduce the size of the mosaic.
3. Interactive Foundation (Submission No. 3): Implement a zooming system based on mouse operations.
4. Enhanced Interactivity (Submission No. 4): Keyboard control operations for troubleshooting/reset functions.

// Course Concepts Applied
- Object-Oriented Programmin: Segment class management (Week 7 tutorial)
- Interactive Design: Real-time user input processing
- Graphics Programming: Coordinate transformations, blending modes
- Algorithmic Art: Procedural texture generation

// Special Features

// Responsive Design
- Automatically adapts to different screen sizes
- Maintains proportional scaling across devices
- Preserves interactive functionality on touch devices (with mouse simulation)

// Performance Optimization
- Efficient segment rendering with transformation caching
- Texture pre-rendering in graphics buffers
- Minimal DOM manipulation for smooth animations

// Team Collaboration

// Coordination with Team Members
- Regular meetings to ensure diverse animation approaches
- Technical discussions on implementation strategies
- Cross-review sessions for quality assurance
- Documentation sharing for consistent project understanding

// My Unique Contribution
While my teammates were concentrating on the animations of time and audio, I developed a spatial-based interaction system, creating a unique and personalized experience for the audience through direct physical interaction.

Experience the fusion of classical modernism and contemporary interaction!

Load the project and let your cursor dance with Mondrian's geometry.
