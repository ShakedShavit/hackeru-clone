const accessibilityIcon = document.getElementById('accessibility-icon');
const accessibilityExpandedWindow = document.getElementsByClassName('accessibility-window')[0];

const navBarLinks = document.querySelectorAll('.nav-bar__link');
const navBarLinksModals = document.querySelectorAll('.lists__container');

const navBar = document.getElementsByClassName('nav-bar')[0];

const consultationModal = document.getElementsByClassName('consultation__modal')[0];
const openConsultationModal = document.getElementById('consultation-button');
const closeConsultationModal = document.getElementById('close-modal-image__container');
const sendConsultationButton = document.getElementById('send-button');
const modalFields = document.querySelectorAll('.consultation__modal input');
const nameModalField = modalFields[0];
const phoneNumberModalField = modalFields[1];
const mailModalField = modalFields[2];

class AnimationElement {
    constructor(element, wasRevealed) {
        this.element = element,
        this.wasRevealed = wasRevealed
    }
}
//courses grid
const courses = document.getElementById('courses__container').children;
let courseObjectsArr = [];
for (let i = 0; i < courses.length; i++) {
    courseObjectsArr.push(new AnimationElement(courses[i], false));
}
//advantage headline
const advantageHeadline = document.querySelectorAll('.headline')[1];
const advantageHeadlineObj = new AnimationElement(advantageHeadline, false);
//advantages grid
const advantageGridElements = document.getElementById('advantages-grid').children;
let advantageGridObjectsArr = [];
for (let i = 0; i < advantageGridElements.length; i++) {
    advantageGridObjectsArr.push(new AnimationElement(advantageGridElements[i], false));
}
//process headline
const processHeadline = document.querySelectorAll('.headline')[2];
const processHeadlineObj = new AnimationElement(processHeadline, false);
//process steps
const processSteps = document.querySelectorAll('.process-step');
let processStepsObjectsArr = [];
for (let i = 0; i < processSteps.length; i++) {
    processStepsObjectsArr.push(new AnimationElement(processSteps[i], false));
}

//scroll text
const scrollText = document.getElementsByClassName('scroll-text')[0];


//accessibility pop-up window
accessibilityIcon.addEventListener('mouseenter', () => {
    accessibilityExpandedWindow.classList.add('visible__activated');
});
accessibilityExpandedWindow.addEventListener('mouseleave', () => {
    if (accessibilityExpandedWindow.classList.contains('visible__activated')) {
        accessibilityExpandedWindow.classList.remove('visible__activated');
    }
});



//nav bar links pop ups, and links underlines
for (let i = 0; i < navBarLinks.length - 1; i++) {
    navBarLinks[i].addEventListener('click', () => {
        if (!navBarLinksModals[i].classList.contains('lists__container-visible')) {
            navBarLinksModals[i].classList.add('lists__container-visible');
        } else {
            navBarLinksModals[i].classList.remove('lists__container-visible');
        }

        //links underline
        if (!navBarLinks[i].classList.contains('nav-bar__link-clicked')) {
            navBarLinks[i].classList.add('nav-bar__link-clicked')
        } else {
            navBarLinks[i].classList.remove('nav-bar__link-clicked')
        }
        for (let j = 0; j < navBarLinks.length - 1; j++) {
            if (i !== j) {
                if (navBarLinks[j].classList.contains('nav-bar__link-clicked')) {
                    navBarLinks[j].classList.remove('nav-bar__link-clicked')
                }
            }
        }
    });
}
//removing nav bar links pop ups (removing modals)
window.onclick = function (event) {
    if (!event.target.parentNode.parentNode.classList.contains('lists__container-visible') && event.target.parentNode.tagName !== 'UL') {
        for (let i = 0; i < navBarLinksModals.length; i++) {
            if (i <= 5 && navBarLinksModals[i].classList.contains('lists__container-visible') && (!event.target.classList.contains('nav-bar__link') || event.target !== navBarLinks[i])) {
                navBarLinksModals[i].classList.remove('lists__container-visible');
            }
        }
    }
    if (!event.target.classList.contains('nav-bar__link')) {
        for (let i = 0; i < navBarLinks.length - 1; i++) {
            if (navBarLinks[i].classList.contains('nav-bar__link-clicked')) {
                navBarLinks[i].classList.remove('nav-bar__link-clicked')
            }
        }
    }
}

