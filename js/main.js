import showPhotographers from "/js/home.js"; 
import showPhotographerProfil from "/js/photographer.js"; 

fetch("FishEyeData.json")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {    
    if (window.location.href.indexOf("index.html") > -1) {
      showPhotographers(value.photographers);  
    }
    else if  (window.location.href.indexOf("photographer.html") > -1) {
      showPhotographerProfil(value.photographers);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });


