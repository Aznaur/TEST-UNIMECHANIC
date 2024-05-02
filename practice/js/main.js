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


const cbTable = document.querySelector('.cb-table__body');
const inputSearch = document.querySelector('.cb-text-field__input');
let POSTS = [];

inputSearch.addEventListener('input', function(evt){
    let value = evt.target.value.toLowerCase();
    const filterPost = POSTS.filter((post) => {
        return post.title.includes(value);
    });
    render(filterPost);
});

async function start() {
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await resp.json();
        POSTS = data;
        render(data);
        
        const btnSort = document.querySelector('.cb-table__row--header');
        
        let idBoolean = true;
        
        function sorNumber(targ) {
            let dataLabel = targ.getAttribute('data-label');
            if(idBoolean) {
                render(data.toSorted((a,b) => b[dataLabel] - a[dataLabel]));
                idBoolean = false;
            } else {
                render(data.toSorted((a,b) => a[dataLabel] - b[dataLabel]));
                idBoolean = true;
            }
        }

        function sorString(targ) {
            let dataLabel = targ.getAttribute('data-label');
            if(idBoolean) {
                render(data.toSorted((a,b) => a[dataLabel] < b[dataLabel] ? 1 : -1));
                idBoolean = false;
            } else {
                render(data.toSorted((a,b) => a[dataLabel] > b[dataLabel] ? 1 : -1));
                idBoolean = true;
            }
        }
        
        btnSort.addEventListener('click', function(evt) {
            const target = evt.target;
            if (target.classList.contains('user-sort')) {
                sorNumber(target);
            } else if (target.classList.contains('title-sort')) {
                sorString(target);
            } else if (target.classList.contains('body-sort')) {
                sorString(target);
            }

        });
    }catch (err) {
        const tableWrapper = document.querySelector('.cb-table__wrapper');
        tableWrapper.style.color = 'red';
        tableWrapper.innerHTML = err.message;
    }
}

start();

function render(posts = []) {
    const html = posts.map(toHtml);
    cbTable.innerHTML = html.join('');
}

function toHtml(post) {
    return`
    <tr class="cb-table__row">
        <td data-label="User id " class="cb-table__td cb-table__td--id">${post.userId}</td>
        <td data-label="Title " class="cb-table__td">${post.title}</td>
        <td data-label="Body " class="cb-table__td">${post.body}</td>
    </tr>
    `
}


