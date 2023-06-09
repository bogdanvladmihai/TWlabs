const L = 9;

function read() {
  var answer = prompt("Alege un nume: ");
  return prompt("Alege X sau 0: ");
}

function initTalbe(table) {
  for (let i = 0; i < L; i++) {
    table[i] = '?';
  }
}

function print(table) {
  var answer = "";
  for (let i = 0; i < L / 3; i++) {
    answer += "| ";
    for (let j = 0; j < L / 3; j++) {
      if (table[i * 3 + j] == '?') {
        answer += String(i * 3 + j);
      } else {
        answer += table[i * 3 + j];
      }
      answer += " | ";
    }
    answer += "\n";
  }
  return answer;
}

function valid(pos) {
  if (pos >= 0 && pos < L && table[pos] == '?') {
    return true;
  }
  return false;
}

function won(table) {
  for (let i = 0; i < 3; i++) {
    validRow = true;
    for (let j = 0; j < 3; j++) {
      if (table[i * 3 + j] == table[i * 3] && table[i * 3 + j] != '?') {
        continue;
      }
      validRow = false;
    }
    if (validRow) {
      console.log("Linia " + String(i));
      return table[i * 3];
    }
    validCol = true;
    for (let j = 0; j < 3; j++) {
      if (table[i] == table[i + 3 * j] && table[i + 3 * j] != '?') {
        continue;
      }
      validCol = false;
    }
    if (validCol) {
      console.log("Coloana " + String(i));
      return table[i];
    }
  }

  if (table[0] == table[4] && table[4] == table[8] && table[0] != '?') {
    return table[0];
  }
  if (table[2] == table[4] && table[4] == table[6] && table[2] != '?') {
    return table[2];
  }

  return false;
}

function draw(table) {
  for (let i = 0; i < L; i++) {
    if (table[i] == '?') {
      return false;
    }
  }
  return true;
}

function makeRandomMove(table) {
  var possilbe = Array();
  for (let i = 0; i < L; i++) {
    if (table[i] == '?') {
      possilbe.push(i);
    }
  }
  return possilbe[Math.floor(Math.random() * (possilbe.length - 1))];
}

color = read();
other = (color == 'X' ? 'O' : 'X');

table = new Array(9);
initTalbe(table);

console.log(won(table));

if (color == 'O') {
  table[makeRandomMove()] = 'X';
}

while (!won(table) && !draw(table)) {
  var pos = Number.parseInt(prompt(print(table)));
  while (!valid(pos)) {
    alert("Mutare invalida, incearca din nou!");
  }
  table[pos] = color;
  oppPos = makeRandomMove(table);
  console.log(oppPos);
  table[oppPos] = other;
}

if (won(table, color)) {
  alert("Ai castigat!");
} else if (draw(table)) {
  alert("Remiza!");
} else {
  alert("Ai pierdut!");
}
