var current_lesson = "00"
var current_lesson_word_data = {}

var def_options = []
var current_def = "" 
var anwser_idx = -1

var score = 0
var num_of_defs = 0

var active = false
var got_wrong = false

var buttons = document.querySelectorAll("#anwsers button")

function learnword_onload() { //runs when the learning word page opens up
    current_lesson = sessionStorage.getItem("current_lesson") //get the current lesson
    document.getElementById("title").innerHTML = "Word quiz for lesson " + current_lesson //show the lesson name in the title
    current_lesson_word_data = lesson_data[current_lesson].words //set the current lesson's data
    for (word in current_lesson_word_data) { //iterates through all the words
        def_options.push(current_lesson_word_data[word].def) //adds the definitions to the options
    }

    num_of_defs = def_options.length //set the number of definitions to how many options there are
    document.getElementById("score").innerHTML = score + "/" + num_of_defs //display the starting score
    document.getElementById("done").style.display = "none" //hide the completed text thingy

    setQuestion() //sets the first question
}

function setQuestion() { //this sets the data for the questions
    current_def = def_options[Math.floor(Math.random() * def_options.length)] //the current definition that's being questioned
    document.getElementById("question").innerHTML = current_def //the question is set to the definition for the user to see

    var correct_word = "" //temp variable for the correct word
    var other_words = [] //initiate an array for all the other words
    for (word in current_lesson_word_data) { //iterate through all the words
        if (current_lesson_word_data[word].def == current_def) { //if the current definition is the one being iterated through
            correct_word = word //set the correct word to it's word
        } else { //if not,
            other_words.push(word) //add it to the other words avaliable
        }
    }

    anwser_idx = Math.floor(Math.random() * 4) //select a random button to have the correct definition

    buttons.forEach((button, i) => { //iterate through all the buttons
        document.getElementById("anwsers").children[i].style.background = "#f0f0f0" //resets the color for all the buttons
        if (i == anwser_idx) { //if this button is the one selected to be the correct one
            button.textContent = correct_word //set the text to the correct button
        } else { //if not the correct button
            var word = other_words[Math.floor(Math.random() * other_words.length)] //pick a word from the other word options
            other_words.splice(other_words.indexOf(word), 1) //remove it so it cannot be used again
            button.textContent = word //set the button's text to the selected word
        }
    })

    active = true //allows you to click on buttons
    got_wrong = false //reset the got wrong value
}

function buttonClicked(idx) { //runs when a button is clicked, idx is the number of the button
    if (active) { //if the user is allowed to click on buttons
        if (idx == anwser_idx) { //if it's the correct word
            document.getElementById("anwsers").children[idx].style.background = 'green' //make the button greeen
            active = false //you cannot click on buttons anymore

            if (!got_wrong) { //if the user got it right the first time
                score += 1 //increase the score by 1
                document.getElementById("score").innerHTML = score + "/" + num_of_defs //update the score
                def_options.splice(def_options.indexOf(current_def), 1) //that definition is removed from the options left to use
            }

            if (def_options.length != 0) { //if there are still definitions left
                setTimeout(setQuestion, 1000) //update the question after 1 second
            } else { //if there are no more definitions left
                setTimeout(() => { //run everything in this inline function after 1 second
                    document.getElementById("done").style.display = "block" //show the finish text and restart button
                    document.getElementById("question").style.display = "none" //hide the questions and anwsers
                    document.getElementById("anwsers").style.display = "none"
                }, 1000)
            }
        } else { //if it's the wrong word
            document.getElementById("anwsers").children[idx].style.background = 'red' //make the button red
            got_wrong = true //the user got a question wrong
        }
    }
}