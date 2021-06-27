import formHandler from "./modal-form.js"; 
export default function showPhotographerProfil (jsonObj) {
    // réupération de l'id de la page courante
    var myID = window.location.search.split("=").pop();
    var photographers = jsonObj.photographers;
    // réupération du photographe avec l'id de la page courante
    var photographer = photographers.find( ({ id }) => id.toString() === myID );
    var medias = jsonObj.media;
    var media = medias.filter( ({ photographerId }) => photographerId.toString() === myID );
    //DOM
    var banner = document.getElementById('banner');
    var portofolio = document.getElementById('portofolio');
    let myPortofolioHTML = document.createElement('div');
    myPortofolioHTML.classList="container";
    // Banner
    var myArticleBanner = document.createElement('article');
    // Portofolio
    var myPortofolioFilter = document.createElement('article');
    let filterContainer = document.createElement('div');
    filterContainer.classList="filter"; 
    let imgWrap = document.createElement('img');
    let zeroSpaceFolder=(photographer.name).replace(/ +/g, "");
    let allLikesSum = media.map(medi => medi.likes).reduce((acc, medi) => medi + acc);
    var hasclickedSession = [];

    function displayBanner(){
        var tags = photographer.tags;
        myArticleBanner.innerHTML = 
        `<section>         
            <div class="infos">
                <h2>${photographer.name}</h2>
                <p>${photographer.city}, ${photographer.country}</p>
                <p class="tagline">${photographer.tagline}</p>
                <ul>
                    ${tags.map(tag=>
                        `<a href="./index.html"><li>#${tag}</li></a>`
                    ).join('')}                
                </ul>
            </div>
        <button class="contactButton">Contactez-moi</button>
            <div class="imgWrapper">
                <img src="./images/PhotographersIDPhotos/${photographer.portrait}" alt="${photographer.name}">
            </div>   
        </section>
        <p class="priceBottom">
            <span>
                ${allLikesSum} 
            </span>
                <img src="./images/heart-solid-Black.svg">
            <span>${photographer.price}€ / jour</span>
        </p>
        <section id="form-modal">
            <h4>Contactez-moi</h4>
            <h4>${photographer.name}</h4>
            <img class="close" src="./images/modal-form-closer.svg" alt="">
            <form action="#">
                <div class="formData" data-error="Veuillez entrer 2 caractères ou plus pour le champ du prénom." data-error-visible="">
                    <label for="first">Prénom</label>
                    <input
                    class="text-control" id="first" name="first" type="text"><br>
                </div>                
                <div class="formData" data-error="Veuillez entrer 2 caractères ou plus pour le champ du nom." data-error-visible="">
                    <label for="last">Nom</label>
                    <input
                    class="text-control" id="last" name="last" type="text"><br>
                </div>
                <div class="formData" data-error="Veuillez entrer un email valide." data-error-visible="">
                    <label for="email">Email</label>
                    <input
                    class="text-control" id="email" name="email" type="email"><br>
                </div>
                <div class="formData" data-error="Veuillez entrer un message." data-error-visible="">
                    <label for="message">Votre message</label>
                    <textarea id="message" name="message" rows="5" cols="33"></textarea><br>
                </div>
                <input class="btn-submit" type="submit" value="Envoyer">
            </form>
        </section>`;
        banner.appendChild(myArticleBanner);
        portofolio.appendChild(myPortofolioFilter);  
    filterMenu();  
    formHandler (); 
    }

    function filterMenu () {
        var filtersTab = ["Popularité", "Date", "Titre"];         
        for (let i = 0; i < filtersTab.length; i++){
            var span = document.createElement('span');
            span.innerHTML=filtersTab[i];              
            filterContainer.appendChild(span);                 
            span.classList="hidden";   
            if (i==0){
                span.classList="topFilterInMenu";  
                imgWrap.src = './images/dropdown-close.svg'
                imgWrap.classList="arrow";              
                span.appendChild(imgWrap);
            }            
        }  
        
        myPortofolioFilter.outerHTML =`<h4>Trier par</h4> ${filterContainer.outerHTML}`;
        portofolio.appendChild(myPortofolioHTML);     
        const menu = document.querySelectorAll(".filter span");
        const lastSpans = document.querySelectorAll("span:not(.topFilterInMenu)");
        const imgArrow = document.querySelector(".arrow");
        media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) );
        let filterSelect =document.querySelector("#portofolio > div.filter > span.topFilterInMenu");    
        // displayPortofolio ()  
        menu.forEach(span => {
            span.addEventListener("click", (event) => { 

            lastSpans.forEach((span)=>span.classList.toggle("hidden"));
            imgArrow.classList.toggle("up");       
            //gestion du swapping entre les spans du menu filter
            if(event.target.textContent!==filterSelect.textContent &&event.target.textContent!==""){
                let firstChildTextOnly = document.querySelector(".filter :not(img)");
                let temp = firstChildTextOnly.firstChild.textContent;
                firstChildTextOnly.firstChild.textContent=event.target.textContent;
                event.target.textContent=temp;


                // console.log(filterSelect.textContent);
               
                if(filterSelect.textContent==="Titre"){
                    media = media.sort(function(a, b){
                        let x = a.title.toLowerCase();
                        let y = b.title.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                    myPortofolioHTML.innerHTML="";
                    displayPortofolio ();
                }else if(filterSelect.textContent==="Date") {
                    media = media.sort((a,b) => new Date(b.date) - new Date(a.date));
                    myPortofolioHTML.innerHTML="";
                    displayPortofolio ();          
                }else if(filterSelect.textContent==="Popularité") {                
                    media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) ); 
                    myPortofolioHTML.innerHTML="";   
                    displayPortofolio ();                            
                }         
            }      
        })
        });
         
    }
    
    function heartLikesHandler(){  
        var hearts = document.querySelectorAll(".heart-likes"); 
        hearts.forEach(heart=>heart.addEventListener("click", (event) =>{media.map(medi=>  {
                let like = event.target.parentNode.querySelector("span");
                let altTarget =event.target.getAttribute("alt");
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

    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    function lightboxHandler(){
        const links = Array.from(document.querySelectorAll('.media'));    
        const gallery = links.map(link=>link.getAttribute('src'));
        const titlesDOM = Array.from(document.querySelectorAll('.container h4'));        
        const titles = titlesDOM.map(h4=>h4.textContent);

        links.forEach(link=>link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('src'), gallery, e.currentTarget.nextElementSibling.textContent, titles);
        }))
    }
       
    class Lightbox {

        constructor(url ,images, title, titles){
            this.element = this.buildDOM();
            this.images = images;
            this.titles=titles;
            this.loadImage(url, title);
            this.onKeyUp=this.onKeyUp.bind(this);
            portofolio.appendChild(this.element);
            document.addEventListener('keyup',this.onKeyUp)
        }

        loadImage (url, title){
            this.url = null;            
            const titleHTML = document.createElement("h4");
            const image = document.createElement("img");
            const video = document.createElement("video");
            const container = this.element.querySelector('.lightbox__container');
            const loader = document.createElement('div');
            loader.classList.add("lightbox__loader");
            container.innerHTML = '';
            container.appendChild(loader);
            titleHTML.textContent=title;

            if(getFileExtension(url)==="jpg"){         
                image.onload = ()=>{
                    container.removeChild(loader);
                    container.appendChild(image);
                    titleHTML.textContent=title;
                    container.appendChild(titleHTML);
                    this.url = url ;                
                }
                image.src = url;
            }
            else if(getFileExtension(url)==="mp4"){     
                    container.removeChild(loader);
                    container.appendChild(video);
                    titleHTML.textContent=title;
                    container.appendChild(titleHTML);
                    this.url = url ; 
                    video.src = url;
                    video.setAttribute("controls", "controls")
                    video.setAttribute('role', 'button');

            }

        }

        onKeyUp (e){
            if(e.key==="Escape"){
                this.close(e);
            }else if (e.key==='ArrowLeft'){
                this.prev(e)
            }else if (e.key==='ArrowRight'){
                this.next(e)
            }
        }

        close(e){
            e.preventDefault();
            this.element.parentElement.removeChild(this.element);
            document.removeEventListener('keyup', this.onKeyUp);
        }
        
        next(e){
            e.preventDefault();
            let i = this.images.findIndex(image=>image === this.url);
            if (i === this.images.length-1){i = -1}
            this.loadImage(this.images[i+1], this.titles[i+1]);
        }

        prev(e){
            e.preventDefault();
            let i = this.images.findIndex(image=>image === this.url);
            if (i === 0){i = this.images.length}
            this.loadImage(this.images[i-1], this.titles[i-1]);
        }

        buildDOM (){
            const dom = document.createElement('div');
            dom.classList.add("lightbox");
            dom.innerHTML=`
            <button class="lightbox__closer"></button>
            <button class="lightbox__next"></button>                
            <button class="lightbox__prev"></button>
            <div class="lightbox__container"></div>
            </div>`;
            dom.querySelector('.lightbox__closer').addEventListener('click', this.close.bind(this));
            dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
            dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
            return dom;
        }

    }
           
    function MediasFactory() {
        this.createMedia = function (extension,mediaSingleID) {
            // var media = this.media;
            if (extension === "jpg") {
                new Image(mediaSingleID);
            } else if (extension === "mp4") {
                new Video(mediaSingleID);
            } 
            heartLikesHandler(); 
            lightboxHandler();
            return media;    
        }
    }
     
    var Image = function (mediaSingleID) { 
        this.med = media.find( ({ id }) => id.toString() === mediaSingleID.toString() );
            
        myPortofolioHTML.innerHTML  +=  `<article><a href="./images/${zeroSpaceFolder}/${this.med.image}"><img src="./images/${zeroSpaceFolder}/${this.med.image}" alt="${this.med.title}" class="media"><h4>${this.med.title}</h4></a><span>${this.med.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="${this.med.title}"></article>`; 

    };
     
    var Video = function (mediaSingleID) {       
        this.med = media.find( ({ id }) => id.toString() === mediaSingleID.toString() );

        myPortofolioHTML.innerHTML  += `<article><video controls width="350px" height="300px" src="./images/${zeroSpaceFolder}/${this.med.video}" type="video/mp4" class="media">Sorry, your browser doesn't support embedded videos.</video><h4>${this.med.title}</h4><span>${this.med.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="${this.med.title}"></article>`;               
    };   
    

    function displayPortofolio() {
        var factory = new MediasFactory();
        var extension ;
        var mediaSingleID;
        media.map(med=>{
            extension = med.image ?  getFileExtension(med.image) : getFileExtension(med.video);
            if (extension==="jpg"){
                mediaSingleID = med.id;
                factory.createMedia("jpg",mediaSingleID); 
            }else if (extension==="mp4"){
                mediaSingleID = med.id;
                factory.createMedia("mp4",mediaSingleID);

            }
        }) 
    }

    displayBanner();
    displayPortofolio();
}