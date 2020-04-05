export default class ShowContent {
   constructor(trigger) {
      this.btnsPlus = document.querySelectorAll(trigger);
   }

   showContent() {
      this.btnsPlus.forEach(btn => {
         btn.addEventListener('click', () => {
            const sibling = btn.closest('.module__info-show').nextElementSibling;
            sibling.classList.toggle('msg');
            sibling.style.marginTop = "20px";

            sibling.classList.add('animated');
            sibling.classList.toggle('fadeIn');
         });
      });

      
   }

   init() {
      this.showContent();
   }
}