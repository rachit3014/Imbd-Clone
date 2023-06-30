// https://www.omdbapi.com/?i=tt0458339&page=1&apikey=8b5fd7ec
const movie_area=document.getElementById('movie_area')
loadmoviesdetails()
console.log(movie_area)
// api calling
 async function loadmoviesdetails()
{
    var urlqueryparams= new URLSearchParams(window.location.search) //taking out id from url
    var url_id=urlqueryparams.get('id')
    console.log(url_id)
    let res= await fetch(`https://www.omdbapi.com/?i=${url_id}&page=1&apikey=8b5fd7ec`)
    const da= await res.json()
    
    loaddetails(da)
    console.log(da)


}
// load deatils of movie
function loaddetails(da)
{

    document.body.style.backgroundImage = `url(${da.Poster}),linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0) 250%)`;

    movie_area.innerHTML=`
    <!-- poster image -->
        <div class="poster-image">
            <img src=${(da.Poster=='N/A')?"./Static/wait_for_poster.png":da.Poster} alt="unable to load">
        </div>
        <!-- detail of movie -->
        <div class="movie-details">
            <div class="movie-title">
                <h1> ${da.Title}</h1>
            </div>
            <!-- director detail -->
            <div class="director">
                Director :&nbsp ${da.Director}
            </div>
            <!-- duration of movie -->
            <div class="duration">
                <i class="fas fa-clock">&nbsp</i><span>${da.Runtime}</span>
                <!-- realsed date of movie -->
                <div class="realsed-date">
                    <h4>Realsed : ${da.Released}</h4>
                </div>
            </div>
            <!-- rating of movie-->
            <div class="rating">
                <h4>IMDB&nbspRating : ${da.imdbRating}</h4>
            </div>
            <!-- deatils of actor -->
            <div class="actor">
                <h4>Actor : ${da.Actors} </h4>
                <!-- language of movie -->
                <h4> Language : ${da.Language}</h4>
            </div>
            <!-- plot of movie -->
            <h4>Plot:</h4>
            <div class="plot">
              ${da.Plot} 
            </div>
            




        </div>
            
    `

}

