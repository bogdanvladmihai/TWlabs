window.onload = function() {
  var starttime = Date.now();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d"); 

  draw();

  function draw() {
    let nowtime = Date.now();
    
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 50;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
  
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow'; 
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(175, 120, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'; 
    ctx.fill();

    ctx.arc(150, 150, 100, Math.PI + 5 * Math.PI / 6, -(Math.PI + 5 * Math.PI / 6));
    ctx.lineTo(150, 150);
    ctx.fillStyle = "black";
    ctx.fill();
  } 
}       
