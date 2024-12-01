let Speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector(".voices");

// Load voices when they are available
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    Speech.voice = voices[0]; // Set default voice

    // Populate the dropdown with available voices
    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });
};

// Update the selected voice
voiceSelect.addEventListener("change", () => {
    Speech.voice = voices[voiceSelect.value];
});

// Handle the button click to speak the text
document.querySelector("button").addEventListener("click", () => {
    Speech.text = document.querySelector("textarea").value;
    if (Speech.text.trim() !== '') {
        window.speechSynthesis.speak(Speech);
    } else {
        alert("Please enter some text to speak.");
    }
});
