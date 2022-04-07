export default function home(jsonObj) {
  let myNav = document.querySelector("nav");
  let section = document.querySelector("section");
  let photographers = jsonObj;
  let tagsTab = [
    "Portrait",
    "Art",
    "Fashion",
    "Architecture",
    "Travel",
    "Sport",
    "Animals",
    "Events",
  ];
  let myArticles = document.getElementsByTagName("article");

  function onKeyUp(e) {
    if (e.key === "Enter") {
      tagFilter(e, e.target);
    }
  }

  let tagsArray = [];
  function clickAndKeyboardHandler() {
    document.addEventListener("keyup", onKeyUp);
    document.querySelectorAll("ul li").forEach((li) => {
      li.addEventListener("click", (event) => tagFilter(event, li));
    });
  }

  function substringTolowercase(str) {
    return str.substring(1).toLowerCase();
  }

  // filter on tag click
  function tagFilter(event, li) {
    if (tagsArray.includes(substringTolowercase(event.target.textContent))) {
      for (var i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i] === substringTolowercase(li.textContent)) {
          tagsArray.splice(i, 1);
        }
      }
    } else if (!tagsArray.includes(li.textContent.toLowerCase())) {
      tagsArray.push(substringTolowercase(li.textContent));
    }
    for (const a of document.querySelectorAll("li")) {
      a.classList = tagsArray.includes(substringTolowercase(a.textContent))
        ? "up"
        : "";
    }

    [...myArticles].forEach((article) => {
      for (let photographer of photographers) {
        if (article.getAttribute("data-filter") === photographer.name) {
          if (haveAllTagsSelected(photographer.tags)) {
            article.style.display = "flex";
            article.style.flexDirection = "column";
          } else {
            article.style.display = "none";
          }
        }
      }
    });
  }

  function haveAllTagsSelected(tags) {
    let intersection = tags.filter((t) => tagsArray.includes(t));
    return intersection.length === tagsArray.length;
  }

  //banner
  function navigationDisplay(sectorToInsert, tab) {
    let navInner = "<ul>";
    for (const tag of tab) {
      navInner +=
        '<a href="#" title="' +
        tag.toLowerCase() +
        '"><li>#' +
        tag +
        "</li></a>";
    }
    navInner += "</ul>";

    sectorToInsert.innerHTML = navInner;
  }

  // mainContent
  function mainDisplay() {
    section.innerHTML = "<h1>Nos photographes</h1>";
    photographers.map((photographer) => {
      let myArticle = document.createElement("article");
      myArticle.innerHTML =
        '<a href="./photographer.html?id=' +
        photographer.id +
        '"><div><img src="./images/PhotographersIDPhotos/' +
        photographer.portrait +
        '" alt="' +
        photographer.name +
        '"></div><h2>' +
        photographer.name +
        "</h2></a><p>" +
        photographer.city +
        ", " +
        photographer.country +
        "</p><p>" +
        photographer.tagline +
        "</p><p>" +
        photographer.price +
        "€/jour</p><p></p>";
      let tags = photographer.tags;
      let myTagsUnderProfil = myArticle.querySelector("p:last-child");
      navigationDisplay(myTagsUnderProfil, tags);
      section.appendChild(myArticle);
      myArticle.setAttribute("data-filter", photographer.name);
    });
  }

  //ancre vers le main
  var myquickMainContent = document.getElementById("quickMainContent");
  myquickMainContent.style.display = "none";
  var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 300) {
      myquickMainContent.style.display = "block";
    } else {
      myquickMainContent.style.display = "none";
    }
  };
  window.addEventListener("scroll", myScrollFunc);

  //Starting here
  navigationDisplay(myNav, tagsTab);
  mainDisplay();
  clickAndKeyboardHandler();
}
