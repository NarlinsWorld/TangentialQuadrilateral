var Q = [];
var circleCenter = [200,200];
let r = 45;
let A = [circleCenter[0] + 1.5 * r, circleCenter[1] + 1 * r];
//console.log("Q[0] = [" + Q[0][0] + "," + Q[0][1] + "]");
let C = [circleCenter[0] - 1.5 * r, circleCenter[1] - 1 * r];
//console.log("Q[1] = [" + Q[1][0] + "," + Q[1][1] + "]");

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  r=this.value;
}

function setup() {
  let canv = createCanvas(400, 400);
  canv.parent("CNV");
  document.getElementById("instructions").innerHTML = "Use the mouse to drag points A or C until you get the quadrilateral desired."
  // Create a circle 

  console.log("Center = " + circleCenter[0] + "," + circleCenter[1]);
  console.log("A = "+A);
  console.log("C = "+C);
  document.getElementById("overCNV").innerHTML="["+mouseX+", "+(height-mouseY)+"]";
}

function draw() {
  background(220);
  translate(0, height);
  scale(1, -1);

  if (mouseIsPressed) {
    push();
    let x1 = A[0];
    let y1 = A[1];
    let d = dist(x1, y1, mouseX, height - mouseY);
    if (d < 10) { A = [mouseX, height - mouseY] };

    let x2 = C[0];
    let y2 = C[1];
    let d2 = dist(x2, y2, mouseX, height - mouseY);
    if (d2 < 10) { C = [mouseX, height - mouseY] };
    let mx = Math.floor(mouseX*100)/100;
    let my = Math.floor(Math.floor(height-mouseY)*100)/100;
    document.getElementById("overCNV").innerHTML="["+mx+", "+(my)+"]";
    pop();
  }
  TQ(circleCenter, r, A, C);
}

// function pointMover() {
//   push();
//   for (let i = 0; i < pts.length; i++) {
//     let x1 = pts[i][0];
//     let y1 = pts[i][1];
//     let d = dist(x1, y1, mouseX, height - mouseY);
//     if (d < 10) { pts[i] = [mouseX, height - mouseY] };
//     document.getElementById("overCNV").innerHTML = "[" + mouseX + ", " + (height - mouseY) + "]";
//   }
//   pop();
// }
