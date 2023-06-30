const container=document.getElementById('container')
var storageString = localStorage.getItem('FavouriteMovie');
var FavouriteMovie = JSON.parse(storageString);

// console.log(myListArray);
FavouriteMovie.forEach(async ids =>{
    
    let final_url = `https://www.omdbapi.com/?i=${ids}&page=1&apikey=8b5fd7ec`;
     console.log(final_url,ids);
     
    //await apiFunctionCall(final_url, id);

    loadfav(final_url,ids)
    // favloaddeatils(favapidata,ids)
    
})
// api calling
async  function loadfav(final_url,ids)
{
    favapi =await fetch(final_url)
    favapidata= await favapi.json()
    if (favapidata.Response=="True"){
  
        
        favloaddeatils(favapidata,ids)
        console.log(favapidata)
        

    }
    

     
}
// render data
async function favloaddeatils(favapidata,ids)

{
    // container.innerHTML=""

      favmovieitem = document.createElement('div')
        favmovieitem.id=ids
        favmovieitem.className='items'
        // if poster image is not avilable
        if(favapidata.Poster == "N/A")
        {
            favmovieposter="./Static/wait_for_poster.png"
        }
        else
        {
            favmovieposter=favapidata.Poster
        }
        console.log(favmovieposter)
        favmovieitem.innerHTML=`
        <!-- detail of movie -->
        <div class="details" id='${ids}'>
        <!-- poster of movie -->
            <div class="images">
           
                <img src="${favmovieposter}">
                
            </div>
            <!-- title of movie -->
            <div class="titles">
               <p><span> 
               <a href="movie.html?id=${favapidata.imdbID}">
               ${favapidata.Title}
               </a> 
               </span>
               <span> &nbsp | 
               <!-- duration  of movie -->
               <i class="fas fa-clock">&nbsp</i><span>${favapidata.Runtime} |</span>
               <span>ImdbVotes : ${favapidata.imdbVotes}</span>
               </p>
            </div>
            </div> 
        <!-- delete of movie -->
       <div class="delte-movie">
        <i class="fa-sharp fa-regular fa-trash-can"id="${ids}"></i>
        
        </div>

      
            
         `;
    container.append(favmovieitem);
        // console.log("ye");

}
// to delete one movie
async function favdelete(favid)
{
    if (window.confirm('Delete Movie from List?')) {
        console.log(favid);
        var tempArr = await JSON.parse(localStorage.getItem('FavouriteMovie'));
        var index = await tempArr.indexOf(favid.toString());
        await tempArr.splice(index,1);
         localStorage.setItem('FavouriteMovie', JSON.stringify(tempArr));
         window.location.reload();
    }


}
// to clear all list
function clearall()
{
    if (window.confirm('Clear Whole List?')) {
        localStorage.clear();
        window.location.reload();
    }
}
// handle all event of click
function handleclick(event)
{
    target=event.target
    if (target.className==="fa-sharp fa-regular fa-trash-can")

    {
        favid=target.id
        console.log(favid)
        favdelete(favid)

    }
    else if(target.className==="clear")
    {
         clearall()
    }
}
document.addEventListener('click',handleclick)
















