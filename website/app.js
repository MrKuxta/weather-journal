/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const appKey = ",us&appid=cbbdc7b20e27dee11c5298a7f39a7736";


//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+d.getDate()+'.'+ d.getFullYear();

//Get Request and Build the WEB API, When the button is cicked
const newWeather = document.getElementById("generate");
newWeather.addEventListener("click", performAction);

function performAction(e) {
    console.log("You clicked Generate!");
    const weatherLocation = document.getElementById("zip").value;
    let feeling = document.getElementById("feelings").value;

    getWeather(baseURL, weatherLocation, appKey)
    .then((data) => {
        //console.log(data);
        postWeather("/addWeatherData", {
            temperature: data.main.temp,
            date: newDate,
            userResponse: feeling
        })
    })
    //we wait until we have received the data, posted the data and then update
    .then(() => {
        updateUI();        
    })
};


const getWeather = async (baseURL, weatherLocation, appKey) => {
    const res = await fetch(baseURL + weatherLocation + appKey);
    try{
        const data = await res.json();
        //console.log(data);
        return data;
    }catch (error) {
        console.log("error:", error);
    }
};


const postWeather = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error:", error);
    }
};


//UpdateUI function

const updateUI = async () => {
    const request = await fetch('/allData');
    try{
      const everyData = await request.json();
      console.log("all data:", everyData);
      document.getElementById("date").innerHTML = `Date of the forecast is ${everyData.date}`;
      document.getElementById("temp").innerHTML = `The temperature is ${everyData.temperature}`;
      document.getElementById("content").innerHTML = `The mood is ${everyData.userResponse}`;
    }catch(error){
      console.log("error", error);
    }

    //To reset the values of the forms
    document.getElementById("feelings").value="";
    document.getElementById("zip").value = "";
  };