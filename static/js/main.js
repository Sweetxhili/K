document.addEventListener('DOMContentLoaded', function() {
    const cvForm = document.getElementById('cv-form');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const enhancedCvDiv = document.getElementById('enhanced-cv');
    const downloadBtn = document.getElementById('download-btn');

    if (cvForm) {
        cvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cvContent = document.getElementById('cv-content').value;
            
            if (!cvContent.trim()) {
                showError('Please enter your CV content.');
                return;
            }

            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');

            fetch('/enhance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cv_content: cvContent }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                localStorage.setItem('enhancedCV', data.enhanced_cv);
                window.location.href = '/result';
            })
            .catch(error => {
                showError('An error occurred while enhancing your CV. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                loadingDiv.classList.add('hidden');
            });
        });
    }

    if (enhancedCvDiv) {
        const enhancedCV = localStorage.getItem('enhancedCV');
        if (enhancedCV) {
            enhancedCvDiv.textContent = enhancedCV;
        } else {
            enhancedCvDiv.textContent = 'No enhanced CV found. Please go back and submit your CV for enhancement.';
        }
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const enhancedCV = localStorage.getItem('enhancedCV');
            if (enhancedCV) {
                const blob = new Blob([enhancedCV], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'enhanced_cv.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        });
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
});
