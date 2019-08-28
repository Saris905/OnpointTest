'use strict';

let p1 = document.getElementById('page1'),
    p2 = document.getElementById('page2'),
    p3 = document.getElementById('page3'),
    indicator1 = document.querySelector('.page-indicator__item1'),
    indicator2 = document.querySelector('.page-indicator__item2'),
    indicator3 = document.querySelector('.page-indicator__item3'),
    scrollIndicator = document.querySelector('.scroll'),
    parallaxObject = document.querySelector('.page2__parallax'),
    speed = parallaxObject.getAttribute('data-speed'),
    startingY;


p1.addEventListener('touchstart', function (evt) {
    startingY = evt.changedTouches[0].clientY; // исходный Y
    evt.preventDefault();
    p1.style.transition = '';
    p2.style.transition = '';
});

p1.addEventListener('touchmove', function (evt) {
    let touch = evt.changedTouches[0], // Y после свайпа
        change = startingY - touch.clientY; // Y0 - Y1(<0 если только не свайпать или в обр)
    if (change < 0) {
        return;
    }
    p1.style.top = '-' + change + 'px';
    p2.style.display = 'block';
    p2.style.top = (screen.height - change) + 'px';
    evt.preventDefault();

});

p1.addEventListener('touchend', function (evt) {
    let change = startingY - evt.changedTouches[0].clientY,
        threshold = screen.height / 4;
    if (change < threshold) {
        p1.style.top = 0;
        p2.style.top = '100%';
        p2.style.display = 'none';
    } else {
        p1.style.transition = 'all ease .3s';
        p2.style.transition = 'all ease .3s';
        p1.style.top = '-100%';
        p2.style.top = '0';
        p3.style.top = '100%';
        p2.style.display = 'block';
        indicator1.classList.remove('page-indicator_selected');
        indicator2.classList.add('page-indicator_selected');
        parallaxObject.style.transform = 'translateY(0px)';
    }

});

p2.addEventListener('touchstart', function (evt) {
    startingY = evt.changedTouches[0].clientY;
    p1.style.transition = '';
    p2.style.transition = '';
    p3.style.transition = '';
    p1.style.display = 'none';
    p3.style.display = 'none';
})

p2.addEventListener('touchmove', function (evt) {
    let touch = evt.changedTouches[0],
        change = touch.clientY - startingY;
    if (change < 0) {
        p2.style.top = change + 'px';
        p3.style.display = 'block';
        p3.style.top = (screen.height + change) + 'px';
    }
    if (change > 0) {
        p1.style.display = 'block';
        p1.style.top = (change - screen.height) + 'px';
        p2.style.top = change + 'px';

    }
    parallaxObject.style.transform = `translateY(${change*speed/100}px)` // parallax

    evt.preventDefault();
});

p2.addEventListener('touchend', function (evt) {
    let change = evt.changedTouches[0].clientY - startingY,
        half = screen.height / 4;
    if (change < 0) {
        p2.style.transition = 'all ease .3s';
        p3.style.transition = 'all ease .3s';
        p2.style.top = '-100%';
        p3.style.top = '0';
        p3.style.display = 'block';
        indicator2.classList.remove('page-indicator_selected');
        indicator3.classList.add('page-indicator_selected');
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transition = 'all ease .3s';

    } else {
        p1.style.top = '-100%';
        p1.style.display = '';
        p2.style.top = '0';
        indicator2.classList.remove('page-indicator_selected');
        indicator1.classList.add('page-indicator_selected');

    }
    if (change > half) { // эффект возвращения обратно
        p1.style.transition = 'all ease .3s';
        p2.style.transition = 'all ease .3s';
        p1.style.top = '0';
        p2.style.top = '100%';
    }
});

p3.addEventListener('touchstart', function (evt) {
    startingY = evt.changedTouches[0].clientY;
    p2.style.transition = '';
    p3.style.transition = '';
    p2.style.display = 'none';
})

p3.addEventListener('touchmove', function (evt) {
    let touch = evt.changedTouches[0],
        change = touch.clientY - startingY;
    if (change < 0) {
        return;
    }
    p2.style.display = 'block';
    p2.style.top = (change - screen.height) + 'px';
    p3.style.top = change + 'px';
    evt.preventDefault();
});

p3.addEventListener('touchend', function (evt) {
    let change = evt.changedTouches[0].clientY - startingY,
        half = screen.height / 4;
    if (change < half) {
        p2.style.top = '-100%';
        p2.style.display = 'none';
        p3.style.top = '0';

    } else {
        p2.style.transition = 'all ease .3s';
        p3.style.transition = 'all ease .3s';
        p2.style.top = '0';
        p3.style.top = '100%';
        indicator3.classList.remove('page-indicator_selected');
        indicator2.classList.add('page-indicator_selected');
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transition = 'all ease .3s';
        parallaxObject.style.transform = 'translateY(0px)';
    }
});







// pages.forEach(function (item, i) {
//
//     item.addEventListener('touchstart', function (evt) {
//         evt.preventDefault();
//         startingY = evt.changedTouches[0].clientY;
//         console.log('itemstart' + i)
//     });
//     item.addEventListener('touchmove', function (evt) {
//         evt.preventDefault();
//         let touch = evt.changedTouches[0], // Y после свайпа
//             change = startingY - touch.clientY; // Y0 - Y1(<0 если только не свайпать или в обр)
//         if (change < 0) {
//             return;
//         }
//         pages.forEach(function (slide, j) {
//             slide.style.top = `-${change}px`;
//         })
//         console.log('itemmove' + i)
//     });
//     item.addEventListener('touchend', function (evt) {
//         evt.preventDefault();
//         let change = startingY - evt.changedTouches[0].clientY,
//             threshold = screen.height / 4;
//
//         if (change < threshold) {
//             translate += 100;
//             } else {
//             translate -= 100;
//         }
//
//         pages.forEach(function (slide, j) {
//             slide.style.top = `${translate}%`
//         })

//
//         console.log('itemend' + i)
//     })
// });