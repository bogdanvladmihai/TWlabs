function draw(albums) {
  console.log(albums);
  for (let i = 0; i < albums.length; i++) {
    let x = 1 + Math.floor(i / 5), j = 1 + i % 5;
    div = document.createElement("div");
    div.style.gridColum = j.toString();
    div.style.gridRow = x.toString();
    document.getElementById("gallery").appendChild(div);

    img = document.createElement("img");
    img.src = "images/" + albums[i].image;
    text = img.src;
    div.appendChild(img);
    div.innerHTML = albums[i].name + "(" + albums[i].artist + ")";

    div.addEventListener("click", function() {
      const url = "albums/" + i.toString() + '.json';    
      var promiseFetch = fetch(url);

      promiseFetch.then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      }).then(function(text) {    
        data = JSON.parse(text);
        let ul = document.createElement("ul");
        for (const key in data) {
          let li = document.createElement("li");
          console.log(key);
          li.innerHTML = key + ": " + data[key];
          ul.appendChild(li);
        }
        document.getElementById("info").appendChild(ul);
      }).catch(function(err){
      alert(err);});
    });
  }
}

window.onload = function() {
  const url = 'albums.json';    
  var promiseFetch = fetch(url);

  promiseFetch.then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {    
    draw(JSON.parse(text));
  }).catch(function(err){
  alert(err);});
}