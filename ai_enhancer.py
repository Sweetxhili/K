from openai_chat_completion.chat_request import send_openai_request

def enhance_cv(cv_content):
    prompt = f"""
    Please enhance the following CV content. Improve the language, structure, and highlight key achievements. 
    Make it more professional and impactful without adding false information:

    {cv_content}

    Provide the enhanced CV in a clear, well-structured format.
    """

    try:
        enhanced_cv = send_openai_request(prompt)
        return enhanced_cv
    except Exception as e:
        raise Exception(f"Error enhancing CV: {str(e)}")
