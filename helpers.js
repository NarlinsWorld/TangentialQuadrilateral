function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// function pointMover(){
//     push();
//     for(let i=0; i<pts.length; i++){
//       let x1 = pts[i][0];
//       let y1 = pts[i][1];
//       let d = dist(x1, y1, mouseX, height-mouseY);
//       if(d<10){pts[i]=[mouseX, height-mouseY]};
//       document.getElementById("overCNV").innerHTML="["+mouseX+", "+(height-mouseY)+"]";
//     }
//     pop();
//   }

function makeTwoOppositeCorners() {
    push()
    translate(0, height);
    scale(1, -1);
    background(220);
    Q = [];
    // Lower Left
    Q.push([randomIntFromInterval(0, width / 2), randomIntFromInterval(0, height / 2)]);  
    //Upper Right
    Q.push([randomIntFromInterval(width / 2, width / 2), randomIntFromInterval(height / 2, height)]);
    for (let i = 0; i < Q.length; i++) {
        console.log("Q[" + i + "]= " + Q[i]);
    }

    //showPts();
    pop();
}

function writeIndexNumber(i) {
    //now write the pt number beside the pt.
    push();
    translate(Q[i][0] + 5, Q[i][1] + 5);
    rotate(radians(180));
    scale(-1, 1);
    text(i, 0, 0);
    //text("ROTATE ME", 0,0);
    pop();
}

function writeText(Text,xpos,ypos) {
    //now write the pt number beside the pt.
    push();
    translate(xpos, ypos);
    rotate(radians(180));
    scale(-1, 1);
    text(Text, 0, 0);
    //text("ROTATE ME", 0,0);
    pop();
}

function showPts() {
    push();
    translate(0, height);
    scale(1, -1);
    for (let i = 0; i < 4; i++) {
        circle(Q[i][0], Q[i][1], 10);
        writeIndexNumber(i);
    }
    pop();
}

function rightOrLeft(Ap, Bp, Pp) {
    //A is the startingPoint of line AB
    //B is the endPoint of line AB
    //P is an arbitrary Point in the plane
    // return LEFT if P is to the left of the line, else return right
    let u = [Bp[0] - Ap[0], Bp[1] - Ap[1]];
    let v = [Pp[0] - Ap[0], Pp[1] - Ap[1]];
    let det = u[0] * v[1] - u[1] * v[0];
    if (det > 0) {
        return "LEFT";
    }
    return "RIGHT";
}

function is_convex_polygon(polygon) {
    //Return True if the polynomial defined by the sequence of 2D points is 'strictly convex': points are valid, side lengths non-zero, interior angles are strictly between zero and a straight angle, and the polygon does not intersect itself.

    //Start at any point. Make a line to the next point.
    //The 3rd point must turn either left or right.
    //The 4th point must turn the same direction.
    //The 1st point done again, must turn the same direction.

    let dir = rightOrLeft(Q[0], Q[1], Q[2]) //0-1 to 2 has turn "dir"
    //console.log(dir);
    let dirpt3 = rightOrLeft(Q[1], Q[2], Q[3]); //1-2 to 3 has turn dirpt3
    //console.log(dirpt3);
    let dirpt0 = rightOrLeft(Q[2], Q[3], Q[0]); // last turn back to start
    //console.log(dirpt0);
    let dirpt4 = rightOrLeft(Q[3], Q[0], Q[1]);
    //console.log(dirpt4);

    if ((dir === dirpt3) && (dir === dirpt0) && (dirpt3 === dirpt0) && (dirpt4 === dir)) {
        return true;
    } else {
        // console.log("dir =", dir);
        // console.log("dirpt3 =", dirpt3);
        // console.log("dirpt0 =", dirpt0);
        // console.log("dirpt4 = ",dirpt4);
        return false;
    }

} // end function





//a and b are two vectors. return the angle bisector vector
// return vector w that exactly bisects vectors a and b
function angleBisector(a, b) {
    //a*b = |a|*|b|*cos(theta)
    let cos_t = (unitVec(a)[0] * unitVec(b)[0] + unitVec(a)[1] * unitVec(b)[1]);
    console.log("cos_t = ", cos_t);

    let ang = Math.acos(cos_t); // the angle in radians between vectors a & b
    console.log("theta=" + ang)
    let phi = ang / 2;// radians added to "a" for bisection
    let e_1 = unitVec(a);
    let e_2 = unitVec([-a[1],a[0]]);
    console.log('e1= '+e_1+" e_2= "+e_2);
    let u_1 = [Math.cos(phi)*e_1[0], Math.cos(phi)*e_1[1]]; //cos(phi)*e_1
    let v_1 = [Math.sin(phi)*e_2[0], Math.sin(phi)*e_2[1]]; //sin(phi)*e_2
    let w_1 = [u_1[0]+v_1[0], u_1[1]+v_1[1]];
    return w_1;
}




