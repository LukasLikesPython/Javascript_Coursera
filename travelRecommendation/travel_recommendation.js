const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchBar = document.getElementById("searchBar");
const recUl = document.getElementById("recommendations");

btnSearch.addEventListener("click", handleSearchClick, true);
btnClear.addEventListener("click", handleClearClick, true);


const travelData = fetch("./travel_recommendation_api.json")
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


function handleClearClick(){
    recUl.innerHTML = '';
}


async function handleSearchClick(){
    var data = await travelData;
    var searchStr = searchBar.value.toLowerCase()
    var searchData = [];

    if (['beach', 'beaches'].includes(searchStr)){
        searchData = data['beaches'];
    }
    else if (['temples', 'temple'].includes(searchStr)){
        searchData = data['temples'];
    }
    else if (['countries', 'country'].includes(searchStr)){
        console.log(data['countries'])
        for(var i = 0; i < data['countries'].length; i++){
            searchData = searchData.concat(data['countries'][i].cities)
        }
    }
    else{
        alert('Keyword not found, try "beaches", "temples", or "countries".');
    }
    console.log(searchData)
    handleClearClick();
    searchData.forEach(destination => {
        const markup = `<li><img src=${destination.imageUrl}>
                        <br><b>${destination.name}</b><br>
                        <p>${destination.description}</p></li>`
        recUl.insertAdjacentHTML('beforeend', markup)
                    });
}