const pageScrollLimit = 60;
window.onscroll = () => {
    addAnimationOnScroll()
}

addAnimationOnScroll();

function addAnimationOnScroll() {
    let observer = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting === false) {
            if (!navBar.classList.contains('nav-bar__sticky')) {
                navBar.classList.add('nav-bar__sticky');
            }
        }
        else {
            if (navBar.classList.contains('nav-bar__sticky')) {
                navBar.classList.remove('nav-bar__sticky');
            }
        }
    }, {
        threshold: [0]
    });
    observer.observe(document.getElementById('nav-bar__initial-background'));


    //courses icons animations
    for (let i = 0; i < 13; i++) {
        observer = new IntersectionObserver(function (entries, observer) {
            if (entries[0].isIntersecting === true)
            updateAnimationObject(courseObjectsArr[i]);
        }, {
            threshold: [0]
        });
        observer.observe(courses[i]);
    }


    observer = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting === true)
            updateAnimationObject(advantageHeadlineObj);
    }, {
        threshold: [0]
    });
    observer.observe(advantageHeadline);

    //advantages icons animations
    for (let i = 0; i < 7; i++) {
        observer = new IntersectionObserver(function (entries, observer) {
            if (entries[0].isIntersecting === true)
            updateAnimationObject(advantageGridObjectsArr[i]);
        }, {
            threshold: [0]
        });
        observer.observe(advantageGridElements[i]);
    }


    observer = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting === true)
            updateAnimationObject(processHeadlineObj);
    }, {
        threshold: [0]
    });
    observer.observe(processHeadline);


    observer = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting === true)
            updateAnimationObjectsArray(0, 4, processStepsObjectsArr, 'slideIn__animation');
    }, {
        threshold: [0]
    });
    observer.observe(document.querySelectorAll('.process-step')[0]);
}


function updateAnimationObject(obj, animation = 'fade-in__animation') {
    if (!obj.wasRevealed) {
        obj.wasRevealed = true;
        obj.element.classList.add(animation);
    }
}

function updateAnimationObjectsArray(start, rowLength, array, animation = 'fade-in__animation') {
    for (let i = start; i < start + rowLength && i < array.length; i++) {
        currentObj = array[i];
        updateAnimationObject(currentObj, animation);
    }
}



//opening consultation modal
openConsultationModal.addEventListener('click', () => {
    consultationModal.classList.add('consultation__modal__open');
    console.log(consultationModal.classList);
});
//closing consultation modal
closeConsultationModal.addEventListener('click', () => {
    consultationModal.classList.remove('consultation__modal__open');
});


//checking consultation fields of modal for sending
sendConsultationButton.addEventListener('click', function() {formFieldsVerifying(nameModalField, phoneNumberModalField, mailModalField)});

let firstFormInputs = document.querySelectorAll('.input-boxes__container input');
const firstFormSubmitButton = document.getElementsByClassName('form-submit__button')[0];
firstFormSubmitButton.addEventListener('click', function() {formFieldsVerifying(firstFormInputs[0], firstFormInputs[1], firstFormInputs[2])});

