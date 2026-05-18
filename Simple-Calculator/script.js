let cur = '0';   // Current number on display
let expr = '';   // Expression shown above display
let op = null;   // Current operator
let prev = null; // Previous number
let fresh = false; // Whether next input starts fresh

// Update the display
function disp() {
  document.getElementById('result').textContent = cur;
  document.getElementById('expr').textContent = expr;
}

// Input a number
function inputNum(n) {
  if (fresh) {
    cur = n;
    fresh = false;
  } else {
    cur = cur === '0' ? n : cur + n;
  }
  disp();
}

// Input a decimal point
function inputDot() {
  if (fresh) {
    cur = '0.';
    fresh = false;
  } else if (!cur.includes('.')) {
    cur += '.';
  }
  disp();
}

// Input an operator (+, -, *, /)
function inputOp(o) {
  if (op && !fresh) {
    prev = eval(prev + op + cur);
    cur = String(prev);
  } else {
    prev = parseFloat(cur);
  }
  op = o;
  const sym = { '*': '×', '/': '÷', '+': '+', '-': '−' }[o];
  expr = cur + ' ' + sym;
  fresh = true;
  disp();
}

// Calculate the result
function calculate() {
  if (!op || prev === null) return;
  const res = eval(prev + op + cur);
  const sym = { '*': '×', '/': '÷', '+': '+', '-': '−' }[op];
  expr = prev + ' ' + sym + ' ' + cur + ' =';
  cur = String(parseFloat(res.toFixed(10)));
  op = null;
  prev = null;
  fresh = true;
  disp();
}

// Clear everything
function clearAll() {
  cur = '0';
  expr = '';
  op = null;
  prev = null;
  fresh = false;
  disp();
}

// Toggle positive/negative
function toggleSign() {
  cur = String(parseFloat(cur) * -1);
  disp();
}

// Convert to percentage
function percent() {
  cur = String(parseFloat(cur) / 100);
  disp();
}
