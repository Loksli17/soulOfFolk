let
    bundles = document.querySelector(".bundles"),
    dvbundle = document.querySelector(".dv-bundle"),
    ussrbundle = document.querySelector(".ussr-bundle"),
    rusbundle = document.querySelector(".rus-bundle"),
    selector = document.querySelectorAll(".selector"),
    bundlesCollection = document.getElementById("bundleCol"),
    arrows = document.getElementById("arrows"),
    bundleInfo = document.querySelectorAll(".bundleInfo"),
    dvbundles = document.querySelectorAll(".dvbundle"),
    ussrbundles = document.querySelectorAll(".ussrbundle"),
    rusbundles = document.querySelectorAll(".rusbundle"),
    closeButton = document.querySelector(".close");

let windowResize = function() {
    if (window.matchMedia("(max-width: 900px)").matches) {
        let x = document.querySelectorAll(".arrow-stick");
        x.forEach((item, i) => {
            item.classList.add('arrow-mobile');
        });
        ussrbundle.remove();
        rusbundle.remove();
    }
    else {
        let x = document.querySelectorAll(".arrow-stick");
        x.forEach((item, i) => {
            item.classList.remove('arrow-mobile');
        });
        while (bundles.firstChild) {
            bundles.removeChild(bundles.lastChild);
        }
        bundles.appendChild(dvbundle);
        bundles.appendChild(ussrbundle);
        bundles.appendChild(rusbundle);

        dvbundle.style.opacity = 1;
        ussrbundle.style.opacity = 1;
        rusbundle.style.opacity = 1;
    }
}

function smoothScroll(duration){
    let
        target = document.getElementById("bundleVar");
        targetPosition = target.offsetTop,
        startPosition = window.pageYOffset,
        distance = targetPosition - startPosition - 50,
        startTime = null;

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime,
            run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) window.requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    window.requestAnimationFrame(animation);

}

function fadeIn(el, time) {
    el.style.opacity = 0;

    let last = +new Date(),
        tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

  tick();
};

function fadeOut(el, time) {
    el.style.opacity = 1;

    let last = +new Date(),
        tick = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

  tick();
};

selector.forEach((item, i) => {
    item.onclick = function() {
        fadeOut(bundles.children[0], 10);
        bundles.removeChild(bundles.children[0]);
        selector.forEach((sel, x) => {
            sel.classList.remove('active');
        });
        switch (i) {
            case 0:
                item.classList.add('active');
                bundles.appendChild(dvbundle);
                fadeIn(dvbundle, 1000);
                break;
            case 1:
                item.classList.add('active');
                bundles.appendChild(ussrbundle);
                fadeIn(ussrbundle, 1000);
                break;
            case 2:
                item.classList.add('active');
                bundles.appendChild(rusbundle);
                fadeIn(rusbundle, 1000);
                break;
        }
    }
});

arrows.onclick = function() {
    smoothScroll(1000);
}

bundleInfo.forEach((item, i) => {
    item.onclick = function() {
        document.body.appendChild(bundlesCollection);
        console.log(i);
        switch (i) {
            case 0:
                dvbundles[0].style.opacity = 1;
                dvbundles[0].style.zIndex = 9999;
                break;
            case 1:
                ussrbundles[0].style.opacity = 1;
                ussrbundles[0].style.zIndex = 9999;
                break;
            case 2:
                rusbundles[0].style.opacity = 1;
                rusbundles[0].style.zIndex = 9999;
                break;

        }
        document.body.classList.add('stop-scrolling');
    }
})

closeButton.onclick = function() {
    document.body.classList.remove('stop-scrolling');
    document.body.removeChild(bundlesCollection);

    let fade = function(elem) {
        elem.forEach((item, i) => {
            item.style.opacity = 0;
            item.style.zIndex = 10;
        })
    }

    fade(dvbundles);
    fade(ussrbundles);
    fade(rusbundles);
}

bundlesCollection.remove();
windowResize();
window.addEventListener("resize", windowResize);
