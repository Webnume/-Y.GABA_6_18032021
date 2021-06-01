export default function showPhotographers (jsonObj) {
    // console.log(jsonObj);
  var myNav = document.querySelector('nav');
  var section = document.querySelector('section');
  var photographers = jsonObj;
  
  
var tagsTab =["Portrait", "Art", "Fashion", "Architecture", "Travel", "Sport", "Animals", "Events"];  


  
function tagFilter(event) {
  console.log(event.target.textContent);
  var tagSelected = (event.target.textContent).substring(1).toLowerCase();

  var filterTab = photographers.filter(filtrerParTag);

  function filtrerParTag(obj) {
    if (obj.tags.includes(tagSelected)) {
      return true;
    } else {
      return false;
    }
  }     

  document.querySelector('section').innerHTML="";
  mainDisplay(filterTab);

}


//banner
function navigationDisplay(sectorToInsert,tab){
  var navInner = '<ul>' ;  
  for (const tag of tab) {
    // console.log(tag);
    navInner+='<a href="#" title="'+tag+'"><li>#'+tag+'</li></a>';
  }
  navInner+='</ul>';  
  sectorToInsert.innerHTML= navInner;
  clickHandler();
}

function clickHandler(){
  var myA = document.querySelectorAll('ul a');
  
  console.log(myA);
  for(const a of myA){    
    console.log(a);
    a.addEventListener("click", tagFilter);
  }; 
}



navigationDisplay(myNav,tagsTab);

// main
function mainDisplay(photographers){  
  photographers.map(photographer => {
    
    var myArticle = document.createElement('article');
    var homePicture="";
    let zeroSpace=(photographer.name).replace(/ +/g, "");

    switch (photographer.name) {
      case "Mimi Keel":
        homePicture="Portrait_Nora.jpg";  
        break;
        case "Ellie-Rose Wilkens":
        homePicture="Architecture_Horseshoe.jpg";        
        break;
        case "Tracy Galindo":
        homePicture="Fashion_Urban_Jungle.jpg";        
        break;
        case "Nabeel Bradford":
        homePicture="Travel_Outdoor_Baths.jpg";        
        break;
        case "Rhode Dubois":
        homePicture="Fashion_Melody_Red_on_Stripes.jpg";        
        break;
        case "Marcel Nikolic":
        homePicture="Travel_Tower.jpg";        
        break;    
      default:
        break;
    }

    myArticle.innerHTML = 
    '<a href="./photographer.html?id='+photographer.id+'"><div><img src="./images/'+zeroSpace+'/'+homePicture+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2></a><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><p>'+photographer.price+'€/jour</p><p></p>'


    var tags = photographer.tags;
    var myTagsUnderProfil = myArticle.querySelector('p:last-child');

    

navigationDisplay(myTagsUnderProfil,tags);



    section.appendChild(myArticle);
      
 
  });
}
mainDisplay(photographers);  



 


}


