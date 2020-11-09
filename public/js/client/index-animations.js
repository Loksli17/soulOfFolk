let
    bundleCase = 0,
    bundleSec = document.getElementById('bundleSec'),
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
    closeButton = document.querySelector(".close"),
    bundleScrollLeft = document.getElementById("bundleScrollLeft"),
    bundleScrollRight = document.getElementById("bundleScrollRight");

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

function fadeIn(element, time) {
    element.style.display = 'flex';
    let
        op = 0.1,
        timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, time);
}

function fadeOut(element, time) {
    let
        op = 1,
        timer = setInterval(function () {
       if (op <= 0.1){
           clearInterval(timer);
           element.style.display = 'none';
       }
       element.style.opacity = op;
       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
       op -= op * 0.1;
   }, time);
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
                fadeIn(dvbundle, 20);
                break;
            case 1:
                item.classList.add('active');
                bundles.appendChild(ussrbundle);
                fadeIn(ussrbundle, 20);
                break;
            case 2:
                item.classList.add('active');
                bundles.appendChild(rusbundle);
                fadeIn(rusbundle, 20);
                break;
        }
    }
});

function addSecs(amount) {

    for (let i = 0; i < amount; i++) {
        addSec();
    }

    function addSec() {
        let
            section = document.createElement('span');
        section.classList.add('section');
        bundleSec.appendChild(section);
    };

    bundleSec.children[0].classList.add("active");
}

arrows.onclick = function() {
    smoothScroll(1000);
}

bundleInfo.forEach((item, i) => {
    item.onclick = function() {
        document.body.appendChild(bundlesCollection);

        switch (i) {
            case 0:
                bundleCase = 0;
                fadeIn(dvbundles[0], 20);
                dvbundles[0].style.zIndex = 9999
                addSecs(4);

                bundleScrollLeft.style.display = 'none';
                break;
            case 1:
                bundleCase = 1;
                fadeIn(ussrbundles[0], 20);
                ussrbundles[0].style.zIndex = 9999;
                addSecs(2);

                bundleScrollLeft.style.display = 'none';
                break;
            case 2:
                bundleCase = 2;
                fadeIn(rusbundles[0], 20);
                rusbundles[0].style.zIndex = 9999;
                addSecs(1);

                bundleScrollLeft.style.display = 'none';
                bundleScrollRight.style.display = 'none';
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

    bundleScrollLeft.style.display = 'block';
    bundleScrollRight.style.display = 'block';

    while (bundleSec.firstChild) {
        bundleSec.removeChild(bundleSec.lastChild);
    }
}

bundleScrollLeft.onclick = function() {
    scroll('l');
}

bundleScrollRight.onclick = function() {
    scroll('r');
}

function scroll(side) {
    let activeIndex = 0;
    for (let i = 0; i < bundleSec.children.length; i++) {
        if (bundleSec.children[i].classList.contains('active')) {
            activeIndex = i;
            break;
        }
    }

    switch (side) {
        case 'r':
            bundleSec.children[activeIndex].classList.remove('active');
            bundleSec.children[activeIndex+1].classList.add('active');

            bundleDisplay(bundleCase, activeIndex, 'r');
            activeIndex++;
            break;
        case 'l':
            bundleSec.children[activeIndex].classList.remove('active');
            bundleSec.children[activeIndex-1].classList.add('active');

            bundleDisplay(bundleCase, activeIndex, 'l');
            activeIndex--;
            break;
    }

    bundleScrollLeft.style.display = 'block';
    bundleScrollRight.style.display = 'block';
    if (activeIndex == 0) {
        bundleScrollLeft.style.display = 'none';
    }
    if (activeIndex == bundleSec.children.length-1) {
        bundleScrollRight.style.display = 'none';
    }
}

function bundleDisplay(bunCase, index, side) {
    let addition = side == 'l' ? -1 : 1;
    switch (bunCase) {
        case 0:
            fadeOut(dvbundles[index], 20);
            fadeIn(dvbundles[index+addition], 20);
            break;
        case 1:
            fadeOut(ussrbundles[index], 20);
            fadeIn(ussrbundles[index+addition], 20);
            break;
        case 2:
            fadeOut(rusbundles[index], 20);
            fadeIn(rusbundles[index+addition], 20);
            break;
    }
}

bundlesCollection.remove();
windowResize();
window.addEventListener("resize", windowResize);
