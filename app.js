const formData = {
    search: ""
}

//get html element 
const searchButton = document.querySelector ("#searchButton") //get the search button 
const displayParent = document.querySelector("#displaySection")
const showMoreBTN = document.querySelector ("#showMoreBTN")

const mealInfo = [];

//spinner handler 
const spinnerHandler = (type) => { //this type will be  "visible" or "hide"
    const spinner = document.querySelector ("#spinner")
    if (type == "visible") { //it will show this spinner
        displayParent.classList.add ("mainSectionWrapDuringLoading") //it ill add a new class into parent
        displayParent.innerHTML = `
             <div class="spinner-border " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        ` //it will add this spinner into parent as a child
    }else if (type == "hide" ){
        
    }
}

//input handler to get all form data in a dynamic way
function inputHandler (name) {
    const inputDataIdName = `#${name}`  //this is the id name 
    const getData = document.querySelector (inputDataIdName).value //select the data from
    storeDataHandler (getData, name) //set the data
}

//store data  handler
function storeDataHandler (data, name) {
    formData[name] = data //store the data according to the name in a dynamic way
    return 0
}

//spinner class name list 
const spinnerClassList = {
    hide: "spinnerHide", //this is for spinner hide
    visible: "spinnerVisible", //this is for spinner visible
    duringLoading: "mainSectionWrapDuringLoading"
}

searchButton.addEventListener ("click", async (e) => {
    e.preventDefault();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${formData.search}` //request for covid case
    const res = await fetch(url);
    const {meals} = await res.json(); //data of meal
    mealInfo.push (...meals)
    addMealHandler (meals); //it will return a 
})
function addMealHandler (data) {
    const meals = data
    if (meals.length) {
        let isRestricted = false
        meals.length <= 5 ? isRestricted = true : isRestricted = false
        const list = document.createDocumentFragment ();
        if (true) {
            meals.map ((meal, ind) => {
                //store data
                if (isRestricted) {
                    if (ind <= 4){
                        const wrapper = storeMealHandler (meal)
                        list.appendChild (wrapper)
                    }
                }
                mealInfo.push (meal)
            })
             //append to display part 
            displayParent.appendChild (list)
        }
    }
}

//creat the card hml part
function storeMealHandler (mealData) {
    const mealImage = mealData.strMealThumb
    const mealId = mealData.idMeal
    const cookingInstruction = mealData.strInstructions
    const mealTitle = mealData.strMeal

    //create html element 
    const wrapperDiv = document.createElement ("div")
    const img = document.createElement ("img")
    const bodyWrapper = document.createElement ("div")
    const h5 = document.createElement ("h5")
    const p = document.createElement ("p")
    const a = document.createElement ("a")
    const instruction = document.createElement ("p")
    //change the wrapper div 
    wrapperDiv.classList.add ("card", "col-12","col-md-4")
    wrapperDiv.setAttribute ("style", "width: 18rem;")
    wrapperDiv.appendChild (img); //set his child 
    wrapperDiv.appendChild (bodyWrapper); //set his child 

    //change to image part 
    img.classList.add ("card-img-top")
    img.src = mealImage
   img.setAttribute ("style", "width: 10rem;")

    //change the body wrapper div 
    bodyWrapper.classList.add ("card-body")
    bodyWrapper.appendChild (h5); //set his child 
    bodyWrapper.appendChild (p); //set his child 
    bodyWrapper.appendChild (instruction); //set his child 

    //change the paragraph of body 
    h5.classList.add ("card-title", "h5")
    h5.textContent = `Meal Title: ${mealTitle}`

     //change the paragraph of body 
    //change the paragraph of body 
    p.classList.add ("card-text")
    p.setAttribute ("style", "width: 18rem;")
    p.textContent = `Meal Id: ${mealId}`

    //change the paragraph of body 
    instruction.classList.add ("card-text")
    instruction.textContent = `Instruction: ${cookingInstruction}`
    return wrapperDiv
}


//show more button handler 
showMoreBTN.addEventListener ("click", (e) => {
    e.preventDefault();
    const list = document.createDocumentFragment ();
    mealInfo.map (meal => {
        const wrapper = storeMealHandler (meal);
        list.appendChild (wrapper)
    })
    //e.firstElementChild can be used.
    var child = displayParent.lastElementChild; 
    while (child) {
        displayParent.removeChild(child);
        child = displayParent.lastElementChild;
    }
    displayParent.appendChild (list)
})
if(x.meals.length>5){
    var btnDiv=document.getElementById('buttonDiv');
    btnDiv.innerHTML=`<div id="showallbtn"><button class="submitBtn">Show All</button></div>`;
    document.getElementById('showallbtn').addEventListener('click', function(e){
        e.preventDefault();
        btnDiv.innerHTML="";
        showMore(x);
    });
    
} 

function showMore(x){
    
    for(var i=5;i<x.meals.length;i++){
        var mealId= x.meals[i].idMeal;
        var mealName= x.meals[i].strMeal;
        var imgLink= x.meals[i].strMealThumb;
        var recipe= x.meals[i].strInstructions;

        var newDiv=document.createElement('div');
        newDiv.setAttribute("class","col-lg-4 col-md-6 col-12");
        newDiv.innerHTML=`<div class="self-card">
        <h3>Meal Name: ${mealName}</h3><div class="text-center">
        <img  src="${imgLink}" width="300px"></div>
        <p>Meal ID: ${mealId}</p>
        <p>Recipe: ${recipe}</p></div>`;
        row.appendChild(newDiv);
}
}