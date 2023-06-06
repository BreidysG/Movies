let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", ()=>{
    location.hash= "#search="+searchFormInput.value;
});

arrowBtn.addEventListener("click", ()=>{
    location.hash= window.history.back();//para volver a la url anterior.
})

trendingBtn.addEventListener("click", ()=>{
    location.hash= "#trend";
})

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);


function navigator(){    
    console.log({location});

    if(infiniteScroll){
        window.removeEventListener("scroll", infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith("#trend")){
        trendsPage();
    }else if(location.hash.startsWith("#search=")){
        searchPage();
    }else if(location.hash.startsWith("#movie=")){
        movieDetailPage();
    }else if(location.hash.startsWith("#category=")){
        categoriesPage();
    }else {
        homePage();
    }

    if (infiniteScroll){
        window.addEventListener("scroll", infiniteScroll, false);
    }
}

function trendsPage(){
    console.log("Trends!!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");

    headerCategoryTitle.textContent= "Tendencias";

    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}

function searchPage(){
    console.log("Search!!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");

    const [_, query] = location.hash.split("=") //=> ["#search", "query"]
    getMoviesBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);

}

function movieDetailPage(){
    console.log("Movie!!!");

    headerSection.classList.add("header-container--long");
    //headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");
    likedMoviesSection.classList.add("inactive");
    
    const [_, movieId] = location.hash.split("=") //=> ["#movie", "id"]
    getMovieById(movieId);
}

function categoriesPage(){
    console.log("Category!!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    likedMoviesSection.classList.add("inactive");

    const [_, categoryData] = location.hash.split("=") //=> ["#category", "id-name"]
    const [categoryId, categoryName] = categoryData.split("-")
    const newName= categoryName.replace("%20", " ");
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);

    headerCategoryTitle.textContent= newName;
    window.scroll(0,0);

}

function homePage(){
    console.log("Home!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");
    likedMoviesSection.classList.remove("inactive");

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}
