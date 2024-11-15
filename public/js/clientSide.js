//fetch is used to make http request


const weatherForm=document.querySelector('form')
const search=weatherForm.querySelector("input");
const forecast=document.querySelector('#forecast')
const geoLocation=document.querySelector('#geoLocation')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();//prevent refreshing of page on search button click
    forecast.textContent='Loading...';
    geoLocation.textContent='';
    const location=search.value;
    fetch("http://localhost:3000/weather?query="+location).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            console.log('error');
            forecast.textContent=data.error
          } else {
            forecast.textContent=data.forecast;
            geoLocation.textContent=data.geoData;          
          }
        });
      });
})