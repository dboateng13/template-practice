const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');

// Get quote from api
async function getQuote() {
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