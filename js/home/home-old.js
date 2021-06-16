export default function showPhotographers (jsonObj) {
  // console.log(jsonObj);
  let myNav = document.querySelector('nav');
  let section = document.querySelector('section');
  let photographers = jsonObj;
  let tagsTab =["Portrait", "Art", "Fashion", "Architecture", "Travel", "Sport", "Animals", "Events"];  
  let myArticles = document.getElementsByTagName("article");

  
  function clickHandler(){
    document.querySelectorAll('ul').forEach(x => {
      x.addEventListener('click', event => {
        tagFilter(event);     
      })
    });  
    
  }





  // filter on tag click
  function tagFilter(event) {
    let tagSelected = (event.target.textContent).substring(1).toLowerCase();
    [...myArticles].forEach(article => {
        for (let photographer of photographers){    
          if(article.getAttribute("data-filter") === photographer.name){
            if(photographer.tags.includes(tagSelected)){
              article.style.display = "flex";
              article.style.flexDirection = "column";
            }else{
              article.style.display="none";
            }
          }                         
        }
    });
  }
  
  //banner
  function navigationDisplay(sectorToInsert,tab){
    let navInner = '<ul>' ;  
    for (const tag of tab) {
      navInner+='<a href="#" title="'+tag.toLowerCase()+'"><li>#'+tag+'</li></a>';
    }
    navInner+='</ul>';  
    
    sectorToInsert.innerHTML= navInner;
  }

  // mainContent
  function mainDisplay(photographers){  
    photographers.map(photographer => {      
      let myArticle = document.createElement('article');
      let homePicture="";
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
      };
      myArticle.innerHTML = 
      '<h1>Nos photographes</h1><a href="./photographer.html?id='+photographer.id+'"><div><img src="./images/'+zeroSpace+'/'+homePicture+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2></a><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><p>'+photographer.price+'€/jour</p><p></p>';
      let tags = photographer.tags;
      let myTagsUnderProfil = myArticle.querySelector('p:last-child');
      navigationDisplay(myTagsUnderProfil,tags);
      section.appendChild(myArticle);     
      myArticle.setAttribute("data-filter", photographer.name);
    });
  }  
  
  //Starting here
  navigationDisplay(myNav,tagsTab);
  mainDisplay(photographers);
  clickHandler();
}