'use strict';

window.onload = function(){

    var titleElemList = [].slice.call(document.getElementsByClassName('exp-title'));
    var title_1 = titleElemList[0];
    var title_2 = titleElemList[1];
    var title_3 = titleElemList[2];
    var title_4 = titleElemList[3];
    var title_5 = titleElemList[4];
    var titleOffset = title_1.offsetTop;

    function goScroll() {

        if (window.pageYOffset >= titleOffset - 78) {
            title_1.classList.add("sticky")
        } else {
            title_1.classList.remove("sticky");
        }

        if (window.pageYOffset >= titleOffset + 128) {
            title_2.classList.add("sticky-2")
        } else {
            title_2.classList.remove("sticky-2");
        }

        if (window.pageYOffset >= titleOffset + 334) {
            title_3.classList.add("sticky-3")
        } else {
            title_3.classList.remove("sticky-3");
        }
        if (window.pageYOffset >= titleOffset + 540) {
            title_4.classList.add("sticky-4")
        } else {
            title_4.classList.remove("sticky-4");
        }
        if (window.pageYOffset >= titleOffset + 752) {
            title_5.classList.add("sticky-5")
        } else {
            title_5.classList.remove("sticky-5");
        }
    }
    
    window.onscroll = function () {
        goScroll();
    }
}


