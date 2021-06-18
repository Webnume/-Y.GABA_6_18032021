export default function showPhotographerProfil (jsonObj) {     
    var photographers = jsonObj.photographers;
    var medias = jsonObj.media;
    var banner = document.getElementById('banner');
    var portofolio = document.getElementById('portofolio');

    // réupération de l'id de la page courante
    var myID = window.location.search.split("=").pop();
    // réupération du photographe avec l'id de la page courante
    var photographer = photographers.find( ({ id }) => id.toString() === myID );

    let myPortofolioHTML = document.createElement('div');
    myPortofolioHTML.classList="container";
    var media = medias.filter( ({ photographerId }) => photographerId.toString() === myID );
    var contentHTML ;
    // Banner
    var myArticleBanner = document.createElement('article');
    var homePicture="";
    let zeroSpaceFolder=(photographer.name).replace(/ +/g, "");

    function bannerDisplay(){
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
        }

        let allLikesSum = media.map(medi => medi.likes).reduce((acc, medi) => medi + acc);
        myArticleBanner.innerHTML = 
        `<div>
            <img src="./images/${zeroSpaceFolder}/${homePicture}" alt="${photographer.name}">
        </div>
        <h2>${photographer.name}</h2>
        <p>${photographer.city}, ${photographer.country}</p>
        <p>${photographer.tagline}</p>
        <ul></ul>
        <button class="contactButton">Contactez-moi</button>
        <p class="priceBottom">
            <span>
                ${allLikesSum} 
                <img src="./images/heart-solid-black.svg">
            </span>
            <span>${photographer.price}€ / jour</span>
        </p>
        <section id="form-modal">
            <h4>Contactez-moi</h4>
            <h4>${photographer.name}</h4>
            <img src="./images/modal-form-closer.svg" alt="">
            <form action="#">
                <label for="firstname">Prénom</label>
                <input id="firstname" name="firstname" type="text">
                <label for="name">Nom</label>
                <input id="name" name="name" type="text">
                <label for="email">Email</label>
                <input id="email" name="email" type="email">
                <label for="message">Votre message</label>
                <textarea id="message" name="message" rows="5" cols="33"></textarea>
                <input class="btn-submit" type="submit" value="Envoyer">
            </form>
        </section>`;


        var tags = photographer.tags;
        // console.log(tags);
        var myTags =  myArticleBanner.querySelector('ul');
        
            myTags.innerHTML=tags.map(tag=>
            `<a href="./index.html"><li>#${tag}</li></a>`
        ).join('');
        myArticleBanner.appendChild(myTags);

    }


    // Portofolio
    var myPortofolioFilter = document.createElement('article');
    var filtersTab = ["Popularité", "Date", "Titre"];  

    let filterContainer = document.createElement('div');
    filterContainer.classList="filter"; 
    let imgWrap = document.createElement('img');

    function filterMenu(){          
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
    }

    function filterMenuclickHandler () {
        const menu = document.querySelector(".filter");
        const lastSpans = document.querySelectorAll("span:not(.topFilterInMenu)");
        const imgArrow = document.querySelector(".arrow");

        media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) );    
        displayPortofolio ()  
        menu.addEventListener("click", (event) => {    
            lastSpans.forEach((span)=>span.classList.toggle("hidden"));
            imgArrow.classList.toggle("up");       
            // console.log(event.target.textContent)

            //gestion du swapping entre les spans du menu filter
            if(event.target.textContent!==menu.firstChild.textContent){
                let firstChildTextOnly = document.querySelector(".filter :not(img)");
                let temp = firstChildTextOnly.firstChild.textContent;
                firstChildTextOnly.firstChild.textContent=event.target.textContent;
                event.target.textContent=temp;


                let filterSelect =document.querySelector("#portofolio > div.filter > span.topFilterInMenu");
                // console.log(filterSelect.textContent);
               
                if(filterSelect.textContent==="Titre"){
                    media = media.sort(function(a, b){
                        let x = a.title.toLowerCase();
                        let y = b.title.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                    displayPortofolio ();
                    heartLikesHandler();
                }else if(filterSelect.textContent==="Date") {
                    media = media.sort((a,b) => new Date(b.date) - new Date(a.date));
                    displayPortofolio ();
                    heartLikesHandler();

                }else if(filterSelect.textContent==="Popularité") {                
                    media = media.sort((a, b) =>parseInt(b.likes, 10) - parseInt(a.likes, 10) );    
                    displayPortofolio ();   
                    heartLikesHandler();                               
                }         
            }      
        }) 
    }
    


    function displayPortofolio (){
        // myPortofolioHTML.innerHTML = media.map(medi=> {
            // return `<article>
            //     <a href="./images/${zeroSpaceFolder}/${medi.image}"><img src="./images/${zeroSpaceFolder}/${medi.image}"  alt="${medi.title}"></a>                
            //     <h4>${medi.title}</h4>
            //     <span>${medi.likes}</span>
            //     <img  class="heart-likes" src="./images/heart-solid.svg" alt="${medi.title}">        
            // </article>`;
            
        // }).join('');
    }
var hearts = document.querySelectorAll("#portofolio > div.container > article > img:nth-child(4)");
    function heartLikesHandler(){
        
        var hasClicked = false;
        hearts.forEach(heart=>heart.addEventListener("click", (event) =>{media.map(medi=>  {
                let like = heart.parentNode.querySelector("span");
                if(medi.title===event.target.getAttribute("alt") && !hasClicked){
                    medi.likes+=1;
                    like.innerHTML=medi.likes;
                    hasClicked = true;
                }else if (medi.title===event.target.getAttribute("alt") && hasClicked) {                    
                    medi.likes-=1;
                    like.innerHTML=medi.likes;  
                    hasClicked = false;

                }
            });
        }));
    }

// affichage du menu de tri
    bannerDisplay();
    filterMenu();


    banner.appendChild(myArticleBanner);
    portofolio.appendChild(myPortofolioFilter);
    myPortofolioFilter.outerHTML =`<h4>Trier par</h4> ${filterContainer.outerHTML}`;    
    filterMenuclickHandler();
        
    portofolio.appendChild(myPortofolioHTML);
    heartLikesHandler();

    
    function formModalHandler(){
        let formModal = document.getElementById('form-modal'); 
        let contactButton = document.querySelector("#banner > article > .contactButton");
        let formModalCloser = document.querySelector("#form-modal > img");
        let formModalBtnSubmit = document.querySelector("#form-modal > form > input.btn-submit");
        let firstname =document.querySelector("#firstname");
        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let message = document.querySelector("#message");
        contactButton.addEventListener("click",()=>formModal.style.display = "block");
        formModalCloser.addEventListener("click",()=>formModal.style.display = "none");    
        formModalBtnSubmit.addEventListener("click",(e)=>{
            console.log(`Prénom : ${firstname.value} \n Nom : ${name.value} \n Email : ${email.value} \n Message : ${message.value}`);
            e.preventDefault();   
            formModal.style.display = "none";
            firstname.value="";
            name.value="";
            email.value="";
            message.value="";
        });
    }
    formModalHandler();
    
    function lightboxHandler(){
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"]'));
        const gallery = links.map(link=>link.getAttribute('href'));
        const titlesDOM = Array.from(document.querySelectorAll('a + h4'));        
        const titles = titlesDOM.map(h4=>h4.textContent);

        links.forEach(link=>link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('href'), gallery, e.currentTarget.nextElementSibling.textContent, titles);

            // console.log(titles)
            // console.log(gallery)
            // console.log( e.currentTarget.nextElementSibling.textContent)
        }))
    }
    lightboxHandler();
    
    class Lightbox {

        constructor(url ,images, title, titles){
            this.element = this.buildDOM(url);
            this.images = images;
            // this.title=title;
    this.titles=titles;
            this.loadImage(url, title);
            this.onKeyUp=this.onKeyUp.bind(this)
            portofolio.appendChild(this.element);
            document.addEventListener('keyup',this.onKeyUp)
        }

        loadImage (url, title){
            this.url = null;            
const titleHTML = document.createElement("h4");
            const image = document.createElement("img");
            const container = this.element.querySelector('.lightbox__container');
            const loader = document.createElement('div');
            loader.classList.add("lightbox__loader");
            container.innerHTML = '';
            container.appendChild(loader);
            image.onload = ()=>{
                container.removeChild(loader);
                container.appendChild(image);
            titleHTML.textContent=title;
                container.appendChild(titleHTML)
                this.url = url ;
                // this.title = title ;
            }
            image.src = url;
            titleHTML.textContent=title;
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
            this.loadImage(this.images[i+1], this.titles[i+2]);
        }

        prev(e){
            e.preventDefault();
            let i = this.images.findIndex(image=>image === this.url);
            if (i === 0){i = this.images.length}
            this.loadImage(this.images[i-1], this.titles[i]);
        }

        buildDOM (url){
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

        this.createMedia = function (extension) {
            // var media = this.media;
 
            if (extension === "jpg") {
                media = new Image();
            } else if (extension === "mp4") {
                media = new Video();
            } 

            // media.extension = extension;
     
            // media.say = function () {
            //     log.add(this.extension + ": rate " + this.contentHTML + "/hour");
            // }
     
            return media;    
        }
    }
     
    var Image = function () {     
// debugger
        console.log("c'est une image");
        med =     
        this.contentHTML=`<article><a href="./images/${zeroSpaceFolder}/${med.image}"><img src="./images/${zeroSpaceFolder}/${med.image}"  alt="${med.title}"></a><h4>${med.title}</h4><span>${med.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="${media.title}"></article>`;     
    };
     
    var Video = function () {
        console.log("c'est une video"); 
        this.contentHTML = "c'est une video";
    };   
     
    // log helper
    // var log = (function () {
    //     var log = "";
     
    //     return {
    //         add: function (msg) { log += msg + "\n"; },
    //         show: function () { console.log(log); log = ""; }
    //     }
    // })();
     
    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    function run() {
        var media = medias.filter( ({ photographerId }) => photographerId.toString() === myID ) ;
        var factory = new MediasFactory();
        var extension ;
        media.map(med=>{
            extension = med.image ?  getFileExtension(med.image) : getFileExtension(med.video);
            if (extension==="jpg"){
                console.log(med.image);
                console.log(extension);        
                media.push(factory.createMedia("jpg")); 
            
                myPortofolioHTML.innerHTML  +=  `<article><a href="./images/${zeroSpaceFolder}/${med.image}"><img src="./images/${zeroSpaceFolder}/${med.image}"  alt="${med.title}"></a><h4>${med.title}</h4><span>${med.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="${media.title}"></article>`;       
            }else if (extension==="mp4"){
                console.log(med.video);
                console.log(extension);
                media.push(factory.createMedia("mp4"));
                myPortofolioHTML.innerHTML  += `<video controls width="350px" height="300px">
                <source src="./images/${zeroSpaceFolder}/${med.video}" type="video/mp4">Sorry, your browser doesn't support embedded videos.</video>`;

            }            
// heartLikesHandler()
        }) 

        // media.push(factory.createMedia("jpg"));
        // media.push(factory.createMedia("mp4"));
        
        // console.log(media)
        // for (var i = 0, len = media.length; i < len; i++) {
        //     media[i].say()
        // }
     
        // log.show();
    }

    run();




}