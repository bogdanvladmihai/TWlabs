window.onload = function() {
  const canvas = document.getElementById("canvdoor");
  const ctx = canvas.getContext("2d");
  canvas.addEventListener("click", function() {
    draw("black");
    console.log("que");
  });
  draw("red");
            
  function draw(color) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = "red";
    ctx.fillRect(25, 25, 150, 220);
    ctx.fillStyle = "white";
    ctx.fillRect(40, 40, 120, 300);
    
    ctx.beginPath();
    ctx.moveTo(45, 45);
    ctx.lineTo(125, 5);
    ctx.lineTo(125, 275);
    ctx.lineTo(50, 245);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(130, 10);
    ctx.lineTo(130, 280);
    ctx.lineTo(50, 245);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(130, 0);
    ctx.lineTo(140, 0);
    ctx.lineTo(140, 240);
    ctx.lineTo(130, 240);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(110, 170, 10, 0, 2 * Math.PI);
    ctx.fill();
  }          
}   
      
      
    
