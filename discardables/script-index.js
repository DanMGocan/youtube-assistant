// window.addEventListener('load', function() {
    let logoEl = document.getElementById("logo");
    let logoContainerEl = document.getElementById("logo-container");
    let titleContainerEl = document.getElementById("title-container");
    let languageContainerEl = document.getElementsByClassName("language-container");
    let copyrightNoteEl = document.getElementById("copyright-note");
    let playEl = document.getElementById("play");
    function play() {

    setTimeout(function() {
  //      logoEl.style.animation = `initialScaling 3s ease-out forwards`;
    }, 500);

    setTimeout(function() {
        logoContainerEl.style.animation = `translatingContainer 1.5s ease-out forwards`;
        playEl.style.animation = `removingPlay 1.5s ease-out forwards`
        logoEl.style.animation = `logoOpacity 1.5s ease-out forwards`
    }, 0);

    setTimeout(function() {
        titleContainerEl.style.animation = `addingTitle 2s ease-out forwards`;
    }, 2000);

    setTimeout(function() {
        languageContainerEl[0].style.animation = `addingLanguages 1s ease-out forwards`;
        languageContainerEl[1].style.animation = `addingLanguages 1s ease-out forwards`;
        copyrightNoteEl.style.animation = `addingCopyrightNote 1s ease-out forwards`;
    }, 3500)

}

//});