function formFieldsVerifying(nameModalField, phoneNumberModalField, mailModalField) {
    console.log('entered');
    let nameFieldText = nameModalField.value;
    let numberFieldText = phoneNumberModalField.value;
    let emailFieldText = mailModalField.value;

    if (nameFieldText < 2 || (/[^a-z]/g.test(nameFieldText) && /[^A-Z]/g.test(nameFieldText))) {
        nameModalField.value = '';
        nameModalField.placeholder = "* נא להזין שם תקין";
        nameModalField.classList.add('input__mistake');
    }
    if (numberFieldText.length < 10 || (/[^0-9]/g.test(numberFieldText) && /^-/g.test(numberFieldText))) {
        phoneNumberModalField.value = '';
        phoneNumberModalField.placeholder = "* נא להזין מספר טלפון";
        phoneNumberModalField.classList.add('input__mistake');
    }
    let endOfEmail = '';
    for (let i = emailFieldText.length - 4; i < emailFieldText.length; i++) {
        endOfEmail += emailFieldText[i];
    }
    if (emailFieldText.length < 7 || !emailFieldText.includes('@') || endOfEmail !== '.com') {
        mailModalField.value = '';
        mailModalField.placeholder = "* נא להזין כתובת מייל";
        mailModalField.classList.add('input__mistake');
    }
}



let isAccessibilityOptionsWindowClosed = true;
const accessibilityOptionsWindow = document.getElementsByClassName('accessibility-options')[0];
const accessibilityIconPaths = document.querySelectorAll('#accessibility-icon svg path');
const accessibilityIconBorder = document.getElementsByClassName('circle-border')[0];
accessibilityIcon.addEventListener('click', () => {
    isAccessibilityOptionsWindowClosed = false;
    makeAccessibilityVisible(accessibilityOptionsWindow);

    setTimeout(() => {
        accessibilityIconPaths[0].classList.add('path1__on-click');
        accessibilityIconPaths[1].classList.add('path2__on-click');
        accessibilityIconBorder.classList.add('circle-border__on-click');
    }, 500);
});
const openedAccessibilityWindow = document.getElementsByClassName('accessibility-options')[0];
window.addEventListener('click', function (event) {
    let isTargetAChildOfAccessibilityWindow = false;
    let isTargetAChildOfAccessibilityIcon = false;
    let checkElement = event.target;
    while (checkElement != null && !isTargetAChildOfAccessibilityWindow && !isTargetAChildOfAccessibilityIcon) {
        if (checkElement === openedAccessibilityWindow) {
            isTargetAChildOfAccessibilityWindow = true;
        }
        else if (checkElement === accessibilityIcon) {
            isTargetAChildOfAccessibilityIcon = true;
        }
        checkElement = checkElement.parentNode;
    }
    if (!isTargetAChildOfAccessibilityIcon && !isTargetAChildOfAccessibilityWindow) {
        if (accessibilityIconPaths[0].classList.contains('path1__on-click')) {
            accessibilityIconPaths[0].classList.remove('path1__on-click');
            accessibilityIconPaths[1].classList.remove('path2__on-click');
            accessibilityIconBorder.classList.remove('circle-border__on-click');
        }
        closingAccessibilityWindow();
    }
  });


window.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "Esc": // IE/Edge specific value
      case "Escape":
        closingAccessibilityWindow();
        break;
    }
  }, true);


const closeAccessibilityWindow = document.getElementById('close-accessability');
const accessibilityDescription = document.getElementsByClassName('accessibility__description')[0];
closeAccessibilityWindow.addEventListener('click', closingAccessibilityWindow);

function closingAccessibilityWindow() {
    if (accessibilityOptionsWindow.classList.contains('visible__activated__accessability')) {
        accessibilityOptionsWindow.classList.remove('visible__activated__accessability');
    }
    if (accessibilityDescription.classList.contains('visible__activated__accessability')) {
        accessibilityDescription.classList.remove('visible__activated__accessability');
    }
    isAccessibilityOptionsWindowClosed = true;
}


let accessibilityOptionsFirst = document.getElementsByClassName('accessibility-item__first-group');
let firstArr = Array.from(accessibilityOptionsFirst);
let accessibilityOptionsSecond = document.getElementsByClassName('accessibility-item__second-group');
let optionBoxesArr = firstArr.concat(Array.from(accessibilityOptionsSecond));


