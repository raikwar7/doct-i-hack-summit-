document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
            document.getElementById("preview").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("file-input");
    if (!fileInput.files.length) {
        alert("Please select an image!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("http://127.0.0.1:5000/predictimg/", { // 🔥 FIXED URL
            method: "POST",
            body: formData
        });

        const results = await response.json();
        document.getElementById("results").innerText =
            `Prediction: ${results.predicted_class} (Confidence: ${(results.confidence * 100).toFixed(2)}%)`;
    } catch (error) {
        document.getElementById("results").innerText = "Error processing the image.";
    }
});