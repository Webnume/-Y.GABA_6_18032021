//DOM selection
var header = document.querySelector('header');
var section = document.querySelector('section');
var tagsTopMenu = [];

var requestURL = 'FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text'; // now we're getting a string!
request.send();

request.onload = function() {
  var photographersText = request.response; // get the string from the response
  var Photographers = JSON.parse(photographersText); // convert it to an object
  showPhotographers(Photographers);
  headerImplement(Photographers);
}

function headerImplement(jsonObj) {
  var myImg = document.createElement('img');
  myImg.src = "./images/logo_fishEye.svg";
  header.appendChild(myImg);

  var myPara = document.createElement('nav');
  // myPara.textContent = tagsTopMenu.map(x => " #"+x);
  myPara.innerHTML = "<ul><li>#Portrait</li><li>#Art</li><li>#Fashion</li><li>#Architecture</li><li>#Travel</li><li>#Sport</li><li>#Animals</li><li>#Events</li></ul>";
  header.appendChild(myPara);

  var myH1 = document.createElement('h1');
  myH1.textContent = "Nos photographes";
  section.appendChild(myH1);

}


function showPhotographers(jsonObj) {
  var photographers = jsonObj['photographers'];

  for (var i = 0; i < photographers.length; i++) {
    var myArticle = document.createElement('article');
    var myPara0 = document.createElement('div');    
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    var homePicture="";
    let zeroSpace=(photographers[i].name).replace(/ +/g, "");

    switch (photographers[i].name) {
      case "Mimi Keel":
        homePicture="Portrait_Nora.jpg";     
        myPara0.setAttribute("background-size","400%");   
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
    
    myPara0.style.backgroundImage='url(./images/'+zeroSpace+'/'+homePicture+')';
    myPara0.setAttribute("alt","photo de "+photographers[i].name); 

    myH2.textContent = photographers[i].name;
    myPara1.textContent = photographers[i].city+", "+photographers[i].country;
    myPara2.textContent = photographers[i].tagline;
    myPara3.textContent = photographers[i].price+"€/jour";

    
    var tags = photographers[i].tags;
    for (var j = 0; j < tags.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = "#"+tags[j]+" ";
      myList.appendChild(listItem);

      if(!(tagsTopMenu.includes(tags[j]))){
        tagsTopMenu.push(tags[j])
      }

    }
    myArticle.appendChild(myPara0);
    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}


var requestURL = 'FishEyeData.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text'; // now we're getting a string!
request.send();



// function getJson() {
//     fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json")
//     .then(function(res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function(value) {
//         cardDisplay.innerHTML=value.queryString.greetings;
//     })
//     .catch(function(err) {
//       // Une erreur est survenue
//     });
//   }
  
//   document
//     cardDisplay.addEventListener("click", getJson);
request.onload = function() {
  var photographersText = request.response; // get the string from the response
  var Photographers = JSON.parse(photographersText); // convert it to an object
  showPhotographers(Photographers);
  headerImplement(Photographers);
}





  
// function Factory() {
//     this.createEmployee = function (type) {
//         var employee;
 
//         if (type === "fulltime") {
//             employee = new FullTime();
//         } else if (type === "parttime") {
//             employee = new PartTime();
//         } else if (type === "temporary") {
//             employee = new Temporary();
//         } else if (type === "contractor") {
//             employee = new Contractor();
//         }
 
//         employee.type = type;
 
//         employee.say = function () {
//             log.add(this.type + ": rate " + this.hourly + "/hour");
//         }
 
//         return employee;
//     }
// }
 
// var FullTime = function () {
//     this.hourly = "$12";
// };
 
// var PartTime = function () {
//     this.hourly = "$11";
// };
 
// var Temporary = function () {
//     this.hourly = "$10";
// };
 
// var Contractor = function () {
//     this.hourly = "$15";
// };
 
// // log helper
// var log = (function () {
//     var log = "";
 
//     return {
//         add: function (msg) { log += msg + "\n"; },
//         show: function () { alert(log); log = ""; }
//     }
// })();
 
// function run() {
//     var employees = [];
//     var factory = new Factory();
 
//     employees.push(factory.createEmployee("fulltime"));
//     employees.push(factory.createEmployee("parttime"));
//     employees.push(factory.createEmployee("temporary"));
//     employees.push(factory.createEmployee("contractor"));
    
//     for (var i = 0, len = employees.length; i < len; i++) {
//         employees[i].say();
//     }
 
//     log.show();
// }