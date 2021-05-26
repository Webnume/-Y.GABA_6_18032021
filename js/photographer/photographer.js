export default function showPhotographerProfil (jsonObj) {
  
    console.log(jsonObj);

    var section = document.querySelector('section');
    var photographers = jsonObj;

    // réupération de l'id de la page courante
    var myID = window.location.search.split("=").pop();

    // réupération du photographe avec l'id de la page courante
    var photographer = photographers.find( ({ id }) => id.toString() === myID );

    console.log(photographer);
    console.log(myID);

   
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
    }

    myArticle.innerHTML = 
    '<div><img src="./images/'+zeroSpace+'/'+homePicture+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><ul></ul>'


    var tags = photographer.tags;
    var myTags = myArticle.querySelector('ul');
    for (var j = 0; j < tags.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = "#"+tags[j]+" ";
    myTags.appendChild(listItem);
    }

    section.appendChild(myArticle);


}


