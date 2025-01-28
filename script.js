const textInput = document.getElementById("text-input")

const charCount = document.getElementById("char-count")

const counter = () => {
const textLength = textInput.value.split("").length

if (textLength >= 50){
  textInput.textContent = textInput.value.slice(50)
}
  charCount.textContent = `Character Count: ${textLength}/50`

if (textLength === 50){
  charCount.classList.add("red")
  }
else{
  charCount.classList.remove("red")
  }

}

textInput.addEventListener("keyup", counter)
