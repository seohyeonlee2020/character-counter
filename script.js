const textInput = document.getElementById("text-input")
const charCount = document.getElementById("char-count")
const wordCount = document.getElementById("word-count")

const charLimit = document.getElementById("char-limit")
const wordLimit = document.getElementById("word-limit")


let maxChars = 0
let maxWords = 0

let numChars = 0
let numWords = 0

charCount.textContent = `0 Characters`
wordCount.textContent = `0 Words`


const counter = () => {
	numChars = textInput.value.length
	numWords = textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;

	charCount.textContent = `${numChars} Characters`
	wordCount.textContent = `${numWords} Words`

}

const setLimits = () => {
	/* if user inputs charLimit */
if (charLimit.value){
	numChars = textInput.value.length
	maxChars = parseInt(charLimit.value)
	textInput.setAttribute("maxlength", maxChars)
	charCount.textContent = numChars == 1 ? `${numChars}/${maxChars} Characters` : `${numChars}/${maxChars} Characters`
	checkMax(numChars, maxChars, charCount)
}

if (wordLimit.value){
	numWords = textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;
	maxWords = parseInt(wordLimit.value)
	wordCount.textContent = numWords == 1 ? `${numWords}/${maxWords} Word` : `${numWords}/${maxWords} Words`
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

wordLimit.addEventListener("input", setLimits)
/*wordLimit.addEventListener("change", () => {checkMax(numWords, maxWords, wordCount)})*/

textInput.addEventListener("input", counter)
textInput.addEventListener("input", setLimits)

