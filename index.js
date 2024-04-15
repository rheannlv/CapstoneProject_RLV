const form = document.getElementById('container');
const textInput = document.getElementById('userText');
const responseTextarea = document.getElementById('response');
const save = document.getElementById('save');

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = userText.value.trim();
    
    if (mytext){
        try{
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{  
                role: "system",
                content: "Create a workout based on the target muscle group given by user."}, {
                    role: 'user', 
                    content: mytext
                }],
            temperature: 1.0,
            top_p: 0.7,
            n: 1,
            stream: false,
            presence_penalty: 0,
            frequency_penalty: 0,
        }), 
    });

    if(response.ok){
        const data = await response.json();
        responseTextarea.value = data.choices[0].message.content;
        console.log('Result:', data);
    } else {
        responseTextarea.value = 'Error: Unable to process your request.';
    }

     } catch (error){
        console.error('Error:', error);
        responseTextarea.value= 'Error: Unable to process your request.';
        // Handle error
     }
}//if statement

});//form 