function absoluteValue(v){
    return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
  }

  function unitVec(v){
    return [v[0]/absoluteValue(v), v[1]/absoluteValue(v)]
  }

/*
function to return a point that is just beyond the edge of the screen.
The returned edgepoint permits the construction of a line that goes from A in the direction of vector v and proceeding offscreen.
*/
function AplusdV(A, v) {
    let u = unitVec(v);
    let d = Math.sqrt(2) * max(width, height);
    let edgePoint = [A[0] + d * u[0], A[1] + d * u[1]];
    return edgePoint;
  }


/*
Before calling this algorithm, you must already know that the lines presented do in fact intersect !!!!!!!!!
And that they DO NOT OVERLAP.
Two lines are given in vector notation.  The first line includes point P and direction vector u. Its equation is (x,y)=P+t*u
The 2nd line has point Q and direction vector v.  Its equation is
(x,y)=Q+s*v. uperp = (-y(u), x(u)). In vector notation, the intersecction is given by
X = Q + ((P-Q)*uperp)/(v*uperp) * v.
 
Every symbol in that equation is either a point [x,y] or a vector [x,y].
 
Test Data: P = [53,152]; u = [38,35]; uperp = [-35, 38];
          Q = [247,379]; v = [15,30];
answer:     X = [202.22, 289.44]
          
*/
function intersectionPoint(P, u, Q, v) {
    let Px = P[0];
    let Py = P[1];
    let Qx = Q[0];
    let Qy = Q[1];
    let ux = u[0];
    let uy = u[1];
    let vx = v[0];
    let vy = v[1];
  
    let num = (Px - Qx) * -uy + (Py - Qy) * ux;
    let den = vx * -uy + vy * ux;
    let x = Qx + (num / den) * vx;
    let y = Qy + (num / den) * vy;
    return [x, y];
  }

  //P is a point not on a line
//C and u define the line in parametric form
//We return E, the perpendicular intersection from P to the line.
function perpFrom_P_to_aLine(P,C,u){
    let uperp = [-u[1],u[0]];
    let paren = [C[0]-P[0] , C[1]-P[1]];
    console.log("uperp= ["+uperp[0]+"," + uperp[1]+"]");
    console.log("P= ["+P[0]+","+P[1]+"]");
    console.log("C= ["+C[0]+","+C[1]+"]");
  
    console.log("paren= ["+paren[0]+","+paren[1]+"]");
    //dot paren and uperp
    let numerator = paren[0]*uperp[0]+paren[1]*uperp[1]; //a scaler
    let denom = uperp[0]*uperp[0]+uperp[1]*uperp[1]; //a scaler
  
    let term = numerator/denom; //still a scaler
    console.log("term=",term);
    let rightSide = [term*uperp[0],term*uperp[1]];
    let E = [P[0]+rightSide[0],P[1]+rightSide[1]];
    console.log("E=",E);
    return E;
  }

  /* Function to return the 2 tangent points drawn to
a circle from an external point 
C is circle center
A is external point
r is circle radius
*/

function circleTangents(C, A, r) {
  //construct vect u = C-A
  let u = [C[0] - A[0], C[1] - A[1]];
  let hyp = absoluteValue(u); //length of the hypotenuse.
  let d = Math.sqrt(hyp * hyp - r * r);
  let alpha = Math.atan(r / d);
  let e1 = unitVec(u);
  let e2 = unitVec([-u[1], u[0]]);
  let e3 = unitVec([u[1], -u[0]]); //switch up and down
  let v = [Math.cos(alpha) * e1[0] + Math.sin(alpha) * e2[0], Math.cos(alpha) * e1[1] + Math.sin(alpha) * e2[1]];
  let v1 = [Math.cos(alpha) * e1[0] + Math.sin(alpha) * e3[0], Math.cos(alpha) * e1[1] + Math.sin(alpha) * e3[1]];
  let P = [A[0] + d * v[0], A[1] + d * v[1]];
  let P1 = [A[0] + d * v1[0], A[1] + d * v1[1]];
  return [P, v, P1, v1]
}



