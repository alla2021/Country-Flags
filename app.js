/* eslint-disable no-magic-numbers */
const appRoot = document.getElementById('app-root');
//header
const header = document.createElement('header');
header.classList.add('header');
header.insertAdjacentHTML('afterbegin', '<h1>Countries Search</h1>');
appRoot.append(header);
//form
const typeSearch = document.createElement('div');
typeSearch.classList.add('form-type');
appRoot.append(typeSearch);
let typeSearchContent = `<p>Please choose type of search:</p>
  <form action="GET" name="type" class="form">
    <label for="region">
      <input type="radio" name="type-search" value="region">By Region</label>
    <label for="language">
      <input type="radio" name="type-search" value="language">By Language</label>
  </form>`;
typeSearch.insertAdjacentHTML('beforeend', typeSearchContent);
//select
const searchQuery = document.createElement('div');
searchQuery.classList.add('form-type');
appRoot.append(searchQuery);
let searchQueryContent = `<p>Please choose search query:</p>
<form action="GET" name="query" id="query"></form>`;
searchQuery.insertAdjacentHTML('beforeend', searchQueryContent);
///
let countriesList;
const regionsList = externalService.getRegionsList();
const languageList = externalService.getLanguagesList();
const query = document.forms.query;
let querySelect;
//active select
function createSelect() {
    querySelect = document.createElement('select');
    query.append(querySelect);
    const option = document.createElement('option');
    option.textContent = 'Select value';
    querySelect.append(option);
    for (let item of radioButton) {
        if (!item.checked) {
            querySelect.setAttribute('disabled', true);
        } else {
            querySelect.removeAttribute('disabled');
            break
        }
    }
}
const radio = document.forms.type;
const radioButton = radio.elements;
radio.addEventListener('input', (actions) => renderSearchOptions(actions));
createSelect();
function renderSearchOptions(actions) {
    let table = document.querySelector('table');
    if (table) {
        table.remove();
    }
    querySelect.remove();
    createSelect();
    let selectContent;
    let select;
    if (actions.target.value === 'region') {
        selectContent = regionsList.reduce((html, region) =>
            html + `<option >${region}</option>`, '')
    } else if (actions.target.value === 'language') {
        selectContent = languageList.reduce((html, language) =>
            html + `<option >${language}</option>`, '')
    }
    querySelect.insertAdjacentHTML('beforeend', selectContent);
    querySelect.addEventListener('input', (e) => {
        select = e.target.value;
        getCountriesList(actions, select);
    });
}
function getCountriesList(e, select) {
    if (e.target.value === 'region') {
        countriesList = externalService.getCountryListByRegion(select);
    } else if (e.target.value === 'language') {
        countriesList = externalService.getCountryListByLanguage(select)
    }
    let tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.remove();
        renderTable(countriesList);
    } else {
        createTable(countriesList);
    }
    return countriesList;
}
function createTable(list) {
    const table = document.createElement('table');
    const tableHead = `<thead>
    <tr>
        <th class="table-head sort sort-up" data-name="name">Country name</th>
        <th class="table-head" data-name="capital">Capital</th>
        <th class="table-head" data-name="region">World region</th>
        <th class="table-head" data-name="lang">Languages</th>
        <th class="table-head sort sort-up" data-name="area">Area</th>
        <th class="table-head" data-name="flag">Flag</th>
    </tr>
    </thead>`
    table.insertAdjacentHTML('afterbegin', tableHead);
    appRoot.append(table);
    renderTable(list);
    document.querySelector('thead')
        .addEventListener('click', (event) => {
            sortTable(event, countriesList)
        })
}
function renderTable(list) {
    let tableContent = list.reduce(function(html, item) {
        const langArr = [];
        for (let elem in item.languages) {
            if(item.languages.hasOwnProperty(elem)) {
                langArr.push(item.languages[elem])
            }
        }
        let lang = langArr.join(', ');
        return html + `<tr>
                        <td>${item.name}</td>
                        <td>${item.capital}</td>
                        <td>${item.region}</td>
                        <td>${lang}</td>
                        <td>${item.area}</td>
                        <td><img src="${item.flagURL}" alt="flag"></td>
                        </tr>`
    }, '');
    document.querySelector('table').insertAdjacentHTML('beforeend', tableContent);
}
function sortTable(event, list) {
    const dataName = event.target.getAttribute('data-name');
    list.sort((a, b) => {
        if (a[dataName] > b[dataName]) {
            return 1;
        } else if (a[dataName] < b[dataName]) {
            return -1;
        } return 0;
    });
    let tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.remove();
    }
    if (event.target.classList.contains('sort-up')) {
        renderTable(list);
    } else {
        renderTable(list.reverse());
    }
    event.target.classList.toggle('sort-up');
    event.target.classList.toggle('sort-down');
}
