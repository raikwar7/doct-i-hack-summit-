 document.addEventListener("DOMContentLoaded", function() {
     let selectBox = document.querySelector("select[name='symptoms']");
     selectBox.addEventListener("change", function() {
         let selectedOptions = [...this.selectedOptions].map(opt => opt.value);
         console.log("Selected Symptoms:", selectedOptions);
     });
 });