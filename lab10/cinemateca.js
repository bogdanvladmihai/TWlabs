function add(category, value, listId) {
  let item = document.createElement("li");
  item.innerHTML = category + ": " + value;
  document.getElementById("list" + listId.toString()).appendChild(item);
}

window.onload = function() {
  let req = new XMLHttpRequest();
  req.open("GET", "cinemateca.xml", false);
  req.send();
  let data = req.responseText;

  let parser = new DOMParser();
  let list = parser.parseFromString(data, "text/xml");

  let movies = list.getElementsByTagName("film");
  for (let i = 0; i < movies.length; i++) {
    li = document.createElement("ul");
    li.id = "list" + i.toString();
    document.body.appendChild(li);

    let title = movies[i].getElementsByTagName("titlu")[0].firstChild.nodeValue;
    add("Titlu", title, i);
    let director = movies[i].getElementsByTagName("director")[0].firstChild.nodeValue;
    add("Director", director, i);
    let actori = movies[i].getElementsByTagName("actori")[0];
    for (let j = 0; j < actori.children.length; j++) {
      add("Actor", actori.children[j].firstChild.nodeValue, i);
    }
    let scenarist = movies[i].getElementsByTagName("scenarist")[0].firstChild.nodeValue;
    add("Scenarist", scenarist, i);
    let producator = movies[i].getElementsByTagName("producator")[0].firstChild.nodeValue;
    add("Producator", producator, i);
    let an = movies[i].getElementsByTagName("an")[0].firstChild.nodeValue;
    add("An", an, i);
    let scor = movies[i].getElementsByTagName("scor")[0].firstChild.nodeValue;
    add("Scor", scor, i);
  }
}