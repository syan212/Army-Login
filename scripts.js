// Generate Output Function
function gen_output(token){
    return `<p>Token: ${token} <button type="button" id="copy-token-btn" onclick="copy_token()">Copy</button></p>`
}
// Fetch Output Template
const fetch_output_temp = gen_output('example-token-is-gonna-be-veryy-long')
// Get elements
const login_output = document.getElementById('login-output');
const copy_token_btn = document.getElementById('copy-token-btn');
const username_input = document.getElementById('username-input');
const password_input = document.getElementById('password-input');
// Add login form listener
const login_form = document.getElementById('login-form');
login_form.addEventListener('submit', function(event){
    event.preventDefault();
    var username_input_text = document.getElementById('username-input').value;
    var password_input_text = document.getElementById('password-input').value;
    login(username_input_text, password_input_text);
})
// Set login_output max width
login_output.style =  `max-width: ${username_input.offsetWidth}px; visibility: hidden;`;
login_output.innerHTML = fetch_output_temp;
// Copy Token Function
function copy_token(){
    navigator.clipboard.writeText(token);
    alert('Token Copied to Clipboard!');
}
// Login function
var token;
async function login(username, passw){
    const response = await fetch('https://army-api.onrender.com/login', {
      	method: 'POST',
      	headers: {
        	'Content-Type': 'application/json',
      	},
      	body: JSON.stringify({'user': username, 'password': passw}),
    });
    response_json = await response.json();
    if (response_json.IsSuccess){
        login_output.style =  `max-width: ${username_input.offsetWidth}px; visibility: visible;`
        login_output.innerHTML = gen_output(response_json.Token);
        token = response_json.Token;
        console.log('Success');
    } else {
        console.log('Error');
    }
    console.log(response_json);
}