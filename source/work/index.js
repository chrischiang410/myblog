'use strict';

window.onload = function () {

    var titleElemList = [].slice.call(document.getElementsByClassName('exp-title'));
    var titleOffset = titleElemList[0].offsetTop;

    function goScroll() {

        for (var i = 0; i < 5; i++) {
            if (window.pageYOffset >= (titleOffset - 78) + 206 * i) {
                titleElemList[i].classList.add("sticky")
            } else {
                titleElemList[i].classList.remove("sticky");
            }
        }
    }

    window.onscroll = function () {
        goScroll();
    }
}


