import Particles from "./particles.js";

document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.swiper.slider', {
        speed: 2400,
        // loop: true,
        // freeMode: true,
        mousewheel: {
            enabled: true,
            speed: 2.4  
        },
        spaceBetween: 30,
        effect: 'slides',
        // autoplay: {
        //     delay: 5000
        // },
        parallax: true,
        keyboard:{
            enabled: true
        }
    })

    const particles = new Particles('.particles')
});