function drawTable(nrows, ncols) {
  table = document.createElement("table");
  table.id = "table";
  for (let i = 0; i < nrows; i++) {
    row = document.createElement("tr");
    for (let j = 0; j < ncols; j++) {
      cell = document.createElement("td");
      cell.classList.add("l" + i.toString());
      cell.classList.add("c" + j.toString());
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  var div = document.getElementById("container");
  div.appendChild(table);
}

function changeColor(target, color) {
  for (let i = 0; i < target.length; i++) {
    target[i].style.background = color;
  }
}

function colorCol(column, color) {
  var toChange = document.getElementsByClassName("c" + column.toString());
  changeColor(toChange, color);
}

function colorRow(row, color) {
  var toChange = document.getElementsByClassName("l" + row.toString());
  changeColor(toChange, color);
}

function rainbow(target) {
  let colors = ["rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(240, 240, 0)", "rgb(79, 220, 74)", "rgb(63, 218, 216)", "rgb(47, 201, 226)", "rgb(28, 127, 238)", "rgb(95, 21, 242)", "rgb(186, 12, 248)", "rgb(251, 7, 217)"];
  table = document.getElementById("table");
  if (target == false) {
    let N = table.childElementCount;
    let blockSize = N / colors.length;
    for (let i = 0; i < N; i++) {
      colorRow(i, colors[Math.floor(i / blockSize)]);
    }
  } else {
    let M = table.firstChild.childElementCount;
    let blockSize = M / colors.length;
    for (let i = 0; i < M; i++) {
      colorCol(i, colors[Math.floor(i / blockSize)]);
    }
  }
}

function getNthChild(element, n) {
  let childredn = element.childNodes;
  return childredn[n];
}

function drawPixel(row, col, color) {	
  table = document.getElementById("table");
  targetRow = getNthChild(table, row);
  target = getNthChild(targetRow, col);
  target.style.background = color;
}

function drawLine(r1, c1, r2, c2, color) {
  if (r1 != r2 && c1 != c2) {
    return;
  }
  if (r1 > r2) {
    [r1, r2] = [r2, r1];
  }
  if (c1 > c2) {
    [c1, c2] = [c2, c1];
  }
  let N = document.getElementById("table").childElementCount;
  let M = document.getElementById("table").firstChild.childElementCount;
  if (r1 < 0 || c1 < 0 || r1 >= N || c2 >= M) {
    return;
  }
  if (r1 == r2) {
    for (let i = c1; i <= c2; i++) {
      drawPixel(r1, i, color);
    }
  } else {
    for (let i = r1; i <= r2; i++) {
      drawPixel(i, c1, color);
    }
  }
}

function drawRect(r1, c1, r2, c2, color) {
  if (r1 > r2) {
    [r1, r2] = [r2, r1];
  }
  if (c1 > c2) {
    [c1, c2] = [c2, c1];
  }
  let N = document.getElementById("table").childElementCount;
  let M = document.getElementById("table").firstChild.childElementCount;
  if (r1 < 0 || c1 < 0 || r1 >= N || c2 >= M) {
    return;
  }
  for (let i = r1; i <= r2; i++) {
    drawLine(i, c1, i, c2, color);
  }
}

function appendTable(N, M) {
  table = document.getElementById("table");
  let oldN = table.childElementCount;
  let oldM = table.firstChild.childElementCount;
  for (let i = 0; i < Math.max(N, oldN); i++) {
    if (i >= oldN) {
      table.appendChild(document.createElement("tr"));
    }
    for (let j = 0; j < Math.max(M, oldM); j++) {
      if (j >= oldM || i >= oldN) {
        cell = document.createElement("td");
        cell.classList.add("l" + i.toString());
        cell.classList.add("c" + j.toString());
        getNthChild(table, i).appendChild(cell);
      }
    }
  }
}

function drawPixelExt(row, col, color) {
  let table = document.getElementById("table");
  let change = false;
  let N = table.childElementCount;
  if (row >= N) {
    change = true;
    N = row + 1;
  }
  let M = table.firstChild.childElementCount;
  if (col >= M) {
    change = true;
    M = col + 1;
  }
  appendTable(N, M);
  drawPixel(row, col, color);
}

function colorMixer(colorA, colorB, amount){
  let cA = colorA * (1 - amount);
  let cB = colorB * (amount);
  return parseInt(cA + cB);
}

function drawPixelAmount(row, col, color, amount) {
  table = document.getElementById("table");
  let oldColor = getComputedStyle(getNthChild(getNthChild(table, row), col));
  let oldRGBValues = oldColor.background.match(/\d+/g);
  let newRGBValues = color.match(/\d+/g);
  let finalColor = "rgb(";
  for (let i = 0; i < newRGBValues.length; i++) {
    if (i > 0) {
      finalColor += ",";
    }
    finalColor += colorMixer(oldRGBValues[i], newRGBValues[i], amount).toString();
  }
  finalColor += ")";
  drawPixel(row, col, finalColor);
}

function updateClasses() {
  let table = document.getElementById("table");
  let N = table.childElementCount, M = table.firstChild.childElementCount;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      cell = getNthChild(getNthChild(table, i), j);
      cell.className = "";
      cell.classList.add("l" + i.toString());
      cell.classList.add("c" + j.toString());
    }
  } 
}

function delRow(row) {
  let table = document.getElementById("table");
  target = getNthChild(table, row);
  table.removeChild(target);
  updateClasses();
}

function delCol(col) {
  let table = document.getElementById("table");
  let N = table.childElementCount;
  for (let i = 0; i < N; i++) {
    target = getNthChild(getNthChild(table, i), col);
    getNthChild(table, i).removeChild(target);
  }
  updateClasses();
}

function shiftRow(row, pos) {
  let table = document.getElementById("table");
  let M = table.firstChild.childElementCount;
  target = getNthChild(table, row);
  let tmp = []
  for (let i = M - pos; i < M; i++) {
    tmp.push(getComputedStyle(getNthChild(target, i)).background);
  }
  for (let i = 0; i < M - pos; i++) {
    let color = getComputedStyle(getNthChild(target, i)).background;
    getNthChild(target, i + pos).style.background = color;
  }
  for (let i = 0; i < pos; i++) {
    getNthChild(target, i).style.background = tmp[i];
  }
  updateClasses();
}

function jumble() {
  let table = document.getElementById("table");
  let M = table.firstChild.childElementCount, N = table.childElementCount;
  for (let i = 0; i < N; i++) {
    shiftRow(i, Math.floor(Math.random() * M));
  }
}

function transpose() {

}

function flip(element) {

}

function mirror() {

}

function smear(row, col, amount) {

}


window.onload = function(){
  const rows = 30;
  const cols = 30;	
  
  drawTable(rows, cols);
  colorRow(1, "red");
  colorCol(3, "blue");
  rainbow(false);
  rainbow(true);
  drawPixel(1, 1, "blue");
  drawLine(3, 10, 1, 10, "blue");
  drawLine(10, 0, 10, 13, "yellow");
  drawLine(1, 3, 1, 324, "blue");
  drawRect(1, 2, 10, 12, "red");
  drawPixelExt(35, 35, "red");
  
  drawPixelAmount(32, 12, "rgb(3,3,3)", 0.5);

  delRow(32);
  delCol(1);
  delCol(33);
  delCol(33);
  delCol(2);
  shiftRow(12, 5);
  jumble();
}