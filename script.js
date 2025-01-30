


document.getElementById("default").click()

function openTab(event, langCode) {

	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tab-content");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	  document.getElementById(langCode).style.display = "block";
	  event.currentTarget.className += " active";

	let activeTab = document.querySelector('.tab-content[style="display: block;"]');
	console.log('active tab', activeTab)
	activeTab.classList.add("active-tab")

	const textInput = activeTab.querySelector(".text-input")
	textInput.addEventListener("input", () => main(activeTab, textInput))

	const charLimit = activeTab.querySelector(".char-limit")
	charLimit.addEventListener("input", () => setCharLimits(activeTab, textInput, charLimit) )
	charLimit.addEventListener("emptied", () => removeCharLimits(activeTab, textInput))

	if (activeTab.id == 'en'){
		const wordLimit = document.getElementById("word-limit")
		wordLimit.addEventListener("input", () => setWordLimits(activeTab, textInput, wordLimit))
		//console.log("line after adding elistener to wordlimit")
	}

  }

const main = (activeTab, textInput) => {
	//count chars and display counts
	const {numCharsSpace, numCharsNoSpace} = countChars(textInput)
	//console.log("numCharsSpace being passed into displayCharCounts", numCharsSpace, typeof numCharsSpace)
	//console.log("numCharsNoSpace being passed into displayCharCounts", numCharsSpace, typeof numCharsSpace)
	displayCharCounts(activeTab, numCharsSpace, numCharsNoSpace)

	//count words and display counts if applicable
	if (activeTab.id == 'en'){
		const numWords = countWords(textInput)
		displayWordCounts(activeTab, numWords)
	}

	//const charLimit = activeTab.querySelector(".char-limit")

	if (activeTab.id == 'en'){
		const wordLimit = document.getElementById("word-limit")
		const wordCount = activeTab.querySelector("word-count")
		wordLimit.addEventListener("input", () => setWordLimits(activeTab, wordLimit, numWords, wordCount))
		wordLimit.addEventListener("emptied", () => removeWordLimits(activeTab, textInput))

		/*if (textInput.value && wordLimit.value){
			checkMax(numWords, parseInt(wordLimit.value), wordConut)
		}*/
	}
}

const countChars = (textInput) => {
	console.log("counter is called")
	//console.log("activetab", activeTab.id, "text", textInput.value, textInput.value.length)

	const numCharsSpace = textInput && textInput.value ? textInput.value.length : 0
	const numCharsNoSpace = textInput && textInput.value ? textInput.value.split("").filter((char) => char != " ").length : 0
	//const charCountSpace = activeTab.querySelector(".char-count-space")
	//const charCountNoSpace = activeTab.querySelector(".char-count-no-space")
	//display counts
	//displayCounts(activeTab, textInput, numCharsSpace, numCharsNoSpace)

	//set limits (event listeners to charlimit and wordlimit)
	//check if text is longer than given limits
	console.log('chars with space count from countchars', numCharsSpace)

	return {numCharsSpace, numCharsNoSpace}
}

const countWords = (textInput) => {
	let numWords = textInput && textInput.value ? textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length : 0
	return numWords
}

const displayCharCounts = (activeTab, numCharsSpace, numCharsNoSpace) => {
	console.log("displaycounts is called")
	const charCountSpace = activeTab.querySelector(".char-count-space")
	const charCountNoSpace = activeTab.querySelector(".char-count-no-space")
	console.log('numCharsSpace being displayed', numCharsSpace, typeof numCharsSpace)
	console.log('numCharsNoSpace being displayed', numCharsNoSpace, typeof numCharsNoSpace)

	charCountSpace.textContent = numCharsSpace
	charCountNoSpace.textContent = numCharsNoSpace

}

const displayWordCounts = (activeTab, numWords) => {
	const wordCount = activeTab.querySelector(".word-count")
	wordCount.textContent = numWords
}

