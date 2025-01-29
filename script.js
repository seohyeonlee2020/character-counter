


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
	let textInput = activeTab.querySelector(".text-input")
	let charLimit = activeTab.querySelector(".char-limit")

	textInput.addEventListener("input", () => {counter(activeTab, textInput)})

  }




const counter = (activeTab, textInput) => {
	let maxChars = 0
	let maxWords = 0

	let numCharsSpace = 0
	let numCharsNoSpace = 0

	const charCountSpace = activeTab.querySelector(".char-count-space")
	const charCountNoSpace = activeTab.querySelector(".char-count-no-space")

	const wordCount = activeTab.querySelector(".word-count")

	const charLimit = activeTab.querySelector(".char-limit")

	if (charLimit.value){

		numChars = textInput.value.length
		maxChars = parseInt(charLimit.value)
		textInput.setAttribute("maxlength", maxChars)
		if (activeTab.id == 'en'){
		charCountSpace.textContent = numCharsSpace == 1 ? `${numCharsSpace}/${maxChars} Characters (including space)` : `${numCharsSpace}/${maxChars} (including space)`
		charCountNoSpace.textContent = numCharsNoSpace == 1 ? `${numCharsNoSpace}/${maxChars} Characters (including space)` : `${numCharsNoSpace}/${maxChars} (including space)`
		}
		}
		if (activeTab.id == 'ko'){
			charCountSpace.textContent = `${numCharsSpace}/${maxChars} 자 (공백 포함)`
			charCountNoSpace.textContent = `${numCharsNoSpace}/${maxChars} 자 (공백 포함)`
		}

	numCharsSpace = textInput.value.length
	numCharsNoSpace = textInput.value.split("").filter((char) => char != " ").length;


	if (activeTab.id == 'en'){
		numWords = textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;

		charCountSpace.textContent = `${numCharsSpace} Characters (space included)`
		charCountNoSpace.textContent = `${numCharsNoSpace} Characters (except space)`
		wordCount.textContent = `${numWords} Words`

		const wordLimit = document.getElementById("word-limit")
		if (wordLimit.value){
			wordLimit.addEventListener("input", checkMax)
			numWords = textInput.value.trim().split(/\s+/).filter(word => word.length > 0).length;
			maxWords = parseInt(wordLimit.value)
			wordCount.textContent = numWords == 1 ? `${numWords}/${maxWords} Word` : `${numWords}/${maxWords} Words`
		}
	}
	if (activeTab.id == 'ko'){
		charCountSpace.textContent = `${numCharsSpace} 자 (공백 포함)`
		charCountNoSpace.textContent = `${numCharsNoSpace}  자 (공백 제외)`
	}

		checkMax(numCharsSpace, maxChars, charCountSpace)
		checkMax(numCharsNoSpace, maxChars, charCountNoSpace)
}



const checkMax = (currentCount, maxCount, displayCount) => {
	/*if (currentCount > maxCount){
		textInput.value = textInput.value.slice(0, maxCount)
	  } */
	if (currentCount >= maxCount && maxCount > 0){
		displayCount.classList.add("red")
		}
	else{
		displayCount.classList.remove("red")
	}
}


