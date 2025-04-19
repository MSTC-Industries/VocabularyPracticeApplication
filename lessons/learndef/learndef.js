var current_lesson = "00"
var current_lesson_word_data = {}

var word_options = []
var current_word = "" 
var anwser_idx = -1

var score = 0
var num_of_words = 0

var active = false
var got_wrong = false

var buttons = document.querySelectorAll("#anwsers button")

function learndef_onload() { //runs when the learning definitions page opens up
    current_lesson = sessionStorage.getItem("current_lesson") //get the current lesson
    document.getElementById("title").innerHTML = "Definition quiz for lesson " + current_lesson //show the lesson name in the title
    current_lesson_word_data = lesson_data[current_lesson].words //set the current lesson's data
    word_options = Object.keys(current_lesson_word_data) //set the options for words that can be used

    num_of_words = word_options.length //set the number of words to how many options there are
    document.getElementById("score").innerHTML = score + "/" + num_of_words //display the starting score
    document.getElementById("done").style.display = "none" //hide the completed text thingy

    setQuestion() //sets the first question
}

function setQuestion(remove_word = true) { //this sets the data for the questions
    current_word = word_options[Math.floor(Math.random() * word_options.length)] //the current word that's being questioned
    document.getElementById("question").innerHTML = current_word //the question is set to the word for the user to see

    var correct_def = current_lesson_word_data[current_word].def //store the correct definition for the current word
    var other_defs = [] //initiate an array for all the other definitions
    for (word in current_lesson_word_data) { //iterate through all the words
        if (current_lesson_word_data[word].def != correct_def) { //if the definition is not the correct one
            other_defs.push(current_lesson_word_data[word].def) //add it to the other definitions avaliable
        }
    }
    
    anwser_idx = Math.floor(Math.random() * 4) //select a random button to have the correct definition

    buttons.forEach((button, i) => { //iterate through all the buttons
        document.getElementById("anwsers").children[i].style.background = "#f0f0f0" //resets the color for all the buttons
        if (i == anwser_idx) { //if this button is the one selected to be the correct one
            button.textContent = correct_def //set the text to the correct button
        } else { //if not the correct button
            var def = other_defs[Math.floor(Math.random() * other_defs.length)] //pick a definition from the other definition options
            other_defs.splice(other_defs.indexOf(def), 1) //remove it so it cannot be used again
            button.textContent = def //set the button's text to the selected definition
        }
    })

    active = true //allows you to click on buttons
    got_wrong = false //reset the got wrong value
}

function buttonClicked(idx) { //runs when a button is clicked, idx is the number of the button
    if (active) { //if the user is allowed to click on buttons
        if (idx == anwser_idx) { //if it's the correct defenition
            document.getElementById("anwsers").children[idx].style.background = 'green' //make the button greeen
            active = false //you cannot click on buttons anymore

            if (!got_wrong) { //if the user got it right the first time
                score += 1 //increase the score by 1
                document.getElementById("score").innerHTML = score + "/" + num_of_words //update the score
                word_options.splice(word_options.indexOf(current_word), 1) //that word is removed from the options left to use
            }
            
            if (word_options.length != 0) { //if there are still words left
                setTimeout(setQuestion, 1000) //update the question after 1 second
            } else { //if there are no more words left
                setTimeout(() => { //run everything in this inline function after 1 second
                    document.getElementById("done").style.display = "block" //show the finish text and restart button
                    document.getElementById("question").style.display = "none" //hide the questions and anwsers
                    document.getElementById("anwsers").style.display = "none"
                }, 1000)
            }
        } else { //if it's the wrong defenition
            document.getElementById("anwsers").children[idx].style.background = 'red' //make the button red
            got_wrong = true //the user got a question wrong
        }
    }
}