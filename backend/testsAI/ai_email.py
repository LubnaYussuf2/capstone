import openai
import requests


def generate_email_custom(prompt):

    api_key = 'Your-api-key'
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": prompt}],
        "max_tokens": 500,
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.5,
        "stop": ["Sincerely", "Best regards"],  # Example stop sequences
    }

    response = requests.post(url, headers=headers, json=data)
    

    if response.status_code == 200:

        try:
            email_content = response.json()["choices"][0]["message"]["content"]
            return email_content  
        except KeyError:

            return "Error: 'choices' key not found in response."
    else:

        return f"Error: API call failed with status code {response.status_code} - {response.text}"


# marketing_email = generate_email_custom(prompt)
# print(marketing_email)

# we will give more customization , purchses such as packages visted attrcation and make the email generation more customized 
