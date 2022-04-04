/* Global Variables */
const url="http://api.openweathermap.org/data/2.5/weather?zip="
const apiKey="&appid=2f58d2f34a95de66b2e431c503678335&units=metric"
let zipCode="";
let userInput="";
let data={};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
//async function to fetch data from api
const getData=async(url,code,key,input)=>{
    // console.log(url+code+key)
    const response=await fetch(url+code+key)  
    const data =await response.json() 
    try{
        //saving dataa to object to send to server
        let tempData={
            date:newDate,
            temp:data.main.temp,
            input:input??""
        }
        //sending data to server 
        postData('/post',tempData)
        //updating ui
        upDateUi()
    }
    catch{(error) => {
        console.error('Error:', error);
        alert(`an error occured please check the ZipCode again`)
    }};
    
}
// function for posting data to server.js
const postData = async(url = '', data = {}) => {
    const response =await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
//getting the elements to be updated
const dateHolder=document.getElementById("date");
const tempHolder=document.getElementById("temp");
const contentHolder=document.getElementById("content");
//function for updating ui by fetching the data from server.js
const upDateUi=async ()=>{
    // console.log("hi")
    let objJson=await fetch("/get")
    let obj=await objJson.json()
    console.log(obj)
    try{
        dateHolder.innerHTML=obj.date
        tempHolder.innerHTML=`${obj.temp}°C`
        contentHolder.innerHTML=obj.input
    }    
    catch{(error) => {
        console.error('Error:', error);
        alert(`an error occured with the server`)
    }};

}
//getting the elements
const feelings=document.getElementById("feelings");
const zip=document.getElementById("zip");
const generate=document.getElementById("generate");
// adding EventListener for submition
generate.addEventListener("click" ,genrate)
function genrate() {
    zipCode=zip.value;
    userInput=feelings.value
    // console.log(userInput)
    getData(url,zipCode,apiKey,userInput)
}