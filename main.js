let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let rotate = document.getElementById('hue-rotate');

let img = document.getElementById('img');
let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.getElementById('reset');
let box = document.getElementsByClassName('img-box')[0];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// reset button
function resetV(){
  img.style.filter = 'none';
  saturate.value = '100';
  contrast.value = '100';
  brightness.value = '100';
  sepia.value = '0';
  grayscale.value = '0';
  blur.value = '0';
  rotate.value = '0';
}

// set the default values
window.onload = function(){
  download.style.display = 'none';
  reset.style.display = 'none';
  box.style.display = 'none';
}

// set the default values on loading an image
upload.onchange = function(){
  resetV();
  download.style.display = 'block';
  reset.style.display = 'block';
  box.style.display = 'block';
  // read the image in the image box
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function(){
    img.src = file.result;
  }
  // set the values for canvas
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    img.style.display = 'none';
  }
}

// make the filters and save it for canvas
let filters = document.querySelectorAll('ul li input');
filters.forEach(filter=>{
  filter.addEventListener("input", function(){
    ctx.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayscale.value})
      blur(${blur.value}px)
      hue-rotate(${rotate.value}deg)
    `;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
  });
});

// download the canvas
download.onclick = function(){
  download.href = canvas.toDataURL();
}
