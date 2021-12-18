const appRoot = document.getElementById('app-root');
const header = document.createElement('header');
header.id = 'header';
header.classList.add ('header');
document.getElementById('app-root').appendChild(header);
const title = document.createElement('h1');
title.innerText = 'Countries Search';
title.classList.add('title');
document.getElementById('header').appendChild(title);

//form
const form = document.createElement('form');
form.id = 'search';
form.classList.add('form');
document.getElementById('app-root').appendChild(form);

//?first div after form
const radioButtons = document.createElement('div');
radioButtons.id = 'search-radio';
document.getElementById('search').appendChild(radioButtons);
//? second div after form
const selectDiv = document.createElement('div');
selectDiv.id = 'search-field';
document.getElementById('search').appendChild(selectDiv);
//? div's inside form
const titleDiv = document.createElement('div');
document.getElementById('search-radio').appendChild(titleDiv);
titleDiv.id = 'title-radio';
titleDiv.innerHTML =
  '<p class="title-radio__header">Please choose type of search:</p>';

const radioDiv = document.createElement('form');
document.getElementById('search-radio').appendChild(radioDiv);
radioDiv.id = 'radio-buttons';

//? radiobattons

const radioReg = document.createElement('input');
radioReg.type = 'radio';
radioReg.id = 'radio1';
radioReg.value = 'region';
radioReg.name = 'select';

const labelReg = document.createElement('label');
labelReg.htmlFor = 'radio1';

const descriptionReg = document.createTextNode('By Region');
labelReg.appendChild(descriptionReg);

const newlineReg = document.createElement('br');

const containerReg = document.getElementById('radio-buttons');
containerReg.appendChild(radioReg);
containerReg.appendChild(labelReg);
containerReg.appendChild(newlineReg);

let radioLan = document.createElement('input');
radioLan.type = 'radio';
radioLan.id = 'radio2';
radioLan.value = 'language';
radioLan.name = 'select';

const labelLan = document.createElement('label');
labelLan.htmlFor = 'radio2';

const descriptionLan = document.createTextNode('By Language');
labelLan.appendChild(descriptionLan);

const newlineLan = document.createElement('br');

const containerLan = document.getElementById('radio-buttons');
containerLan.appendChild(radioLan);
containerLan.appendChild(labelLan);
containerLan.appendChild(newlineLan);
//? no items

const noItemsSelected = document.createElement('div');
document.getElementById('app-root').appendChild(noItemsSelected);
noItemsSelected.id = 'check-select';
//? if radiobattons checked

let setSelect;
let arr = [];
console.log(setSelect);
if (document.querySelector('input[name="select"]')) {
  document.querySelectorAll('input[name="select"]').forEach((elem) => {
    elem.addEventListener('change', function (event) {
      const item = event.target.value;

      if (item === 'region') {
        console.log(selectList);

        // eslint-disable-next-line no-undef
        arr = externalService.getRegionsList();

        console.log(arr);
        selectList.addEventListener('click', function () {
          while (getTable.firstChild) {
            getTable.removeChild(getTable.firstChild);
          }
          const n = selectList.value;
          console.log(n);

          // eslint-disable-next-line no-undef
          generateTableHead(table, data);
          // eslint-disable-next-line no-undef
          generateTable(table, externalService.getCountryListByRegion(n));
        });

        console.log(setSelect);
      } else if (item === 'language') {
        // eslint-disable-next-line no-undef
        arr = externalService.getLanguagesList();
        selectList.addEventListener('click', function () {
          while (getTable.firstChild) {
            getTable.removeChild(getTable.firstChild);
          }
          const n = selectList.value;
          console.log(n);
          // eslint-disable-next-line no-undef
          console.log(externalService.getCountryListByLanguage(n));
          generateTableHead(table, data);
          // eslint-disable-next-line no-undef
          generateTable(table, externalService.getCountryListByLanguage(n));
        });
      } else {
        noItemsSelected.innerHTML =
          '<p class="search-query">No items, please choosesearch query</p>';
      }

      for (let i = 0; i < arr.length; i++) {
        const option = document.createElement('option');
        option.value = arr[i];
        option.text = arr[i];
        selectList.appendChild(option);
        console.log('iteration');
      }
    });
  });
}
//?select title

const titleSecondDiv = document.createElement('div');
document.getElementById('search-field').appendChild(titleSecondDiv);
titleSecondDiv.id = 'title-select';
titleSecondDiv.innerHTML =
  '<p class="title-select__header">Please choose search query:</p>';

//? select
const selectList = document.createElement('select');
selectList.id = 'select';
selectList.value = 'Select value';

document.getElementById('search-field').appendChild(selectList);
const defOption = document.createElement('option');
defOption.text = 'Select value';
defOption.checked;

selectList.appendChild(defOption);
//? table
const getTable = document.createElement('table');
getTable.id = 'content-table';
document.getElementById('app-root').appendChild(getTable);

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  const newData = data.map((item) => ({
    name: item.name,
    capital: item.capital,
    region: item.region,
    languages: item.languages,
    area: item.area,
    flagURL: item.flagURL
  }));
  for (let element of newData) {
    let row = table.insertRow();
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        if (key === 'flagURL') {
          let cell = row.insertCell();
          let imgContainer = document.createElement('img');
          imgContainer.src = element[key];
          cell.appendChild(imgContainer);
        } else if (key === 'languages') {
          //console.log(Object.values(element[key]));
          let cell = row.insertCell();
          let languages = document.createTextNode(Object.values(element[key]));
          cell.appendChild(languages);
        } else {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);

          cell.appendChild(text);
        }
      }
    }
  }
}

const headNames = [
  'Country name',
  'Capital',
  'World Region',
  'Languages',
  'Area',
  'Flag'
];
let table = document.querySelector('table');
let data = headNames;
