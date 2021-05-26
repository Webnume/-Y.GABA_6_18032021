export default function showPhotographers (jsonObj) {
  
  console.log(jsonObj);

  var section = document.querySelector('section');
  var photographers = jsonObj;

  photographers.map(photographer => {
    // console.log(obj)
   
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
    '<a href="./photographer.html?id='+photographer.id+'"><div><img src="./images/'+zeroSpace+'/'+homePicture+'" alt="'+photographer.name+'"></div><h2>'+photographer.name+'</h2></a><p>'+photographer.city+', '+photographer.country+'</p><p>'+photographer.tagline+'</p><p>'+photographer.price+'€/jour</p><ul></ul>'


    var tags = photographer.tags;
    var myTags = myArticle.querySelector('ul');
    for (var j = 0; j < tags.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = "#"+tags[j]+" ";
      myTags.appendChild(listItem);
    }

    section.appendChild(myArticle);

  
  });



  // for (var i = 0; i < photographers.length; i++) {
  //   var myArticle = document.createElement('article');
  //   var divImg = document.createElement('div');    
  //   var myH2 = document.createElement('h2');
  //   var myCity = document.createElement('p');
  //   var mymyTagLine = document.createElement('p');
  //   var myPrice = document.createElement('p');
  //   var myTags = document.createElement('ul');


  //   divImg.setAttribute("id", photographers[i].id); 
  //   myH2.setAttribute("id", photographers[i].id); 
  //   myCity.textContent = photographers[i].city+", "+photographers[i].country;
  //   mymyTagLine.textContent = photographers[i].tagline;
  //   myPrice.textContent = photographers[i].price+"€/jour";

    
  //   var tags = photographers[i].tags;
  //   for (var j = 0; j < tags.length; j++) {
  //     var listItem = document.createElement('li');
  //     listItem.textContent = "#"+tags[j]+" ";
  //     myTags.appendChild(listItem);
  //   }
  //   myArticle.appendChild(divImg);
  //   myArticle.appendChild(myH2);
  //   myArticle.appendChild(myCity);
  //   myArticle.appendChild(mymyTagLine);
  //   myArticle.appendChild(myPrice);
  //   myArticle.appendChild(myTags);

  

  // }




}