const setWordLimits = (activeTab, textInput, wordLimit) => {
	console.log("setwordlimits called")
		const maxWordArea = activeTab.querySelector(".max-words")
		let maxWords = 0
		if (wordLimit.value){
			maxWords = parseInt(wordLimit.value)
			maxWordArea.textContent = `/${maxWords}`
		}
		else{
			maxWordArea.textContent = ``
		}
		const numWords = countWords(textInput)
		const wordCount = activeTab.querySelector(".word-count")

		if(textInput.value){
			checkMax(numWords, maxWords, wordCount)
		}
		else{
			checkMax(numWords, 0, wordCount)
		}
		return maxWords
	}


const setCharLimits = (activeTab, textInput, charLimit) => {
	console.log('setCharlimits called')
	const maxCharAreas = activeTab.querySelectorAll(".max-chars")
	let maxChars = parseInt(charLimit.value)
	console.log('maxchars:', maxChars)

	if(maxChars){
		//console.log('charlimit val', charLimit.value)
		//maxChars = parseInt(charLimit.value)
		console.log("maxChars > 0")
		textInput.setAttribute("maxlength", maxChars)
		maxCharAreas.forEach((area) => {area.textContent = `/${maxChars}`})
	}
	else{
		textInput.removeAttribute("maxlength")
		maxCharAreas.forEach((area) => area.textContent = ``)
	}
	//charLimit.addEventListener("emptied", () => removeCharLimits(activeTab, textInput))

	//if textinput has value, compare text length with given limits
	const {numCharsSpace, numCharsNoSpace} = countChars(textInput)
	console.log(`numCharsSpace: ${numCharsSpace} numCharsNoSpace: ${numCharsNoSpace}`)
	const charCountSpace = activeTab.querySelector(".char-count-space")
	const charCountNoSpace = activeTab.querySelector(".char-count-no-space")

	charLimit.addEventListener("input", () => {
		const {numCharsSpace, numCharsNoSpace} = countChars(textInput)
		checkMax(numCharsSpace, maxChars, charCountSpace)
		checkMax(numCharsNoSpace, maxChars, charCountNoSpace)}
	)

	textInput.addEventListener("input", () => {
		const {numCharsSpace, numCharsNoSpace} = countChars(textInput)
		checkMax(numCharsSpace, maxChars, charCountSpace)
		checkMax(numCharsNoSpace, maxChars, charCountNoSpace)
	})

	/*if (textInput.value && charLimit.value && maxChars > 0){
		console.log("textInput.value && charLimit.value && maxChars > 0 hit")
		checkMax(numCharsSpace, maxChars, charCountSpace)
		checkMax(numCharsNoSpace, maxChars, charCountNoSpace)
	}
	else{
		//remove "red" class
		checkMax(numCharsSpace, 0, charCountSpace)
		checkMax(numCharsNoSpace, 0, charCountNoSpace)
	} */

	return  maxChars
	}


	const checkMax = (currentCount, maxCount, displayCount) => {
		console.log("checkMax called")
		if (currentCount >= maxCount && maxCount > 0){
			displayCount.classList.add("red")
			console.log("red added")
			}
		else{
			displayCount.classList.remove("red")
			console.log("red removed")
		}
		console.log(`current: ${currentCount} max: ${maxCount}`)
	}


	/*
	const removeCharLimits = (activeTab, textInput) => {
		console.log("removeCharLimits called")
		const maxCharAreas = activeTab.querySelectorAll(".max-chars")
		//remove maxlength restriction
		textInput.removeAttribute("maxlength")
		maxCharAreas.forEach((area) => area.textContent = ``)
	} */
	/*
	merged with setWordLimits
	const removeWordLimits = (activeTab) => {
		const maxWordArea = activeTab.querySelector(".max-words")
		//remove maxlength restriction
		//textInput.removeAttribute("maxlength")
		maxWordArea.textContent = ``
	} */





