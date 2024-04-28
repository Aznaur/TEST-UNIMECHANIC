"use strict";

// const file = document.querySelector("#form-partner__logo").files[0];
const reader = new FileReader();
const preview = document.querySelector('.form-partner__file-wrap');
const removeFile = document.querySelector('.form-partner__file-btn');
const file = document.querySelector('#form-partner__logo');

function showFile(input) {
    let file = input.files[0];
    reader.addEventListener(
        "load",
        () => { 
            preview.style.backgroundImage = `url(${reader.result})`;
            removeFile.style.display = 'block';
        });
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

removeFile.addEventListener('click', function() {
    file.value = '';
    preview.style.backgroundImage = '';
    this.style.display = 'none';
});



