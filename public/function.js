const form = document.getElementById("container")
const textInput = document.getElementById('userText');
const responseTextarea = document.getElementById('responseT');
const form1 = document.getElementById("containerU")

//Workout API for target muscle group

    form1.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const muscle = document.getElementById("muscleType").value;
            
            // Input validation
            if (!muscle) {
                throw new Error("Muscle type is required.");
            }
            const url2 = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '69f17fac65msh1147855e30625eep14a4b1jsnf85471abdec7',
                    'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
                }
            };
    
            const response = await fetch(url2, options);
    
            if (!response.ok) {
                throw new Error("Failed to fetch resource. Status: " + response.status);
            } else {

                const data = await response.json();
                
                const muscle = data[0].muscle; 
                const workout = data[0].name;
                const equipment = data[0].equipment;
                const instructions =  data[0].instructions;
                const workout1 = data[1].name;
                const equip1 = data[1].equipment;
                const instructions1 = data[1].instructions;
                const workout2 = data[2].name;
                const equip2 = data[2].equipment;
                const instructions2 = data[2].instructions;
                const workout3 = data[3].name;
                const  equip3 = data[3].equipment;
                const  instructions3 = data[3].instructions;
             
                const format = "Muscle Group: "+muscle+ '\n' +
                                "Exercise: "+workout+"\n"+
                                "Equipment: "+equipment+"\n"+
                                "Intructions: "+instructions+"\n\n"+
                                "Exercise: "+workout1+"\n"+
                                "Equipment: "+equip1+"\n"+
                                "Intructions: "+instructions1+"\n\n"+
                                "Exercise: "+workout2+"\n"+
                                "Equipment: "+equip2+"\n"+
                                "Intructions: "+instructions2+"\n\n"+
                                "Exercise: "+workout3+"\n"+
                                "Equipment: "+equip3+"\n"+
                                "Intructions: "+instructions3;

                document.getElementById('responseT').innerHTML = format;
                
            }
            const info = { muscle };

            const op = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
             };
             const result = await fetch('/', op);
             const result_data = await result.json();
             console.log(result_data);
        }

        catch (error) {
            console.error("An error occurred:", error.message);
        }
    });



//ChatGPT Weekly Program

const API_KEY = 'sk-proj-byLSizKYdOXSIgviK3BlT3BlbkFJXxLpiGmzOHApIG5srCh1';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //const mytext = userText.value.trim();
    
   // if (mytext){
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
                        content: "Create a week long weightlifting program."}],

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
                document.getElementById('responseT').innerHTML = data.choices[0].message.content;
                console.log('Result:', data);

            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        
             } catch (error){
                console.error('Error:', error);
                responseTextarea.value= 'Error: Unable to process your request.';
                // Handle error
             }
       // }//if statement
        
});//form 

function updateHistory() {
    fetch('/muscle_hx')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
    const orderedList = document.getElementById('list');
    orderedList.innerHTML = ''; // Clear existing list items if any
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.muscle;
        orderedList.appendChild(listItem);
    })
    .catch(error => console.error('Error fetching data:', error));
})

}
