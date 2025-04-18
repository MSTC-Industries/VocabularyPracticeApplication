var current_lesson = "00"
var current_lesson_word_data = {}

var word_options = []
var current_word = ""
var correct_def = ""
var correct_button

function learndef_onload() { //runs when the learning defenitions page opens up
    current_lesson = sessionStorage.getItem("current_lesson")
    document.getElementById("title").innerHTML = "Defenition quiz for lesson " + current_lesson //show the lesson name in the title
    current_lesson_word_data = lesson_data[current_lesson].words //set the current lesson's data
    word_options = Object.keys(current_lesson_word_data) //set the options for words that can be used
    setQuestion()
}

function setQuestion() { //this sets the data for the questions
    current_word = word_options[Math.floor(Math.random() * word_options.length)] //the current word that's being questioned
    word_options.splice(word_options.indexOf(current_word), 1) //that word is removed from the options left to use
    document.getElementById("question").innerHTML = current_word //the question is set to the word for the user to see

    correct_def = current_lesson_word_data[current_word].def //store the correct defenition for the current word
    var other_defs = [] //initiate an array for all the other defenitions
    for (word in current_lesson_word_data) { //iterate through all the words
        if (current_lesson_word_data[word].def != correct_def) { //if the defenition is not the correct one
            other_defs.push(current_lesson_word_data[word].def) //add it to the other defenitions avaliable
        }
    }

    var buttons = document.querySelectorAll("#anwsers button") //get a list of all the buttons
    var anwser_idx = Math.floor(Math.random() * 4) //select a random button to have the correct defenition

    buttons.forEach((button, i) => { //iterate through all the buttons
        if (i == anwser_idx) { //if this button is the one selected to be the correct one
            button.textContent = correct_def //set the text to the correct button
            correct_button = button //store the button for later use
        } else { //if not the correct button
            var def = other_defs[Math.floor(Math.random() * other_defs.length)] //pick a defenition from the other defenition options
            other_defs.splice(other_defs.indexOf(def), 1) //remove it so it cannot be used again
            button.textContent = def //set the button's text to the selected defenition
        }
    })
}