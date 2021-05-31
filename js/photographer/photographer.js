export default function showPhotographerProfil (jsonObj) {     
    var photographers = jsonObj.photographers;
    var media = jsonObj.media;
    var banner = document.getElementById('banner');
    var portofolio = document.getElementById('portofolio');    
    // réupération de l'id de la page courante
    var myID = window.location.search.split("=").pop();
    // réupération du photographe avec l'id de la page courante
    var photographer = photographers.find( ({ id }) => id.toString() === myID );

    // console.log(myID);
    // console.log(jsonObj);
    // console.log(photographers);
    // console.log(media);

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
            var myTags = myArticleBanner.querySelector('ul');
            for (var j = 0; j < tags.length; j++) {
                var listItem = document.createElement('li');
                listItem.textContent = "#"+tags[j]+" ";
                myTags.appendChild(listItem);
            }

    }
    

    // Portofolio
    var myArticleportofolio = document.createElement('article');
    var filter = document.querySelector('.filter');     
    var filtersTab = ["Popularité", "Date", "Titre"];  


    function filterMenu(){          
        for (let i = 0; i < filtersTab.length; i++){
            var span = document.createElement('span');
            span.innerHTML=filtersTab[i];              
            filter.appendChild(span);                
            span.classList="hidden";
            if (i==0){
                span.classList="topFilterInMenu";  
                var imgWrap = document.createElement('img');
                imgWrap.src = './images/dropdown-close.svg'
                imgWrap.classList="arrow";              
                span.appendChild(imgWrap);
            }            
        }

        const menuFirstElem = document.querySelector('.topFilterInMenu');
        const lastSpans = filter.querySelectorAll("span:not(.topFilterInMenu)");

        menuFirstElem.addEventListener("click", () => {    
            lastSpans.forEach((span)=>span.classList.toggle("hidden"));
            imgWrap.classList.toggle("up");            
        });            

    }



// affichage du menu de tri
    bannerDisplay();
    filterMenu();


    myArticleportofolio.innerHTML ='<P></P>';


    banner.appendChild(myArticleBanner);
    portofolio.appendChild(myArticleportofolio);


}


