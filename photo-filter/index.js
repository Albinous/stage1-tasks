const fileInput = document.querySelector('input[type="file"]');
const inputs = document.querySelectorAll('input[type="range"]');
const btnReset = document.querySelector('.btn-reset')
const btnSave = document.querySelector('.btn-save')
const imageContainer = document.querySelector('img');
const canvas = document.querySelector('canvas')

const filters = (event) => {
  const suffix = event.target.dataset.sizing || '';
  let val = event.target.value
  document.documentElement.style.setProperty(`--${event.target.name}`, val + suffix)
  event.target.nextElementSibling.value = val
}


const btnResetPress = (event) => {
  // const suffix = event.target.dataset.sizing || '';
  // document.documentElement.style.setProperty(`--${event.target.name}`, 0 + suffix)
}

fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imageContainer.src = reader.result;
    // imageContainer.innerHTML = "";
    // imageContainer.append(img);
  }
  reader.readAsDataURL(file);
});

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imageContainer.src
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter('blur(4px)')
    ctx.drawImage(img, 0, 0);
  };
}

drawImage();

// const dataURL = canvas.toDataURL("image/png");
btnSave.addEventListener('click', function(e) {
  console.log(canvas.toDataURL());
  var link = document.createElement('a');
  link.download = "image/png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  
})

inputs.forEach(input => input.addEventListener('input', filters));
btnReset.addEventListener('click', btnResetPress)