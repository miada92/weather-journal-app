

/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Declare button for function
const btn = document.getElementById("generate");

// Declare user zip code input from html 
const zipCode = document.getElementById("zip");

// Personal API Key for OpenWeatherMap API
const apiKey = "e6fc57b332b6dbce4792857e965683a0";

// retrieve  API url
const apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`


// get date,temp,and content
const feeling = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// using click event listener on the Generate Button 
btn.addEventListener('click', BtnClk);

// Function called by event listener 
function BtnClk() {
    // const aipCode again to fix the If condition
    const zipCode = document.getElementById("zip");

    // Validation to check if the zip code is there 
    if (zipCode.value === "") {
        alert("kindly enter zip code in zip form!");
    } else {
        getData().then((data) => {

            postData("/post", { 
                temp:data.main.temp, date:newDate, feelings:feeling.value 
            })
        })
            .then(() => updateUi())
    }
}
const getData = async () => {

    const req = await fetch(apiURL)

    try {

        const data = await req.json()
        console.log(data.main.temp)
        return data;

    } catch (error) {

        console.log(error);
    }
};

const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        "method": "POST",
        "credentials": "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        return;

    } catch (error) {
        console.log("Error", error);
    }
}

// Function to GET Project Data 
const updateUi = async () => {
    const req = await fetch("/get")

    try {
        const userdata = await req.json()
        console.log(userdata)
        date.innerHTML = userdata.date
        temp.innerHTML = userdata.temp
        content.innerHTML = userdata.feelings
    } catch (error) {
        console.log(error)
    }
}
