export default class Lightbox {

    constructor(url ,images, title, titles,altText,altTexts){
        this.element = this.buildDOM();
        this.images = images;
        this.titles=titles;
        this.altTexts=altTexts;
        this.loadImage(url, title,altText);
        this.onKeyUp=this.onKeyUp.bind(this);
        portofolio.appendChild(this.element);
        document.addEventListener('keyup',this.onKeyUp)
    }

    getFileExtension(filename) {
        return filename.split('.').pop();
    }

    loadImage (url, title,altText){
        this.url = null;            
        const titleHTML = document.createElement("h4");
        const image = document.createElement("img");
        const video = document.createElement("video");
        const container = this.element.querySelector('.lightbox__container');
        const loader = document.createElement('div');
        loader.classList.add("lightbox__loader");
        container.innerHTML = '';
        container.appendChild(loader);

        if(this.getFileExtension(url)==="jpg"){         
            image.onload = ()=>{
                container.removeChild(loader);
                image.setAttribute("title", title);
                image.setAttribute("alt", altText);
                titleHTML.textContent=title;
                container.appendChild(image);
                container.appendChild(titleHTML);
                this.url = url ;                
            }
            image.src = url;
        }
        else if(this.getFileExtension(url)==="mp4"){     
                container.removeChild(loader);
                container.appendChild(video);
                titleHTML.textContent=title;
                container.appendChild(titleHTML);
                this.url = url ; 
                video.src = url;
                video.setAttribute("controls", "controls")
                video.setAttribute('role', 'button');
                video.setAttribute("title", title);
                video.setAttribute("alt", altText);

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
        this.loadImage(this.images[i+1], this.titles[i+1], this.altTexts[i+1]);
    }

    prev(e){
        e.preventDefault();
        let i = this.images.findIndex(image=>image === this.url);
        if (i === 0){i = this.images.length}
        this.loadImage(this.images[i-1], this.titles[i-1], this.altTexts[i+1]);
    }

    buildDOM (){
        const dom = document.createElement('div');
        dom.setAttribute("aria-label","image closeup view");
        dom.classList.add("lightbox");
        dom.innerHTML=`
        <button class="lightbox__closer" aria-label="Close dialog"></button>
        <button class="lightbox__next"  aria-label="Next image"></button>                
        <button class="lightbox__prev"  aria-label="Previous image"></button>
        <div class="lightbox__container"></div>
        </div>`;
        dom.querySelector('.lightbox__closer').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
        return dom;
    }

}