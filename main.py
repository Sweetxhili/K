import os
from flask import Flask, render_template, request, jsonify
from ai_enhancer import enhance_cv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enhance', methods=['POST'])
def enhance():
    cv_content = request.json.get('cv_content')
    if not cv_content:
        return jsonify({'error': 'No CV content provided'}), 400

    try:
        enhanced_cv = enhance_cv(cv_content)
        return jsonify({'enhanced_cv': enhanced_cv})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/result')
def result():
    return render_template('result.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
