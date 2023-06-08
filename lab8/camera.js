window.onload = function() {
  const delta = 25, L = -20, R = -1500, U = -30, B = -1700;
  let photos = 0;

  document.body.onkeyup = function(event) {

    function takePhoto() {
      photos++;
      document.getElementById("container").classList.add("snap");
      let clone = (document.getElementById("container")).cloneNode(true);
      clone.classList.remove("snap");
      clone.id = "container" + photos.toString();
      clone.firstChild.id = "vizor" + photos.toString();
      let galery = document.getElementById("galerie");
      galery.appendChild(clone);
      setTimeout(function() {
        document.getElementById("container").classList.remove("snap");
      }, 1000);
    }

    let target = document.getElementsByTagName("img");
    img = target[0];
    style = window.getComputedStyle(img);
    switch (event.key) {
      case "ArrowLeft":
        if (parseInt(style.marginLeft) + delta <= L) {
          img.style.marginLeft = (parseInt(style.marginLeft) + delta).toString() + "px";
        }
        break;
      case "ArrowUp":
        if (parseInt(style.marginTop) + delta <= U) {
          img.style.marginTop = (parseInt(style.marginTop) + delta).toString() + "px";
        }
        break;
      case "ArrowRight":
        if (parseInt(style.marginLeft) - delta >= R) {
          img.style.marginLeft = (parseInt(style.marginLeft) - delta).toString() + "px";
        }
        break;
      case "ArrowDown":
        if (parseInt(style.marginTop) - delta >= B) {
          img.style.marginTop = (parseInt(style.marginTop) - delta).toString() + "px";
        }
        break;
      case "+":
        let alpha = parseFloat(style.transform.substring(7, 10)) + 0.2;
        img.style.transform = "scale(" + alpha.toString() + ")";
        break;
      case "-":
        let beta = parseFloat(style.transform.substring(7, 10)) - 0.2;
        img.style.transform = "scale(" + beta.toString() + ")";
        break;
      case "s":
        takePhoto();
        break;
      case "t":
        setTimeout(takePhoto, 5000);
        document.getElementById("timeleft").textContent = 5;
        for (let i = 0; i < 5; i++) {
          setTimeout(function() {
            document.getElementById("timeleft").textContent = 5 - i.toString() - 1;
          }, 1000 * (i + 1));
        }
        setTimeout(function() {
          document.getElementById("timeleft").style.display = "none";
        }, 6000);
        break;
      case "b":
        f = setInterval(takePhoto, 500);
        setTimeout(function() {
          clearInterval(f);
        }, 2000);
        break;
    }
  }
}
