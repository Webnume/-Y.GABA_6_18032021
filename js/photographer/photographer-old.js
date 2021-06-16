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
    let media = medias.filter( ({ photographerId }) => photographerId.toString() === myID );

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
    

    // displayPortofolio ();
    function displayPortofolio (){
        myPortofolioHTML.innerHTML = media.map(medi=> {
            return `<article>
                <a href="./images/${zeroSpaceFolder}/${medi.image}"><img src="./images/${zeroSpaceFolder}/${medi.image}"  alt="${medi.title}"></a>                
                <h4>${medi.title}</h4>
                <span>${medi.likes}</span>
                <img  class="heart-likes" src="./images/heart-solid.svg" alt="${medi.title}">        
            </article>`;
            
        }).join('');
    }

    function heartLikesHandler(){
        let hearts = document.querySelectorAll("#portofolio > div.container > article > img:nth-child(4)");
        hearts.forEach(heart=>heart.addEventListener("click", (event) =>{media.map(medi=>  {
                let like = heart.parentNode.querySelector("span");
                if(medi.title===event.target.getAttribute("alt")){
                    medi.likes++;
                    like.innerHTML=medi.likes;
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

    class Lightbox {
        static init(){
            const links =document.querySelectorAll('a[href$=".jpg"]')
            .forEach(link=>link.addEventListener('click', e => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute('href'));
            }))
        }

        constructor(url){
            // this.url=url;
            const element = this.buildDOM(url);
            document.body.appendChild(element);
        }

        buildDOM (url){
            const dom = document.createElement('div');
            dom.classList="lightbox";
            dom.innerHTML=`
            <button class="lightbox__closer"></button>
            <button class="lightbox__next"></button>                
            <button class="lightbox__prev"></button>
            <div class="lightbox__container">
              <img src="${url}" alt="">
            </div>`
            return dom;
        }




    //    let lightbox = document.querySelector("#portofolio > div.lightbox");
    //    let lightboxCloser = document.querySelector("#portofolio > div.lightbox > .lightbox__closer");

    //    lightboxCloser.addEventListener("click", ()=>lightbox.style.display="none");


    }
    new Lightbox();
    

    function MediasFactory() {
        this.createMedia = function (type) {
            var media;
     
            if (type === "image") {
                media = new Image();
            } else if (type === "video") {
                media = new Video();
            } 
     
            media.type = type;
     
            media.say = function () {
                log.add(this.type + ": rate " + this.extension + "/hour");
            }
     
            return media;
        }
    }
     
    var Image = function () {
        this.extension = ".jpg";
    };
     
    var Video = function () {
        this.extension = ".mp4";
    };
     
    // log helper
    var log = (function () {
        var log = "";
     
        return {
            add: function (msg) { log += msg + "\n"; },
            show: function () { alert(log); log = ""; }
        }
    })();
     
    function run() {
        var medias = [];
        var factory = new Factory();
     
        medias.push(factory.createMedia("fulltime"));
        medias.push(factory.createMedia("parttime"));
        
        for (var i = 0, len = medias.length; i < len; i++) {
            medias[i].say();
        }
     
        log.show();
    }

    run();




}