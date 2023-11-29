let clickSpot = {};
let goBack = {
  lx: 0,
  rx: 50,
  ty: 550,
  by: 600
}
let myFont;

let oneSkyColor;
let oneSunY = 300;
let oneFirstCloudX = -150;
let oneFirstCloudX2 = 150;
let oneSecCloudX = 150;
let oneSecCloudX2 = 250;

let twoVineColor;
let twoLeafY=300;
let twoLeafRotate=85;

let threePetalSize=90;
let threePetalWidth=45;
let threePetalY=12;

let fourFireOne;
let fourFireTwo;
let fourFireSize=150;
let fourFireTint=255;
let fourFireX=-80;
let fourFireY=-75;

let fiveStarD=10;

let sevenLeafRotate=30;
let sevenLeafTwoRotate=-25;
let sevenStemY=-125;
let sevenFlowerY=-70;
let sevenPetalY=-60;

let animationTimer;

let currentPage = 0;

let transitioning = false; //sad :(
let transitionTimer=0;

let rectFade;
let fadingIn=false;
let fadingOut=false;

function preload() {
  myFont = loadFont("ShadowsIntoLight-Regular.ttf");
  /*
  fourFireOne = loadImage("../images/fourFireOne.png");
  fourFireTwo = loadImage("../images/fourFireTwo.png");
  */
 fourFireOne = loadImage("images/fireOne.svg");
 fourFireTwo = loadImage("images/fireTwo.svg");
}

function setup() {
  createCanvas(windowWidth-100, 600).parent("p5-canvas");
  clickSpot = {
      lx: (width/2)-75,
      rx: (width/2)+75,
      ty: 225,
      by: 375
  }
  rectFade=0;
  animationTimer=0;
  textAlign(CENTER);
  textSize(24);
  textFont(myFont);
  angleMode(DEGREES);
  oneSkyColor = color(178, 228, 254);
  twoVineColor = color(38, 100, 78);
}

