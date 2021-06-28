export default function home (jsonObj) {
  // console.log(jsonObj);
  let myNav = document.querySelector('nav');
  let section = document.querySelector('section');
  let photographers = jsonObj;
  let tagsTab =["Portrait", "Art", "Fashion", "Architecture", "Travel", "Sport", "Animals", "Events"];  
  let myArticles = document.getElementsByTagName("article");


  function onKeyUp (e){
    if(e.key==="Enter"){
      tagFilter(e,e.target);   
    }
  }

 
  let tagsArray= [];
  function clickAndKeyboardHandler(){
    document.addEventListener('keyup',onKeyUp);
    document.querySelectorAll('ul li').forEach(li => {
      li.addEventListener('click', event => tagFilter(event,li))
    });      
  }

  // filter on tag click
  function tagFilter(event,li) {
    if (tagsArray.includes(event.target.textContent.substring(1).toLowerCase())) {
        for( var i = 0; i < tagsArray.length; i++){  
          if ( tagsArray[i] === li.textContent.substring(1).toLowerCase()) {  
            tagsArray.splice(i, 1);
          }
        }             
    } else if (!tagsArray.includes(li.textContent.toLowerCase()) ){
      tagsArray.push(li.textContent.substring(1).toLowerCase());                      
    }  
    for (const a of document.querySelectorAll("li")) {
      if (tagsArray.includes(a.textContent.substring(1).toLowerCase())) {
        a.classList="up"; 
      }else{
        a.classList=""; 
      }
    }  

    [...myArticles].forEach(article => {
        for (let photographer of photographers){    
          if(article.getAttribute("data-filter") === photographer.name){
            if(haveAllTagsSelected(photographer.tags)){
              article.style.display = "flex";
              article.style.flexDirection = "column";
            }else{
              article.style.display="none";
            }  
          }                     
        }
    });
  }

  function haveAllTagsSelected(tags){    
    let intersection = tags.filter(t => tagsArray.includes(t)); 
    return intersection.length === tagsArray.length;
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
    section.innerHTML = '<h1>Nos photographes</h1>';
    photographers.map(photographer => {      
      let myArticle = document.createElement('article');
      myArticle.innerHTML = 
      '<a href="./photographer.html?id='+photographer.id+'"><div><img src="./images/PhotographersIDPhotos/'+photographer.portrait+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2></a><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><p>'+photographer.price+'€/jour</p><p></p>';
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
  clickAndKeyboardHandler();
}