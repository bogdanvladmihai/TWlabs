window.onload = function() {
  document.body.style.backgroundColor = localStorage.getItem("color");
  let selector = document.getElementById("culoare");
  if (localStorage.getItem("color")) {
    selector.value = localStorage.getItem("color");
  }
  selector.addEventListener("input", function() {
    localStorage.setItem("culoare", selector.value);
    document.body.style.backgroundColor = selector.value;
  });

  button = document.getElementById("submit");
  button.addEventListener("click", function() {
    alert("E OK.");
  });
}