const textInput = document.getElementById("text-input")
const charCount = document.getElementById("char-count")
const charLimit = document.getElementById("char-limit")

/*
const setMaxChars = () => {
	const maxChars = parseInt(charLimit.value)
	charCount.textContent = `Character Count: 0/${maxChars}`
	textInput.disabled = false;
	return maxChars
}
*/
let maxChars = 0
let textLength = 0
charCount.textContent = ``

/*takes input from maxChars*/
charLimit.addEventListener("input", () => {
	maxChars = parseInt(charLimit.value)
	if (textLength){
		charCount.textContent = `${textLength}/${maxChars} Characters`
	}
	else{
		charCount.textContent = ` /${maxChars} Characters`
	}
})

const counter = () => {

	textLength = textInput.value.length

/* if user inputs charLimit */
if (maxChars){
	textInput.setAttribute("maxlength", maxChars)
	charCount.textContent = `${textLength}/${maxChars} Characters`
	if (textLength > maxChars){
		textInput.value = textInput.value.slice(0, maxChars)
	  }

	if (textLength === maxChars){
		charCount.classList.add("red")
		}
	else{
		charCount.classList.remove("red")
	}
}
else{
	charCount.textContent = `${textLength} Characters`
	}

}

textInput.addEventListener("input", counter)

