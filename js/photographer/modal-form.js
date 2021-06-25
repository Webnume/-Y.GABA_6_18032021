export default function formHandler () {
    // DOM Elements
    const modalbg = document.querySelector("#form-modal");
    const modalBtn = document.querySelector(".contactButton");
    const formData = document.querySelectorAll(".formData");
    const modalCloser = document.querySelector(".close");
    const first = document.querySelector("#first");
    const last = document.querySelector("#last");
    const email = document.querySelector("#email"); 
    let message = document.querySelector("#message");
    const form = document.querySelector("#form-modal > form");   
    const btnSubmit = document.querySelector(".btn-submit");


    // launch modal event
    modalBtn.addEventListener("click", launchModal);
    // launch modal form
    function launchModal() {
      modalbg.style.display = "block";
    }
    // close modal event
    modalCloser.addEventListener("click", closeModal);
    // close modal form
    function closeModal() {
      modalbg.style.display = "none";
    }


    function validateTextInput(text) {
      const re = /^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*$/;
      return re.test(text);
    }  

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }  


    function firstCheck(){
      if(first.value.length < 2 || !validateTextInput(first.value) ){
          formData[0].dataset.errorVisible = "true";
          return false;
        }
          formData[0].dataset.errorVisible = "";
          return true;
    }

    function lastCheck(){
      if(last.value.length < 2 || !validateTextInput(last.value) ){        
        formData[1].dataset.errorVisible = "true";
        return false;
      }else{
        formData[1].dataset.errorVisible = "";
        return true;
      }
    }

    function emailCheck(){
      if (!(validateEmail(email.value))){    
        formData[2].dataset.errorVisible = "true";
        return false;
      }
      else{
        formData[2].dataset.errorVisible = "";
        return true;
      }
    }

    function allFieldsChecking(){
      firstCheck();
      lastCheck();
      emailCheck();    
    }

    function allFieldsChecked(){
      if(
        firstCheck()===true &&
        lastCheck()===true &&
        emailCheck()===true 
      ){
        return true;
      }else{
        return false;
      }
    }

    function successValidForm(){

      for (let i=0; i < formData.length; i++){
        
      formData[i].style.opacity="0";        
      }
      first.disabled=true;
      last.disabled=true;
      email.disabled=true;
      document.querySelector("input:not([type=button])").style.opacity="0";
      formData[3].style.opacity="1";
      formData[3].innerHTML="Merci ! Votre message a été envoyé.";

      
      console.log(`Prénom : ${first.value} \n Nom : ${last.value} \n Email : ${email.value} \n Message : ${message.value}`); 

      btnSubmit.value="Fermer";
      document.querySelector("form").setAttribute("onsubmit", "");

      if(btnSubmit.value==="Fermer"){        
        btnSubmit.addEventListener("click", () => {
          closeModal();
        }, false);    
      } 
    }

    function validationForm(){
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (allFieldsChecked()===true){
          successValidForm();
        }else{
          allFieldsChecking();
        }
      });
    }  

    
    validationForm();

}
