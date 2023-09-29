const canvas = document.querySelector("canvas");
const form = document.querySelector(".signature-pad-form");
const clearbutton = document.querySelector(".clear-button");

canvas.width = 800;
canvas.height = 400;

const ctx = canvas.getContext("2d");
let writingMode = false;
let lastX, lastY;

//define event handlings
const handlePointerDown = (event) => {
  writingMode = true;
  ctx.beginPath();
  const [positionX, positionY] = getCursorPointer(event);
  ctx.moveTo(positionX, positionY);
  lastX = positionX;
  lastY = positionY;
}


const handlePointerUp = () => {
    writingMode = false;
}

// ... (previous code)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // ... (rest of your code)

    // Find the container div and append the download link to it
    const container = document.querySelector('.container');
    container.appendChild(downloadLink);
});

// ... (next code)


const handlePointerMove = (event) => {
  if (!writingMode) return;
  const [positionX, positionY] = getCursorPointer(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
  lastX = positionX;
  lastY = positionY;
}


const getCursorPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    const positionX = event.clientX - rect.left;
    const positionY = event.clientY - rect.top;
    return [positionX, positionY];
}

canvas.addEventListener('pointerdown',handlePointerDown, { passive: true });
canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
canvas.addEventListener("pointermove", handlePointerMove, { passive: true });

ctx.lineWidth = 2;
ctx.lineJoin = ctx.lineCap = 'round';


// ... (previous code)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    form.appendChild(image);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = 'signature.png';
    downloadLink.textContent = 'Download Signature'; // corrected typo
    downloadLink.style.display = 'block'; // added display style
    downloadLink.style.marginTop = '10px'; // added margin-top for better spacing
    document.body.appendChild(downloadLink); // appended to body
    
    clearPad();
});

// ... (next code)


const clearPad = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

clearbutton.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
});