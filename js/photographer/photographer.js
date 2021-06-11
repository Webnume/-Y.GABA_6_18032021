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
    let zeroSpace=(photographer.name).replace(/ +/g, "");

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

            myArticleBanner.innerHTML = 
            '<div><img src="./images/'+zeroSpace+'/'+homePicture+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><ul></ul><button>Contactez-moi</button><p class="priceBottom">'+photographer.price+'€/jour</p>';



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
    var filtersTab = ["Popularit&eacute;", "Date", "Titre"];  

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
                console.log(filterSelect.textContent);
               
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
                    console.log("dada");
                    media = media.sort((a,b) => new Date(b.date) - new Date(a.date));
                    displayPortofolio ();
                    heartLikesHandler();

                }else if(filterSelect.textContent==="Popularité") {
                    console.log("pop");                   
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
                <img src="./images/MimiKeel/${medi.image}"  alt="${medi.title}">
                <h4>${medi.title}</h4>
                <span>${medi.likes}</span>
                <img  src="./images/heart-solid.svg" alt="${medi.title}">        
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






}