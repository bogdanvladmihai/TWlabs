window.onload = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  document.body.style.backgroundColor = "black";
  ctx.font = '75pt digital-clock-font';

  draw();

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 100);
    ctx.fillStyle = "red";
    let delta = (new Date()).getHours() > 11 ? "PM" : "AM";
    ctx.fillText((new Date()).getHours() % 12 + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds() + " " + delta, 0, 100);
    window.requestAnimationFrame(draw);
  }
}
