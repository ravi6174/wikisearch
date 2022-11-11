let inputValueElement = document.getElementById("input");
let container = document.getElementById("con2");
let loader = document.getElementById("loading");
let clearbtn = document.getElementById("clearbtn");
let searchbtn = document.getElementById("searchbtn");
let clearpara = document.getElementById("clear-p");





function createAndAppendSearchResult(resultt){


    let {title,link,description} = resultt;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item","resultt");
    container.appendChild(resultItemEl)

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(search_results){
   
        let len=search_results.length;
        loader.classList.toggle("d-none")


        for (let i = 0; i <= len; i++) {
                    resultt=search_results[i];
                    createAndAppendSearchResult(resultt)
          }
}


let count=1;

function searchInput(event){

    if(event.key==="Enter"){

            container.textContent=""
            loader.classList.toggle("d-none")
            
            localStorage.setItem("id",JSON.stringify(count) )
            let change=localStorage.getItem("id");
            change=parseInt(change); 
            localStorage.setItem(change,inputValueElement.value);
            count=count+1;

            searchInputValue=inputValueElement.value;
            let url="https://apis.ccbp.in/wiki-search?search="+ searchInputValue;
            let options={
                method:"GET"
            }

            fetch(url,options)
            .then(function(response){
                return response.json();
            })

            .then(function(jsonData){
                
                let {search_results} = jsonData;
                displayResults(search_results);
            })
        }
}

function searchbtnfunction(){
    container.textContent=""
    loader.classList.toggle("d-none")
    
    localStorage.setItem("id",JSON.stringify(count) )
    let change=localStorage.getItem("id");
    change=parseInt(change); 
    localStorage.setItem(change,inputValueElement.value);
    count=count+1;

    searchInputValue=inputValueElement.value;
    let url="https://apis.ccbp.in/wiki-search?search="+ searchInputValue;
    let options={
        method:"GET"
    }

    fetch(url,options)
    .then(function(response){
        return response.json();
    })

    .then(function(jsonData){
        
        let {search_results} = jsonData;
        displayResults(search_results);
    })

}

let backtonote=function(){
    clearpara.textContent="Note:This History is stored in localStorage."
}

let changepara=function(){
    clearpara.textContent="History Cleared!"
    setInterval(backtonote,3000)
}

function clearHistory(){
    localStorage.clear();
    changepara();
}


inputValueElement.addEventListener("keydown", searchInput)

clearbtn.addEventListener("click",clearHistory)

searchbtn.addEventListener("click",searchbtnfunction)