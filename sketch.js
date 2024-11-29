var Q = [];

function setup() {
  createCanvas(400, 400);
  // Create a circle
  let r = 45;
  let circleCenter = [randomIntFromInterval(50, width - 50), randomIntFromInterval(50, height - 50)];
  console.log("C = " + circleCenter[0] + "," + circleCenter[1]);


  // make two opposite corners. These need to be outside the circle by a bit
  Q[0] = [circleCenter[0] + 1.5 * r, circleCenter[1] + 1 * r];
  console.log("Q[0] = [" + Q[0][0] + "," + Q[0][1] + "]");

  Q[1] = [circleCenter[0] - 1.5 * r, circleCenter[1] - 1 * r];
  console.log("Q[1] = [" + Q[1][0] + "," + Q[1][1] + "]");

  let A = Q[0], C = Q[1]
  // Create a circle


  //Create 2 tangent vectors to a circle


  background(220);
  translate(0, height);
  scale(1, -1);
  noFill();
  circle(circleCenter[0], circleCenter[1], r * 2); //the main circle
  fill("black");
  circle(A[0], A[1], 7); //one of the 2 points
  writeText("A", A[0] + 5, A[1]);
  circle(C[0], C[1], 7); //the other of the 2 points
  writeText("C", C[0] + 5, C[1] - 10);

  let arr = circleTangents(circleCenter, A, r)
  let P = arr[0];
  let v = arr[1];
  let P1 = arr[2];
  let v1 = arr[3];
  fill("red")
  circle(P[0], P[1], 3);
  circle(P1[0], P1[1], 3);

  let arr1 = circleTangents(circleCenter, C, r)
  let P2 = arr1[0];
  let v2 = arr1[1];
  let P3 = arr1[2];
  let v3 = arr1[3];

  circle(P2[0], P2[1], 3);
  circle(P3[0], P3[1], 3);

  let pt = AplusdV(A, v);
  //line(A[0], A[1], pt[0], pt[1]);
  let pt1 = AplusdV(A, v1);
  //line(A[0], A[1], pt1[0], pt1[1]);
  let pt2 = AplusdV(C, v2);
  //line(C[0], C[1], pt2[0], pt2[1]);
  let pt3 = AplusdV(C, v3);
  //line(C[0], C[1], pt3[0], pt3[1]);

  let D = intersectionPoint(A, v, C, v3);
  let B = intersectionPoint(A,v1,C,v2);
  fill("black");
  circle(B[0],B[1],7);
  circle(D[0],D[1],7);

  line(A[0],A[1],B[0],B[1]);
  line(B[0],B[1],C[0],C[1]);
  line(C[0],C[1],D[0],D[1]);
  line(D[0],D[1],A[0],A[1]);
}