let accessibilityOptions = document.querySelectorAll('.accessibility-options span');
let accessibilityOptionsArr = Array.from(accessibilityOptions);
accessibilityOptionsArr = accessibilityOptionsArr.slice(0, accessibilityOptionsArr.length - 1);

let accessibilityHeadline = document.querySelector('.accessibility-options h6');
let accessibilityHideSvg = document.getElementById('hide-accessability');
accessibilityOptionsArr.unshift(accessibilityHideSvg);
accessibilityOptionsArr.unshift(accessibilityHeadline);

//highlighting spans
for (let i = 0; i < optionBoxesArr.length; i++) {
    optionBoxesArr[i].addEventListener('click', () => {
        for (let i = 2; i < accessibilityOptionsArr.length - 3; i++) {
            if (accessibilityOptionsArr[i].classList.contains('chosen__accessibility')) {
                accessibilityOptionsArr[i].classList.remove('chosen__accessibility')
            }
        }
        accessibilityOptionsArr[i + 2].classList.add('chosen__accessibility');
    })
}


for (let i = 0; i < optionBoxesArr.length; i++) {
    optionBoxesArr[i].addEventListener('mouseenter', () => {
        makeAccessibilityVisible(accessibilityDescription);
        switch (i) {
            case 0:
                accessibilityDescription.innerHTML = 'התאמת האתר למשתמשים בתוכנת קורא־מסך; מרענן את הדף';
                break;
            case 1:
                accessibilityDescription.innerHTML = 'התאמת האתר לניווט באמצעות המקלדת, ללא צורך בעכבר; מרענן את הדף';
                break;
            case 2:
                accessibilityDescription.innerHTML = 'הקפאת אלמנטים נעים ומונפשים בדף';
                break;
            case 3:
                accessibilityDescription.innerHTML = 'ביצוע פעולות באמצעות מיקרופון, בדפדפנים תומכים';
                break;
            case 4:
                accessibilityDescription.innerHTML = 'שינוי רקע האתר ללבן ואת הגופנים לכהים';
                break;
            case 5:
                accessibilityDescription.innerHTML = 'שינוי רקע האתר לשחור ואת הגופנים לבהירים';
                break;
            case 6:
                accessibilityDescription.innerHTML = 'שינוי צבעי האתר לגוונים ניגודיים';
                break;
            case 7:
                accessibilityDescription.innerHTML = 'המרת גופני האתר לגופנים נטולי תגים הנוחים לקריאה';
                break;
            case 8:
                accessibilityDescription.innerHTML = 'הקטנת גודל גופני האתר';
                break;
            case 9:
                accessibilityDescription.innerHTML = 'הגדלת גודל גופני האתר';
                break;
            case 10:
                accessibilityDescription.innerHTML = 'הגדלת תצוגת המסך';
                break;
            case 11:
                accessibilityDescription.innerHTML = 'שינוי סמן העכבר לצבע שחור והגדלתו';
                break;
            case 12:
                accessibilityDescription.innerHTML = 'שינוי סמן העכבר לצבע לבן והגדלתו';
                break;
            case 13:
                accessibilityDescription.innerHTML = 'הצגת תיאורי התמונות בעזרת חלונית צפה';
                break;
            case 14:
                accessibilityDescription.innerHTML = 'הבלטת כותרות האתר';
                break;
            case 15:
                accessibilityDescription.innerHTML = 'הבלטת קישורי האתר';
                break;
        }
    });
}
for (let i = 0; i < accessibilityOptionsArr.length; i++) {
    let escapeText = accessibilityDescription.innerHTML;
    accessibilityOptionsArr[i].addEventListener('mouseenter', () => {
        makeAccessibilityVisible(accessibilityDescription);
        switch (i) {
            case 0:
                accessibilityDescription.innerHTML = escapeText;
                break;
            case 1:
                accessibilityDescription.innerHTML = 'בחירת זמן ההסתרה של כפתור הנגישות';
                break;

            case 18:
                accessibilityDescription.innerHTML = 'ניתן לסגור את התפריט באמצעות לחיצה על מקש ';
                break;
            case 19:
                accessibilityDescription.innerHTML = 'צפייה בהצהרת הנגישות של האתר';
                break;
            case 20:
                accessibilityDescription.innerHTML = 'שליחת משוב בנוגע לנגישות האתר';
                break;
        }
    });
}

