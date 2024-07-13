document.querySelector("button").addEventListener("click", () => {
    const speech = new SpeechSynthesisUtterance();
    const text = document.querySelector("textarea").value;
    
    let voices = [];
    let voiceSelect = document.querySelector("select");

    const populateVoices = () => {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = ""; 
        voices.forEach((voice, i) => {
            const option = new Option(voice.name, i);
            voiceSelect.options.add(option);
        });

        if (voices.length > 0) {
            speech.voice = voices[0];
        }
    };

    window.speechSynthesis.onvoiceschanged = populateVoices;

    voiceSelect.addEventListener("change", () => {
        speech.voice = voices[voiceSelect.value];
    });

    if (window.speechSynthesis.getVoices().length > 0) {
        populateVoices();
    }

    if (text.trim() !== "") { 
        speech.text = text;
        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter some text in the textarea.");
    }
});