function draw() {
  // wanted to avoid a million if statements but since switch only runs once it messed up the transitions and animations

  // PAGE 0
  if (currentPage === 0) {
    background(200);
    noStroke();
    fill(0);
    text("click in center\nto advance", width/2, height/2);
    if (transitioning) {
      text("loading...", width/2, 500);
    }
  }

  // PAGE 1
  if (currentPage === 1) {
    background(oneSkyColor);
    noStroke();
    // top cloud
    fill(255);
    oneFirstCloudX++;
    circle(oneFirstCloudX, 100, 75);
    circle(oneFirstCloudX+50, 105, 50);
    fill(oneSkyColor);
    rect(oneFirstCloudX-40, 108, oneFirstCloudX2, 115);
    if (oneFirstCloudX > width+150) {
      oneFirstCloudX = -50;
    }
    // bottom cloud
    fill(255);
    oneSecCloudX++;
    circle(oneSecCloudX, 500, 100);
    circle(oneSecCloudX-75, 500, 75);
    fill(oneSkyColor);
    rect(oneSecCloudX-125, 515, oneSecCloudX2, 530);
    if (oneSecCloudX > width+400) {
      oneSecCloudX = -200;
    }
    //sun
    fill(255, 253, 161);
    circle(width/2, oneSunY, 150); // "why is the sun above the clouds" the rectangles blot out the sun
    // text
    fill(0);
    text("i am no longer simply icarus", 175, 75);
    text("i am apollo", width/2, height/2+4);
    text("i am the sun", width-150, 525);
    if (!transitioning) {
      oneSunY = 300;
    }
    if (transitioning) {
      oneSunY++;
    }
  }

  // PAGE 2
  if (currentPage === 2) {
    noStroke();
    background(235, 249, 220);
    noFill();
    stroke(twoVineColor);
    strokeWeight(25);
    // vines
    beginShape();
    vertex(0, 150);
    bezierVertex(200, 140, 100, 60, 300, -25); // i am not going to pretend i fully understand beziervertex coordinates. i just got lucky with the tutorial coordinates working out for what i wanted.
    endShape();
    // bottom vine
    beginShape();
    vertex(width-250, 615);
    bezierVertex(width-150, 500, width-75, 575, width+10, 400);
    endShape();
    // leaves
    push();
    animationTimer++;
    if (animationTimer>60) {
      rotate(0.5); // this looks really bad on the bottom leaves but i am tired.
    }
    if (animationTimer===120) {
      animationTimer=0;
    }
    noStroke();
    fill(twoVineColor);
    // leaves for real
    push();
    translate(150, 150);
    rotate(15);
    ellipse(0, 0, 60, 25);
    pop();
    push();
    translate(170, 125);
    rotate(1);
    ellipse(0, 0, 60, 25);
    pop();
    // bottom
    push();
    translate(width-170, 520);
    rotate(-45);
    ellipse(0, 0, 60, 25);
    pop();
    push();
    translate(width-210, 530);
    rotate(-80);
    ellipse(0, 0, 60, 25);
    pop();
    pop();
     // i would just like to mention that i spent about three hours trying to position these leaves because i did not realize that translate will change the rotate origin as well as the shape and ended up with absolutely ridiculous calculations for coordinates because they were all being rotated by the top left corner. i would not describe my experience as fun.
    push();
    translate(width/2-20, twoLeafY);
    rotate(twoLeafRotate);
    if (!transitioning) {
      twoLeafY=300;
      twoLeafRotate=85;
    }
    if (transitioning) {
      twoLeafRotate--;
      twoLeafY++;
    } // "casey aren't you about to reuse this code for the literal next transition??" yes i am! :)
    ellipse(0, 0, 50, 15);
    pop();
    push();
    translate(width/2+5, 305);
    rotate(120);
    ellipse(0, 0, 40, 7);
    pop();
    // FINALLY the text
    noStroke();
    fill(0);
    if (windowWidth>501) {
      text("and though my implosion was dated\nfor a billion years in the future", 400, 50);
      text("i appear to have discovered time travel\nby my own mistakes", width-250, 440);
    }
    if (windowWidth<501) {
      text("and though my implosion was dated\nfor a billion years in the future", width/2, 200);
      text("i appear to have discovered time travel\nby my own mistakes", width/2, 400);
    }
  }

  // PAGE 3
  if (currentPage===3) {
    background(240, 233, 243);
    push();
    translate(width/2, 300);
    fill(129, 198, 225);
    if (!transitioning) { //don't exactly feel like making it so the falling petal doesn't go bonkers but the rest keep wiggling
      animationTimer++;
      if (animationTimer>60) {
        rotate(3);
      }
      if (animationTimer===120) {
        animationTimer=0;
      }
    }
    //top petal
    push();
    translate(0, -25);
    rotate(70);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    push();
    translate(0, -25);
    rotate(110);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    //top left
    push();
    translate(-25, -12);
    rotate(45);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    push();
    translate(-25, -12);
    rotate(5);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    //top right
    push();
    translate(25, -12);
    rotate(135);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    push();
    translate(25, -12);
    rotate(175);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    //bottom left
    push();
    translate(-15, 12);
    rotate(-40);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    push();
    translate(-15, 12);
    rotate(-80);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    //bottom right
    if (!transitioning) {
      threePetalY=12;
    }
    if (transitioning) {
      threePetalY++;
    }
    push();
    translate(15, threePetalY);
    rotate(220);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    push();
    translate(15, threePetalY);
    rotate(260);
    ellipse(0, 0, threePetalSize, threePetalWidth);
    pop();
    fill(255, 250, 173);
    circle(0, -2, 25);
    pop();
    // goodnight.gif
    fill(0);
    text("and i am watching", 120, 50);
    text("myself", width/2, 325);
    text("fall apart", width-100, 550);
  }
  
  // PAGE 4
  if (currentPage===4) {
    background(255, 211, 185);
    fill(0);
    text("and i am using the last of my energy", 200, 50);
    text("to burn in frustration", width-150, 550);
    animationTimer++;
    tint(255, 211, 185, fourFireTint);
    push();
    translate(fourFireX, fourFireY)
    if (animationTimer<=60) {
      image(fourFireOne, width/2, height/2);
    }
    if (animationTimer>60) {
      image(fourFireTwo, width/2, height/2);
    }
    if (animationTimer===120) {
      animationTimer=0;
    }
    if (!transitioning) {
      fourFireSize=150;
      fourFireOne.resize(0, fourFireSize);
      fourFireTwo.resize(0, fourFireSize);
      fourFireTint=255;
      fourFireX=-80;
      fourFireY=-75;
    }
    if (transitioning) {
      fourFireX=fourFireX+0.5;
      fourFireY=fourFireY+0.5;
      fourFireOne.resize(0, fourFireSize); //the svgs blur but apparently p5 is just like that
      fourFireTwo.resize(0, fourFireSize);
      fourFireSize=fourFireSize-0.5;
      fourFireTint--;
    }
    pop();
    // 153x150, 160x150
    /*noFill();
    stroke(155, 0, 0);
    strokeWeight(5);*/
    /*point(width/2, 350);
    point(width/2-90, 300);
    point(width/2-50, 250);
    point(width/2-52, 275);
    point(width/2, 290);
    point(width/2-10, 260);
    point(width/2+5, 240);
    point(width/2+50, 200);
    point(width/2+90, 300);
    strokeWeight(1);
    beginShape(); //AND SO OUR GUESSING GAME BEGINS
    //update: i gave up and made an asset in illustrator. i included my friends playing connect-the-dots in the images folder to make up for it.
    endShape(); */
    /*beginShape();
    vertex(width/2, 350);
    bezierVertex(width/2-100, 375, width/2-100, 300, width/2-52, 275);
    endShape(); */
  }

  // PAGE 5
  if (currentPage===5) {
    background(0);
    fill(255);
    text("and i am but a blip of dim light", 175, 50);
    text("in the endless confines of the universe", width-200, 555);
    if (!transitioning) {
      animationTimer++;
      if (animationTimer>60) {
        fiveStarD=13;
      }
      if (animationTimer===120) {
        fiveStarD=10;
        animationTimer=0;
      }
    }
    if (transitioning) {
      fiveStarD=fiveStarD-0.1;
      if (fiveStarD<0) {
        fiveStarD=0;
      }
    }
    circle(width/2, height/2, fiveStarD);
  }

  // PAGE 6
  if (currentPage===6) {
    background(187, 246, 237);
    fill(0);
    text("and i am", 75, 50);
    text("decidedly", width/2, 275);
    text("not doing fine.", width-100, 550);
    fill(59, 145, 102);
    push();
    translate(width/2, height/2);
    push();
    rotate(180);
    arc(0, -10, 200, 25, 0, 180, OPEN);
    pop();
    push();
    animationTimer++;
    if (animationTimer>60) {
      rotate(3);
    }
    if (animationTimer===120) {
      animationTimer=0;
    }
    push();
    rotate(45);
    arc(0, -5, 30, 10, 0, 180, PIE);
    pop();
    push();
    rotate(-30);
    arc(0, -3, 30, 10, 0, 180, PIE);
    pop();
    pop();
    pop(); //stacking push/pop like stacking divs in html
    // no transition animation because that would actually kill me
  }

  // PAGE 7
  if (currentPage===7) {
    background(184, 223, 217);
    push(); //start translate
    animationTimer++;
    if (animationTimer>60) {
      sevenLeafRotate=27;
      sevenLeafTwoRotate=-22;
      sevenStemY=-120;
      sevenFlowerY=-67;
      sevenPetalY=-57;
    } else {
      sevenLeafRotate=30;
      sevenLeafTwoRotate=-25;
      sevenStemY=-125;
      sevenFlowerY=-70;
      sevenPetalY=-60;
    }
    if (animationTimer===120) {
      animationTimer=0;
    }
    fill(59, 145, 102);
    translate(width/2, height/2);
    push();
    rotate(180);
    arc(0, -10, 200, 25, 0, 180, OPEN);
    pop();
    //leaves
    push();
    rotate(sevenLeafRotate);
    ellipse(-50, -10, 100, 50);
    pop();
    push();
    rotate(sevenLeafTwoRotate);
    ellipse(30, -10, 80, 40);
    pop();
    // stem
    push();
    noFill();
    stroke(59, 145, 102);
    strokeWeight(7);
    beginShape();
    vertex(0, 0);
    bezierVertex(-20, -100, 80, sevenStemY, 75, -80);
    endShape();
    pop();
    //flower
    noStroke();
    fill(255);
    circle(75, sevenFlowerY, 25);
    circle(75, sevenPetalY, 10);
    circle(67, sevenPetalY, 10);
    circle(83, sevenPetalY, 10);
    pop(); //end translate
    fill(0, 150);
    text("end", width/2, 450);
  }

  if (currentPage>7) {
    currentPage=7;
  }



  // TRANSITIONS
  if (transitioning) {
    transitionTimer++;
  }

  if (transitionTimer===140) {
    fadingIn=true;
  }

  if (fadingIn) {
    rectFade=rectFade+5;
    if (rectFade === 255) {
      fadingIn=false;
      transitioning=false;
      transitionTimer=0;
      currentPage = currentPage + 1;
      fadingOut=true;
    }
  }
  if (fadingOut) {
    rectFade=rectFade-5;
    console.log(rectFade);
    if (rectFade===0) {
      fadingOut=false;
    }
  }

  noStroke();
  fill(0, rectFade);
  rect(0, 0, width, height);

}

function windowResized() {
  resizeCanvas(windowWidth-100, 600);
  clickSpot = {
    lx: (width/2)-75,
    rx: (width/2)+75,
    ty: 225,
    by: 375
}
}

function mousePressed() {
  if (mouseX >= clickSpot.lx && mouseX <= clickSpot.rx && mouseY >= clickSpot.ty && mouseY <= clickSpot.by) {
    console.log("it is clicked");
    if (currentPage<7) {
      transitioning=true;
    }
  }
  if (mouseX >= goBack.lx && mouseX <= goBack.rx && mouseY >= goBack.ty && mouseY <= goBack.by) {
    console.log("go back");
    currentPage = currentPage - 1;
    //the animations dont reset but i am tired so consider this just an emergency "wait i missed the text"
  }
}