function makeAccessibilityVisible(element) {
    if (!element.classList.contains('visible__activated__accessability') && !isAccessibilityOptionsWindowClosed) {
        element.classList.add('visible__activated__accessability')
    }
}



let isMenuOpen = false;
const menuOpenLines = document.getElementsByClassName('menu-lines__container')[0];
const menuMiddleLine = document.getElementsByClassName('middle-line')[0];
const menuOuterLines = document.getElementsByClassName('outer-line');
const navBarLinksContainer = document.getElementsByClassName('mobile__nav-bar__links')[0];
const logoNavBar = document.getElementsByClassName('logo')[0];
navBar.classList.add('nav-bar__transition');
menuOpenLines.addEventListener('click', () => {
    if (!isMenuOpen) {
        navBarLinksContainer.classList.add('mobile__nav-bar__links__open');
        menuOpenLines.classList.add('menu-lines__container__open');

        menuMiddleLine.classList.add('middle-line__vanish');
        menuOuterLines[0].classList.add('first-outer-line__vanish');
        menuOuterLines[1].classList.add('second-outer-line__vanish');

        
        let navBarHeight = 400; //the height if all the lists are closed
        for (let i = 0; i < isListOpenArr.length; i++) {
            if (isListOpenArr[i]) {
                switch (i) {
                    case 0:
                        navBarHeight += 610;
                        break;
                    case 1:
                        navBarHeight += 285;
                        break;
                    case 2:
                        navBarHeight += 380;
                        break;
                    case 3:
                        navBarHeight += 245;
                        break;
                    case 4:
                        navBarHeight += 245;
                        break;
                    case 5:
                        navBarHeight += 200;
                        break;
                }
            }
        }
        navBarHeight = navBarHeight.toString() + 'px';
        navBar.style.height = navBarHeight;
    }
    else {
        closingMobileNavBarMenu();

        //waiting for the navBar transition to end
        setTimeout(() => {
        }, 250)
    }

    isMenuOpen = !isMenuOpen;
});

function closingMobileNavBarMenu() {
    navBarLinksContainer.classList.remove('mobile__nav-bar__links__open');

    menuMiddleLine.classList.remove('middle-line__vanish');
    menuOuterLines[0].classList.remove('first-outer-line__vanish');
    menuOuterLines[1].classList.remove('second-outer-line__vanish');
    menuOpenLines.classList.remove('menu-lines__container__open');

    navBar.style.height = '75px';
}

window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 1000) {
        if (navBarLinksContainer.classList.contains('mobile__nav-bar__links__open')) {
            closingMobileNavBarMenu();
        }
    }
});

let isListOpenArr = [];
const mobileListHeadlinesNavBar = document.getElementsByClassName('mobile__nav-bar__link');
let listsMobileNavBarArr = Array.from(mobileListHeadlinesNavBar);
listsMobileNavBarArr = listsMobileNavBarArr.slice(0, listsMobileNavBarArr.length - 2);
const mobileListsNavBar = document.getElementsByClassName('mobile__lists__container');
let listsNavBarArr = Array.from(mobileListsNavBar);

