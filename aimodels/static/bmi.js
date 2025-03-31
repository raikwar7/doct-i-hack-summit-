document.getElementById('bmiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    try {
        const response = await fetch('/bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ height: parseFloat(height), weight: parseFloat(weight) }),
        });

        const data = await response.json();

        if (response.ok) {
            const { bmi, category, recommendations } = data;

            // Display results
            document.getElementById('result').innerHTML = `
                <h3>Your BMI: ${bmi}</h3>
                <button id="download-pdf">Generate Report</button>
            `;

            // Add event listener for PDF download
            document.getElementById('download-pdf').addEventListener('click', async() => {
                const pdfResponse = await fetch('/generate-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bmi, category, recommendations }),
                });

                if (pdfResponse.ok) {
                    const blob = await pdfResponse.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'BMI_Report.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } else {
                    alert('Failed to generate PDF');
                }
            });
        } else {
            document.getElementById('result').innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
    }
});