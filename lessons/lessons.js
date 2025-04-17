function index_setLesson(lessonNum) { //sets the lesson # to use
    sessionStorage.setItem("current_lesson", lessonNum)
}

function lessons_onload() { //runs when the lessons page opens up
    document.getElementById("title").innerHTML = "Lesson " + sessionStorage.getItem("current_lesson") //set the title to the lesson
}