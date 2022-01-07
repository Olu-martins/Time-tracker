/*
=========== FUNCTION DYNAMIC FLOW======HOWTO STEPS========= 
-Write a call back function that will listen to /select the clicked button ( either daily, weekly and monthly button)
-pass array as the parameter
- inside the function write a foreach method for the buttons 
-add a click eventListener to the button in the foreach method 
-Tell the event listern to run (activateSelectedButton) function
-select the activity option from that dataset that we have in the JSON file and save in a variable
-Finally render each activity passing the activatedOption variable as the parameter
*/

// select all the buttons @ query selector all
const buttons = document.querySelectorAll('tracker-option')

const selectButton =  (array) => {
    array.forEach(button => {
        button.addEventListener('click', () => {
            activateSelectedButton();
            const selectedOption = button.dataset.option;
            rendercards(selectedOption);
        })
        
    });

}

/*
Following steps 
-write activateSelectButton function
-fetch the dataset function from the JSON fiile and save it in the Selected Option variable
-write the render function 
-also clear existing render activity once we click another button
*/

// -write activateSelectButton function
function activateSelectedButton() {

}


// -fetch the dataset function from the JSON fiile and save it in the Selected Option variable
let data = [];




// -write the render function 





// -also clear existing render activity once we click another button
