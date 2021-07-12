import formHandler from "./modal-form.js"; 
import MediaFactory from "./media-factory.js";  
import Lightbox from "./lightbox.js";

export default function showPhotographerProfil (jsonObj) {
    // réupération de l'id de la page courante
    var myID = window.location.search.split("=").pop();
    var photographers = jsonObj.photographers;
    // réupération du photographe avec l'id de la page courante
    var photographer = photographers.find( ({ id }) => id.toString() === myID );
    var medias = jsonObj.media;
    var media = medias.filter( ({ photographerId }) => photographerId.toString() === myID );
    var zeroSpaceFolder=(photographer.name).replace(/ +/g, "");
    // Variable globale de la fonction heartLikesHandler
    let allLikesSum = media.map(medi => medi.likes).reduce((acc, medi) => medi + acc);
    var hasclickedSession = [];

    //DOM
    var banner = document.getElementById('banner');
    var portofolio = document.getElementById('portofolio');
    let myPortofolioHTML = document.createElement('div');
    myPortofolioHTML.classList="container";
    var myArticleBanner = document.createElement('article');
    var myPortofolioFilter = document.createElement('article');
    myPortofolioFilter.classList="filter-container";
    let filterContainer = document.createElement('ul');
    filterContainer.classList="filter"; 

    //

    function displayBanner(){
        var tags = photographer.tags;
        myArticleBanner.innerHTML = 
        `<section>         
            <div class="infos">
                <h1>${photographer.name}</h1>
                <p>${photographer.city}, ${photographer.country}</p>
                <p class="tagline">${photographer.tagline}</p>
                <ul>
                    ${tags.map(tag=>
                        `<a href="./index.html"><li>#${tag}</li></a>`
                    ).join('')}                
                </ul>
            </div>
            <button class="contactButton" id="contactButton">Contactez-moi</button>
            <div class="imgWrapper">
                <img src="./images/PhotographersIDPhotos/${photographer.portrait}" alt="${photographer.name}">
            </div>   
        </section>
        <p class="priceBottom">
            <span>
                ${allLikesSum} 
            </span>
                <img src="./images/heart-solid-Black.svg" alt="likes">
            <span>${photographer.price}€ / jour</span>
        </p>
        <section id="form-modal" aria-labelledby="contactButton" role=”dialog”>
            <h4>Contactez-moi</h4>
            <h4>${photographer.name}</h4>
            <img class="close" src="./images/modal-form-closer.svg" alt="Close contact form">
            <form action="#">
                <div class="formData" data-error="Veuillez entrer 2 caractères ou plus pour le champ du prénom." data-error-visible="">
                    <label for="first" id="firstacc">Prénom</label>
                    <input
                    class="text-control" id="first" name="first" type="text" aria-labelledby="firstacc"><br>
                </div>                
                <div class="formData" data-error="Veuillez entrer 2 caractères ou plus pour le champ du nom." data-error-visible="">
                    <label for="last" id="lastacc">Nom</label>
                    <input
                    class="text-control" id="last" name="last" type="text" aria-labelledby="lastacc"><br>
                </div>
                <div class="formData" data-error="Veuillez entrer un email valide." data-error-visible="">
                    <label for="email" id="emailacc">Email</label>
                    <input
                    class="text-control" id="email" name="email" type="email" aria-labelledby="emailacc"><br>
                </div>
                <div class="formData" data-error="Veuillez entrer un message." data-error-visible="">
                    <label for="message" id="messageacc">Votre message</label>
                    <textarea id="message" name="message" rows="5" cols="33" aria-labelledby="messageacc"></textarea><br>
                </div>
                <input class="btn-submit" type="submit" value="Envoyer">
            </form>
        </section>`;
        banner.appendChild(myArticleBanner);
        portofolio.appendChild(myPortofolioFilter);  
        filterMenuDisplay();  
        formHandler (); 
    }

    // gestion du tri des résultats en fonction du menu
    function mediaSort(event,activeElement){
        const lastLis = document.querySelectorAll("li:not(.topFilterInMenu)");
        const imgArrow = document.querySelector(".arrow");
        let filterSelect =document.querySelector("#portofolio > article > ul > li.topFilterInMenu");   
        var x = filterSelect.parentNode.getAttribute("aria-expanded"); 
        x = (x==="true") ? "false" : "true" ;       
        filterSelect.parentNode.setAttribute("aria-expanded", x); 
        media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) ); 
        lastLis.forEach((li)=>li.classList.toggle("hidden"));
        imgArrow.classList.toggle("up"); 
        filterSelect.classList.toggle("extend");
        let valueSort ;
        if(event.target!==undefined){
            valueSort=event.target.textContent;
        }else{
            valueSort=event;
        }
        if(valueSort!==filterSelect.textContent && valueSort!==""){

            let firstChildTextOnly = document.querySelector(".filter :not(img)");
            let temp = firstChildTextOnly.firstChild.textContent;
            firstChildTextOnly.firstChild.textContent=valueSort;
            firstChildTextOnly.id=valueSort;
             lastLis.forEach((li)=>{if(li===activeElement){li.id=temp; li.textContent=temp}});
            (!event.target) ? "" : event.target.textContent=temp;    
            (!event.target) ? "" : event.target.id=temp;       
        
            if(filterSelect.textContent==="Titre"){
                media = media.sort(function(a, b){
                    let x = a.title.toLowerCase();
                    let y = b.title.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                myPortofolioHTML.innerHTML="";
            }else if(filterSelect.textContent==="Date") {
                media = media.sort((a,b) => new Date(b.date) - new Date(a.date));
                myPortofolioHTML.innerHTML="";        
            }else if(filterSelect.textContent==="Popularité") {                
                media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) ); 
                myPortofolioHTML.innerHTML="";            
            }         
        }
            displayPortofolio();                  
            lightboxHandler();
            heartLikesHandler()
    }
      
    // Affichage du menu de tri
    function filterMenuDisplay () {
        myPortofolioFilter.innerHTML=`  
        <h4 id="orderBy">Trier par</h4>
        <ul class="filter" aria-labelledby="orderBy" role="button" aria-haspopup="listbox", aria-expanded="false" tabindex="0" aria-activedescendant="Popularité">
            <li role="listbox" id="Popularité"  class="topFilterInMenu">Popularité<img src="./images/dropdown-close.svg" class="arrow" alt=""></li>
            <li role="listbox" class="hidden" id="Date">Date</li>
            <li role="listbox" class="hidden" id="Titre">Titre</li>
        </ul>`
        
        const menu = document.querySelectorAll(".filter li");
        menu.forEach(li => {
            li.addEventListener("click", (event) =>  mediaSort(event))
        });    

        const listbox = document.querySelector('[role="button"]')
        const characters = [...listbox.children] 
        
        listbox.addEventListener('click', event => {
          const option = event.target.closest('li');
          if (!option) return

          // Sets aria-activedescendant value
          listbox.setAttribute('aria-activedescendant', option.id);
        
          // Change visual appearance
          characters.forEach(element => {
              element.classList.remove('is-selected');
              element.removeAttribute("aria-selected")
          })
          option.classList.add('is-selected')
          option.setAttribute("aria-selected", "true")
        })
        
        listbox.addEventListener('keydown', event => {
          const { key } = event 
          if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter') return
        
          const activeElementID = listbox.getAttribute('aria-activedescendant')
          const activeElement = listbox.querySelector('#' + activeElementID)
        
          let selectedOption
          if (key === 'ArrowDown') selectedOption = activeElement.nextElementSibling
          if (key === 'ArrowUp') selectedOption = activeElement.previousElementSibling   

          if (key === 'Enter') mediaSort(activeElementID,activeElement)  
          if (selectedOption) {
            // Sets aria-activedescendant value
            listbox.setAttribute('aria-activedescendant', selectedOption.id)
        
            // Change visual appearance
            characters.forEach(element => element.classList.remove('is-selected'));
            selectedOption.classList.add('is-selected');            

          }
        })


        portofolio.appendChild(myPortofolioHTML);   
          
    }

    //Gestion des likes
    function heartLikesHandler(){  
        var hearts = document.querySelectorAll(".heart-likes"); 
        hearts.forEach(heart=>heart.addEventListener("click", (event) =>{media.map(medi=>  {
                let like = event.target.parentNode.querySelector("span");
                let altTarget =event.target.parentNode.querySelector("h4").textContent;
                if(medi.title===altTarget &&  !hasclickedSession.includes(altTarget)){
                    medi.likes+=1;
                    like.innerHTML=medi.likes;
                    allLikesSum += 1;
                    document.querySelector("#banner > article > p.priceBottom > span:nth-child(1)").innerHTML=allLikesSum;
                    hasclickedSession.push(altTarget);   
                    // debugger
                }else if (medi.title===altTarget &&  hasclickedSession.includes(altTarget)){                    
                    medi.likes-=1;
                    like.innerHTML=medi.likes; 
                    allLikesSum -= 1;
                    document.querySelector("#banner > article > p.priceBottom > span:nth-child(1)").innerHTML=allLikesSum; 
                    for( var i = 0; i < hasclickedSession.length; i++){     
                        if ( hasclickedSession[i] === altTarget) {
                            hasclickedSession.splice(i, 1); 
                        }
                    }  
                }
            });
        }));
    }

    // LightBox
    function lightboxHandler(){
        const links = Array.from(document.querySelectorAll('.medias'));    
        const gallery = links.map(link=>link.getAttribute('src'));
        const titlesDOM = Array.from(document.querySelectorAll('.container h4'));        
        const titles = titlesDOM.map(h4=>h4.textContent);
        const altTexts = links.map(link=>link.getAttribute('alt'));
        links.forEach(link=>link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('src'), gallery, e.currentTarget.parentNode.parentNode.querySelector("h4").textContent, titles, e.currentTarget.getAttribute('alt'),altTexts);
        }));
        links.forEach(link=>link.addEventListener('keyup', event => {       
            event.preventDefault();         
            if(event.key==="Enter"){
                new Lightbox(event.currentTarget.getAttribute('src'), gallery, event.currentTarget.parentNode.querySelector("h4").textContent, titles, event.currentTarget.getAttribute('alt'),altTexts);  
            }
        }))
    }

    // Affichage du portofolio
    function displayPortofolio() {
       var portofolio = []
       for (var i = 0; i < media.length; i++) { 
            portofolio[i]= new MediaFactory(document.querySelector(".container"),{test:"kljkljkljl",zeroSpaceFolder,photographerId:media[i].photographerId, title:media[i].title, image:(media[i].image ?  media[i].image : media[i].video ) , tags:media[i].tags, likes:media[i].likes, date:media[i].date, price:media[i].price, altText:media[i].altText});
        }
    }   
    
    // Lancement des fonctions au démarrage de la page.
    displayBanner();
    displayPortofolio();
    lightboxHandler();
    heartLikesHandler();


}