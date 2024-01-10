const wtBlocks = document.querySelectorAll('.wtBlock');
const anchors = document.querySelectorAll('.wtanchor');
const bodyRect = document.body.getBoundingClientRect();
let anchorPositions = [];
anchors.forEach(el => {
    var rect = el.getBoundingClientRect();
    offset = rect.top - bodyRect.top;
    anchorPositions.push(offset);
});

renderView();

function setActiveImage(imageIndex = 0) {
    wtBlocks.forEach((block, i) => {
        let classToAdd = 'hiddenImage';
        let classToRemove = 'activeImage';
        if(i == imageIndex) {
            classToAdd = 'activeImage';
            classToRemove = 'hiddenImage';
        }
        block.querySelector('.wtbImage').classList.remove(classToRemove); // Do not hide images with CSS => JS could be disabled.
        block.querySelector('.wtbImage').classList.add(classToAdd); // Do not hide images with CSS => JS could be disabled.
    });
}

function getSectionInViewport(positionOfScroll) {
    let shownSection = false;
    if(positionOfScroll <= anchorPositions[0]) shownSection = -1; // When no wtBlock in view, show no image
    if(positionOfScroll > anchorPositions[(anchorPositions.length - 1)]) shownSection = (anchorPositions.length - 1); // When outside of all wtBlocks, just set the last image to display
    if(shownSection === false) { // we are somewhere within the sections, search for correct one
        anchorPositions.forEach((anchorPos, i) => {
            if(positionOfScroll > anchorPos && positionOfScroll <= anchorPositions[i + 1]) {
                shownSection = i;
            }
        });
    }

    return shownSection;
}

function renderView() {
    let scrollPos = this.scrollY;
// console.log(scrollPos);
    let sectionInViewport = getSectionInViewport(scrollPos+900);
// console.log(sectionInViewport);
    setActiveImage(sectionInViewport);
}

window.addEventListener("scroll",debounce(function(e){
    renderView();
}));
function debounce(func){
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func,50,event);
    };
}
