/*
=========== FUNCTION DYNAMIC FLOW======HOWTO STEPS========= 
-Write a call back function that will listen to /select the clicked button ( either daily, weekly and monthly button)
-pass array as the parameter
- inside the function write a foreach method for the buttons 
-add a click eventListener to the button in the foreach method 
-Tell the event listern to run (activateSelectedButton) function
-select the activity option from that dataset that we have in the JSON file and save in a variable
-Finally render each activity passing the activatedOption variable as the parameter
====Following steps ========
-write activateSelectButton function
-fetch the dataset function from the JSON fiile and save it in the clickedOption variable
-write the render function 
-also clear existing render activity once we click another button
*/

// select all the buttons @ query selector all
const buttons = [...document.querySelectorAll('.tracker-option')]

let data = []

const buttonsAttend = (array) => {
    array.forEach(button => {
        button.addEventListener('click', () => {
            activateSelectedButton(button)
            const clickedOption = button.dataset.option
            render(clickedOption);
        })        
    });
}

// -write activateSelectButton function
    const activateSelectedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'))
    button.classList.add('active')
}


// -fetch the dataset function from the JSON fiile and save it in the Selected Option variable

// write an async function

const retreiveData = async () => {
    const response = await fetch('data.json')
    const fetchedData = await response.json()
    data = fetchedData
     buttons[0].click()

}
// -also clear existing render activity once we click another button

const clearActivities = () => {
    const activities = document.querySelectorAll('.tracker-activity')    
    activities.forEach(a => a.remove())
}


// -write the render function 
const render = async (clickedOption) => {
    
    clearActivities();

const activityTracker = document.querySelector('section.activity-tracker')

const determineTimeframe = (option) => {
    if (option === "daily") {        
        return "Yesterday"
    }else if(option === "weekly") {        
        return "Last week"
    }else if(option === "monthly") {        
        return "Last month"

    }
}

data.forEach(activity => {
    const name = activity.title
    const activityClass = name.toLowerCase().replace(' ', '-')
    const timeframeData = activity.timeframes[clickedOption]
    const previousTimeFrame = determineTimeframe(clickedOption)
    const section = document.createElement('section')
    section.classList.add('tracker-activity', activityClass)
    const activityTodisplay =`
    <div class="activity-background">
        <img src="./images/icon-${activityClass}.svg" alt="">
    </div>
    <div class="activity-info">
    <header>
      <h2 class="activity-name">
        ${name}
      </h2>
      <button class="activity-options">
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" 
          fill="#BBC0FF" fill-rule="evenodd"/></svg>
      </button>
    </header>
    <div class="activity-timeframes-wrapper">
      <div class="activity-timeframes">
        <h3 class="activity-timeframe-current">${timeframeData.current}hrs</h3>
      </div>
      <div class="activity-timeframe-previous">
        <p class="time-window">${previousTimeFrame}</p>
        <p> - </p>
        <p class="time">${timeframeData.previous}hrs</p>
      </div>
    </div>
  </div>`

  section.innerHTML = activityTodisplay
  activityTracker.append(section)
})


}

buttonsAttend(buttons)
retreiveData()