for (let i = 0; i < listsMobileNavBarArr.length; i++) {
    isListOpenArr[i] = false;
    listsMobileNavBarArr[i].addEventListener('click', () => {
        //removing navBar transition before opening or closing a link
        navBar.classList.remove('nav-bar__transition');

        if (!isListOpenArr[i]) {
            listsNavBarArr[i].classList.add('mobile__lists__container__open');

            let navBarHeight = parseInt(navBar.style.height);
            switch (i) {
                case 0:
                    navBarHeight += 610;
                    break;
                case 1:
                    navBarHeight += 285;
                    break;
                case 2:
                    navBarHeight += 380;
                    break;
                case 3:
                    navBarHeight += 245;
                    break;
                case 4:
                    navBarHeight += 245;
                    break;
                case 5:
                    navBarHeight += 200;
                    break;
            }
            navBar.style.height = navBarHeight.toString() + 'px';

            isListOpenArr[i] = true;
        }
        else {
            listsNavBarArr[i].classList.remove('mobile__lists__container__open');
           
            let navBarHeight = parseInt(navBar.style.height);
            switch (i) {
                case 0:
                    navBarHeight -= 610;
                    break;
                case 1:
                    navBarHeight -= 285;
                    break;
                case 2:
                    navBarHeight -= 380;
                    break;
                case 3:
                    navBarHeight -= 245;
                    break;
                case 4:
                    navBarHeight -= 245;
                    break;
                case 5:
                    navBarHeight -= 200;
                    break;
            }
            navBar.style.height = navBarHeight.toString() + 'px';
            
            isListOpenArr[i] = false;
        }
        //adding navBar transition after opening or closing a link
        setTimeout(() => {
            navBar.classList.add('nav-bar__transition');
        }, 250);

    });
}


let mobileWhatsUpBoxes = document.getElementsByClassName('mobile__whatsup-link');
mobileWhatsUpBoxes = Array.from(mobileWhatsUpBoxes); 
let mobileWhatsUpTextSpans = document.querySelectorAll('.mobile__whatsup-link span');
mobileWhatsUpTextSpans = Array.from(mobileWhatsUpTextSpans);
for (let i = 0; i < 3; i++) {
    mobileWhatsUpBoxes[i].addEventListener('mouseenter', () => {
        mobileWhatsUpTextSpans[i].classList.add('mobile__whatsup-link__hover');
    });
    mobileWhatsUpBoxes[i].addEventListener('mouseleave', () => {
        mobileWhatsUpTextSpans[i].classList.remove('mobile__whatsup-link__hover');
    });
}



// const moreInfoVideo = document.getElementsByClassName('video__modal')[0];
// const startVideoBox = document.getElementById('more-Info__video-box');
// startVideoBox.addEventListener('click', () => {
//     moreInfoVideo.classList.add('video__modal__open');
// });


let courseContainers = document.querySelectorAll('#courses__container a');
courseContainers = Array.from(courseContainers);
let courseArrows = document.getElementsByClassName('mobile__course-arrow');
courseArrows = Array.from(courseArrows);
for (let i = 0; i < courseContainers.length; i++) {
    courseContainers[i].addEventListener('mouseenter', () => {
        for (let childElement of courseContainers[i].children) {
            if (!courseArrows.includes(childElement)) {
                childElement.classList.add('course__container__on-hover');
            }
        }
    });
    courseContainers[i].addEventListener('mouseleave', () => {
        for (let childElement of courseContainers[i].children) {
            if (!courseArrows.includes(childElement)) {
                if (childElement.classList.contains('course__container__on-hover')) {
                    childElement.classList.remove('course__container__on-hover');
                }
            }
        }
    });
}


const startModal = document.getElementsByClassName('pop-up__start__modal')[0];
startModal.classList.add('start__modal__open');
const startModalContainer = document.getElementsByClassName('start__modal__container')[0];
startModalContainer.classList.add('start__modal__container__open');
const closeStartModalBox = document.getElementsByClassName('close__start-modal')[0];
closeStartModalBox.addEventListener('click', () => {
    startModal.classList.remove('start__modal__open');
    startModalContainer.classList.add('start__modal__container__close');
});
