import Slider from './slider';


export default class MiniSlider extends Slider {
   constructor(container, prev, next, activeClass, animate, autoplay, paused) {
      super(container, prev, next, activeClass, animate, autoplay, paused);
   }
   decorizeSlides() {
      this.slides.forEach(slide => {
         slide.classList.remove(this.activeClass);
         if (this.animate) {
            slide.querySelector('.card__title').style.opacity = '0.4';
            slide.querySelector('.card__controls-arrow').style.opacity = '0';
         }

      });
      
      if(!this.slides[0].closest('button')) {
         this.slides[0].classList.add(this.activeClass);
      }
      if (this.animate) {
         this.slides[0].querySelector('.card__title').style.opacity = '1';
         this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
      }
   }

   nextSlide() {
      if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); //Slide
            this.container.appendChild(this.slides[1]); //Btn
            this.container.appendChild(this.slides[2]); //Btn
            this.decorizeSlides();
         } else if (this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]); //Slide
            this.container.appendChild(this.slides[1]); //Btn
            this.decorizeSlides();
         } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
         }
   }


   bindTriggers() {
      

      this.next.addEventListener('click', () => {
         this.nextSlide();
      });

      this.prev.addEventListener('click', () => {

         for (let i = this.slides.length - 1; i > 0; i--) {
            if (this.slides[i].tagName !== 'BUTTON'){
               let active = this.slides[i];
               this.container.insertBefore(active, this.slides[0]);
               this.decorizeSlides();  
               break;
            }
         }
      });
   }

   activadAnimation() {
      if (this.autoplay) {
         this.paused = setInterval(() => this.nextSlide(), 5000);
      }
   }

   pausedAutoplay(trigger) {
      trigger.parentNode.addEventListener('mouseenter', () => {
         clearInterval(this.paused);
      });
   }

   startedAutoplay(trigger) {
      trigger.parentNode.addEventListener('mouseleave', () => {
         this.activadAnimation();
      });
   }

   init() {
      try {
         this.container.style.cssText = `
         display: flex;
         flex-wrap: wrap;
         overflow: hidden;
         align-items: flex-start;
      `;
      
      this.bindTriggers();
      this.decorizeSlides();
      this.activadAnimation();

      this.pausedAutoplay(this.slides[0]);
      // this.pausedAutoplay(this.next);
      // this.pausedAutoplay(this.prev);
      this.startedAutoplay(this.slides[0]);
      // this.startedAutoplay(this.next);
      // this.startedAutoplay(this.prev);
      } catch (e) {}      
   }
}