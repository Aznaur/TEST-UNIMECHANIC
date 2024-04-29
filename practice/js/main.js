"use strict";

const reader = new FileReader();
const preview = document.querySelector('.form-partner__file-wrap');
const removeFile = document.querySelector('.form-partner__file-btn');
const file = document.querySelector('#form-partner__logo');
const openModal = document.querySelector('#btn-primery');
const modal = document.querySelector('.dialogue');
const closeModal = document.querySelector('.form-partner__close');
const backdrop = document.querySelector('.dialogue__backdrop');

function deliteFile(evt) {
    file.value = '';
    preview.style.backgroundImage = '';
    this.style.display = 'none';
    removeFile.removeEventListener('click', deliteFile);
    console.log(evt.target);
}

function showFile(input) {
    let file = input.files[0];
    reader.addEventListener("load", () => { 
        preview.style.backgroundImage = `url(${reader.result})`;
        removeFile.style.display = 'block';
    });
    
    if (file) {
        reader.readAsDataURL(file);
        removeFile.addEventListener('click', deliteFile);
    }
}




function hideModal(evt) {
    evt.preventDefault();
    modal.classList.add('hide-modal');
    closeModal.removeEventListener('click', hideModal);
}

openModal.addEventListener('click', () => {
    modal.classList.remove('hide-modal');
    closeModal.addEventListener('click', hideModal);
    backdrop.addEventListener('click', hideModal);
});



