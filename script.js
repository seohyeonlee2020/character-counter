const textInput = document.getElementById("text-input")
const charCount = document.getElementById("char-count")
const wordCount = document.getElementById("word-count")

const charLimit = document.getElementById("char-limit")
const wordLimit = document.getElementById("word-limit")


let maxChars = 0
let maxWords = 0

let numChars = 0
let numWords = 0

charCount.textContent = `0 자`

const counter = () => {
	numChars = textInput.value.length
	numWords = textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;

	charCount.textContent = `${numChars} 자`
}

const setLimits = () => {
	/* if user inputs charLimit */
if (charLimit.value){
	numChars = textInput.value.length
	maxChars = parseInt(charLimit.value)
	textInput.setAttribute("maxlength", maxChars)
	charCount.textContent = numChars == 1 ? `${numChars}/${maxChars}글자` : `${numChars}/${maxChars}글자`
	checkMax(numChars, maxChars, charCount)
}

}

const checkMax = (currentCount, maxCount, displayCount) => {
	/*if (currentCount > maxCount){
		textInput.value = textInput.value.slice(0, maxCount)
	  } */
	if (currentCount >= maxCount){
		displayCount.classList.add("red")
		}
	else{
		displayCount.classList.remove("red")
	}
}

charLimit.addEventListener("input", setLimits)
/*charLimit.addEventListener("change", () => {checkMax(numChars, maxChars, charCount)}) */
/*wordLimit.addEventListener("change", () => {checkMax(numWords, maxWords, wordCount)})*/

textInput.addEventListener("input", counter)
textInput.addEventListener("input", setLimits)

