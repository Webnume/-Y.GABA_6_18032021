export default class MediaFactory{
  constructor(domTarget, props){
    this.id = props.id;
    this.test = props.test;
    this.photographerId=props.photographerId;
    this.title=props.title;
    this.image=props.image;
    this.tags=props.tags;
    this.likes=props.likes;
    this.date=props.date;
    this.price=props.price;
    this.altText=props.altText;
    this.zeroSpaceFolder=props.zeroSpaceFolder;
    this.extension="" ;
    this.DOM = document.createElement("article");
    domTarget.appendChild(this.DOM);
    this.render();
  }

  render(){
    this.DOM.innerHTML = (this.getFileExtension(this.image)==="jpg") ?  this.templateImg() : this.templateVideo();
  }
 
  getFileExtension(filename) {
    return filename.split('.').pop();
  }

  templateVideo () {
    return `
    <video controls width="350px" height="300px" src="./images/${this.zeroSpaceFolder}/${this.image}" type="video/mp4" class="medias" alt="${this.altText}">Sorry, your browser doesn't support embedded videos.</video><h4>${this.title}</h4><span>${this.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="likes">
  `;
  }

  templateImg(){
    return `
      <img src="./images/${this.zeroSpaceFolder}/${this.image}" title="${this.title}" alt="${this.altText}" class="medias" tabindex="0"><h4>${this.title}</h4><span>${this.likes}</span><img  class="heart-likes" src="./images/heart-solid.svg" alt="likes">
    `;
  }

}