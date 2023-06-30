const inputbox=document.getElementById('inputbox');
const serachconatinerbox=document.getElementById('serachconatinerbox')
// api calling 
async function loadmovies(searchtext) 
{
    // const url=`http://www.omdbapi.com/?s=${searchtext}&page=1&apikey=8b5fd7ec`;
    let response= await fetch(`http://www.omdbapi.com/?s=${searchtext}&page=1&apikey=8b5fd7ec`);
    // console.log(response)
    const data=await response.json();
    if (data.Response=='True')
    display(data.Search)
    console.log(data.Search)
   

}
// to find movies from search box
function findmovies()
{
    let searchtext=inputbox.value.trim();
    console.log(searchtext)
    if(searchtext.length>0 )
    {
        loadmovies(searchtext)
       

    }
}
// to render the data in html
function display(movies)
{
    serachconatinerbox.innerHTML=""
    for(let i=0;i<movies.length;i++)
    {
        movieitem=document.createElement('div')
        movieitem.id=movies[i].imdbID
        movieitem.className='search-list'
        // if poster image is Not avilable
        if(movies[i].Poster == "N/A")
        {
            movieposter="./Static/wait_for_poster.png"
        }
        else
        {
            movieposter=movies[i].Poster
        }
        console.log(movieitem)
        movieitem.innerHTML=`
        <div class="search-list-item">
        <!-- poster of movie -->
            <div class="serach-item-thumbnail">
              <a href="movie.html?id=${movies[i].imdbID}">
                 <img src="${movieposter}" alt="unable to load ">
               </a>
            </div>
            <!-- detail of movie -->
            <div class="serach-item-info">
            <!-- title of movie -->
              <h3>${movies[i].Title}</h3>
              <!-- realsed year of movie -->
              <p>${movies[i].Year}</p>
            
              <!-- add favourite button -->
                 <i class="fas fa-plus" id="${movies[i].imdbID}"></i>
                
            </div>
        </div>`
    serachconatinerbox.append(movieitem)

    }
}
var myMovieList = [];
var oldArray = [];

// adding functionality to Add Movie to list button
function addingMovieToList(buttonID){
    console.log(buttonID)
    // to add the movie only once into list
    if (!myMovieList.includes(buttonID.toString())) {
        myMovieList.push(buttonID.toString());
    }
    console.log(myMovieList);
    console.log('-------------------------------');
    
    // display toast to confirm user that movie has been added to list
    displayMessage();


    //first we need to check if local storafe is empty, if yes then push data directly; if not, then first reterive that data, modify it and then append modified data to localstorage;
    oldArray = JSON.parse(localStorage.getItem('FavouriteMovie'));
    if (oldArray == null) {
        localStorage.setItem('FavouriteMovie', JSON.stringify(myMovieList));
    }
    else{
        // appending only new entries in old array
        myMovieList.forEach(item =>{
            if (!oldArray.includes(item)) {
                oldArray.push(item);
            }
        })
        localStorage.setItem('FavouriteMovie', JSON.stringify(oldArray));
    }
    console.log(oldArray);
}
// to display message
function displayMessage()
{
    document.getElementById('notify').style.display = "block";   
    setTimeout(() => {
        document.getElementById('notify').style.display = "none";
    }, 2000);
}

// handle click event
function handle(event)
{
    const target=event.target
    //  button to add favourite
    if (target.className==="fas fa-plus")
    {
         buttD=target.id
         console.log(target.id)
        addingMovieToList(buttD)
        return

    }
}
findmovies()
// adding click event in document
document.addEventListener('click',handle)