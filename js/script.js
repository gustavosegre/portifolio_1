document.addEventListener("DOMContentLoaded", function(){
    const slides = document.querySelectorAll(".slide");
    let currentSlideIndex = 0;
    let isAnimating = false;
    let currentTopValue = 0;

    const elements = [
        {selector: ".title", delay: 0},
        {selector: ".text1", delay: 0.5},
        {selector: ".text2", delay: 1.5},
        {selector: ".text3", delay: 2.0},
        {selector: ".text4", delay: 2.5},
        {selector: ".text5", delay: 3}

    ];

    slides.forEach((slide, idx) => {
        if (idx !== 0) {
            const video = slide.querySelector("video");
            gsap.set(video, {scale: 2, top: "4em"});
        }
    });

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const video = slide.querySelector("video");

        currentTopValue -= 30;

        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: "power4.inOut",
                delay: elem.delay,
                filter: "blur(1.25px)",
                onComplete: () => {
                    gsap.to(document.querySelector(elem.selector), { filter: "blur(0px)", duration: 0.2 });
                }

            });
        });

        gsap.to(video, {
            scale: 1,
            top: "0%",
            duration: 2,
            ease: "power3.inOut",
        });

        gsap.to(slide, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 2,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimating = false;
            },
        }, "<");
    }

    function hideSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const video = slide.querySelector("video");

        currentTopValue += 30;

        
        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: "power4.inOut",
                delay: elem.delay,
                
                
            });
        });

        gsap.to(slide, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 2,
            ease: "power4.inOut",
        });

        gsap.to(video, {
            scale: 2,
            top: "4em",
            duration: 2,
            ease: "power3.inOut",
            onComplete: () => {
                isAnimating = false;
            },
        });
    }

    window.addEventListener("wheel", (e) => {
        if (isAnimating) return;  // Impede múltiplas animações
        if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
            currentSlideIndex++;
        } else if (e.deltaY < 0 && currentSlideIndex > 0) {
            hideSlide(currentSlideIndex);
            currentSlideIndex--;
        }
    });

});