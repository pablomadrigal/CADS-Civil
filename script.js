const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const body = document.body,
  html = document.documentElement;

var height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

const setCanvasExtents = () => {
  console.log('height',height)
  w = body.clientWidth;
  h = height;
  canvas.width = Math.min(1600, body.clientWidth);
  canvas.height = height;
};

setCanvasExtents();

const makeStars = (count) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    const s = {
      x: Math.random() * 1600 - 800,
      y: Math.random() * 900 - 450,
      z: Math.random() * 1000
    };
    out.push(s);
  }
  return out;
};

let stars = makeStars(5000);

window.onresize = () => {
  setCanvasExtents();
};

const clear = () => {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const putPixel = (x, y, brightness) => {
  const intensity = brightness * 255;
  const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
  c.fillStyle = rgb;
  c.fillRect(x, y, 2, 2);
};

const moveStars = (distance) => {
  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const s = stars[i];
    s.z -= distance;
    if (s.z <= 1) {
      s.z += 999;
    }
  }
};

const paintStars = () => {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const star = stars[i];

    const x = cx + star.x / (star.z * 0.001);
    const y = cy + star.y / (star.z * 0.001);

    if (x < 0 || x >= w || y < 0 || y >= h) {
      continue;
    }

    const d = star.z / 1000.0;
    const b = 1 - d * d;

    putPixel(x, y, b);
  }
};

let prevTime;
const init = (time) => {
  prevTime = time;
  requestAnimationFrame(tick);
};

const tick = (time) => {
  let elapsed = time - prevTime;
  prevTime = time;

  moveStars(elapsed * 0.02);

  clear();
  paintStars();

  requestAnimationFrame(tick);
};

document.getElementById('switch').addEventListener('click', function() {
  if (this.classList.contains('off')) {
    this.classList.remove('off');
      document.getElementById("cads").classList.remove('crawl');
  } else {
    this.classList.add('off');
      document.getElementById("cads").classList.add('crawl');
  }
});

requestAnimationFrame(init);