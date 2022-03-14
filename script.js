const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

// Get quote from api
async function getQuote() {
    showLoadingSpinner();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/' 
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
      
      try{
          const response = await fetch(proxyURL  + apiURL);
          const data = await response.json();
          //if author is blank and unknown
          if (data.quoteAuthor==='') {
              authorText.innerText= 'Unknown';
          } else {
              authorText.innerText = data.quoteAuthor;
          }
         //Reduce font size for long quotes
         if (data.innerText.length > 120){  
             quoteText.classList.add('long-quote');
         } else {
             quoteText.classList.remove('long-quote');
         }
          quoteText.innerText = data.quoteText;
          //stop Loader, Show quote
          removeLoadingSpinner();

      } catch (error){
          getQuote();
          
      }


}

//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

 
//On Load
getQuote();
