async function classifyText() {
    const textInput = document.getElementById("textInput").value;

    const payload = {
        inputs: textInput
    };

    const response = await fetch("https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    const sortedOutput = data[0].sort((a, b) => b.score - a.score);
    const prediction = sortedOutput[0];
    const resultElement = document.getElementById("sentimentResult");
    resultElement.textContent = prediction.label.charAt(0).toUpperCase() + prediction.label.slice(1) + " :- " + (prediction.score * 100).toFixed(2) + "%";
}