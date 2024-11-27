var Q = [];

function setup() {
  createCanvas(400, 400);
  //get a convex polygon
  let convex = false;
  while(!convex){ //create a random convex quadrilateral
    makeFirstQuad();
    //debug data
    // Q[0] = [122,65];
    // Q[1] = [358,12];
    // Q[2] = [200,396];
    // Q[3] = [100,391];
    convex = is_convex_polygon(Q);
  } //end creation of a convex quadrilateral



  let A = Q[0], B=Q[1], D=Q[3]; //the 1st 3 points
  let F = Q[2]; //this point will change.

  //Bisect the angle at point A of the quadrilateral
  let a = [B[0]-A[0],B[1]-A[1]] //vector from A to B
  let b = [D[0]-A[0],D[1]-A[1]] //vector from A to C
  let vb = angleBisector(a,b); //bisection vector at point A
  console.log("a=",a,"  b=",b);
  console.log("v=",vb);
  
  console.log(A[0],A[1],A[0] +1.414*100*vb[0],A[1]+1.414*100*vb[1]);

  background(220);
  showPts();
  translate(0,height);
  scale(1,-1);
  //draw lines from A to B and A to C
  line(A[0],A[1],B[0],B[1]);
  line(A[0],A[1],D[0],D[1]);
  stroke("orange");
  line(A[0],A[1],A[0] + 1.414*200*vb[0], A[1]+1.414*200*vb[1]); //shows Bisector line
  //bisect the angle at A.
  stroke("black");
 //end bisection at point A. Vector "vb" is the unitVector bisector.

 //Bisect the angle at point D of the quadrilateral
 let a1 = [A[0]-D[0],A[1]-D[1]] //vector from D to A
 let b1 = [F[0]-D[0],F[1]-D[1]] //vector from D to F
 let vb1 = angleBisector(a1,b1); //bisection vector at point D
 
  line(D[0],D[1],F[0],F[1])
  stroke("orange");
  line(D[0],D[1],D[0] + 1.414*200*vb1[0], D[1]+1.414*200*vb1[1]);

  //intersect vectors vb and vb1
  let circleCenter = intersectionPoint(A,vb,D,vb1);
  circle(circleCenter[0],circleCenter[1],5);
  console.log("circle center=" + circleCenter);
console.log("------------------------")
 let E = perpFrom_P_to_aLine(circleCenter,A,a); //P,C,u
  //circle(E[0],E[1],10);
  let radius = absoluteValue([E[0]-circleCenter[0],E[1]-circleCenter[1]]);
  noFill();
  circle(circleCenter[0],circleCenter[1],radius*2);
}



