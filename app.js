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
const retreiveData = async () => {
    const response = await fetch('data.json')
    const fetchedData = await response.json()
    data = fetchedData
     buttons[0].click()

}
// Clear existing rendered activity once another button is clicked
const clearActivities = () => {
    const activities = document.querySelectorAll('.tracker-activity')    
    activities.forEach(a => a.remove())
}

// Render function 
const render = async (clickedOption) => {    
    clearActivities();
const activityTracker = document.querySelector('section.activity-tracker')
const determineTimeframe = (option) => {   
  switch (option) {
    case 'daily':
      return 'Yesterday'
        break;
    case 'weekly':
      return 'Last week'
        break;
    case 'monthly':
      return 'Last month'
        break;
    default:
      break;
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