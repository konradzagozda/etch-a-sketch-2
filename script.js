const container = document.querySelector('.container');


let currentlyChecked = document.querySelector('input[name="mode"]:checked').value;
let size = 16;

for (let i = 0; i < size**2; i++) {
  let item = document.createElement('div');
  item.classList.add('item');
  container.appendChild(item);
}

function addBlack(e){
  e.target.style.backgroundColor = 'rgb(0,0,0)';
}

function addRandomColor(e){
  e.target.style.backgroundColor = getRandomColor();
}

function add10percentBlack(e){
  let color = window.getComputedStyle( e.target ).getPropertyValue('background-color');
  console.log(color);
  let regexp = /\d+/g;
  let array = [...color.matchAll(regexp)];
  array = array.map(x => x[0]);
  console.log(array);
  array = array.map(x => {
    if (+x >= 26){
      x = +x;
      x -= 26;
      return x;
    } else {
      x = 0;
      return x;
    }
    }
  )
  console.log(array);
  let string = `rgb(${array[0]}, ${array[1]}, ${array[2]})`
  e.target.style.backgroundColor = string;
}

let items = document.querySelectorAll('.item');

// Logic for mode
if (currentlyChecked === 'normal'){
    items.forEach(x => x.addEventListener('mouseover', addBlack));
} else if (currentlyChecked === 'random-color'){
  items.forEach(x => x.addEventListener('mouseover', addRandomColor));
} else if (currentlyChecked === 'add10percentBlack'){
  items.forEach(x => x.addEventListener('mouseover', add10percentBlack));
}


let button = document.querySelector('button');
button.addEventListener('click', reset);

function wrongInput(){
  let wrongInput = document.querySelector('#wrong-input');
  wrongInput.textContent = 'You have to use number';
  wrongInput.style.color = 'red';
}

function goodInput(){
  let wrongInput = document.querySelector('#wrong-input');
  wrongInput.innerHTML = '';
}

// What will happen if sb click reset button?
function reset() {
  let input = document.querySelector('#size').value;
  size = Math.round(+input);
  console.log(typeof size, size);
  if (isNaN(size) || size === 0) return wrongInput();
  else goodInput();
  let items = document.querySelectorAll('.item');
  items.forEach(x => x.classList.remove('black'));
  container.innerHTML = "";
  container.style.gridTemplateRows =`repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns =`repeat(${size}, 1fr)`;
  for (let i = 0; i < size**2; i++) {
    let item = document.createElement('div');
    item.classList.add('item');
    container.appendChild(item);
  }
  items = document.querySelectorAll('.item');
  items.forEach(x => x.addEventListener('mouseover', addBlack));
  document.querySelector('#current-size').textContent = `${size}`;
}

window.addEventListener('keydown', e => {
  if (e.keyCode === 13){
    reset();
  }
});



function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// add event listeners to mode inputs.
let inputs = document.querySelectorAll('.mode input');
inputs.forEach(x => x.addEventListener('click', changeBehaviour));

function changeBehaviour() {
  currentlyChecked = document.querySelector('input[name="mode"]:checked').value;
  items = document.querySelectorAll('.item');
  items.forEach(x => x.removeEventListener('mouseover', addBlack));
  items.forEach(x => x.removeEventListener('mouseover', addRandomColor));
  items.forEach(x => x.removeEventListener('mouseover', add10percentBlack));
  if (currentlyChecked === 'normal') {
    items.forEach(x => x.addEventListener('mouseover', addBlack));
  } else if (currentlyChecked === 'random-color'){
    items.forEach(x => x.addEventListener('mouseover', addRandomColor));
  } else if (currentlyChecked === 'add-10-black')new Promise(function(resolve, reject) {
    items.forEach(x => x.addEventListener('mouseover', add10percentBlack));
  });
}
