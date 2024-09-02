const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchBar = document.getElementById("searchBar");

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
    searchBar.value = "";
}


async function handleSearchClick(){
    var data = await travelData;
    var searchStr = searchBar.value.toLowerCase()
    var searchData;

    if (['beach', 'beaches'].includes(searchStr)){
        searchData = data['beaches'];
    }
    else if (['temples', 'temple'].includes(searchStr)){
        searchData = data['temples'];
    }
    else if (['countries', 'country'].includes(searchStr)){
        searchData = data['countries'];
    }
    else{
        alert('Keyword not found, try "beaches", "temples", or "countries".');
    }
    console.log(searchData);
}
