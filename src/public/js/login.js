let btn = document.querySelector('.site-form')
let show = true

showButton.onclick = () =>{
	if (show){
		passwordInput.type = 'text'
		show = false
	} else {
		passwordInput.type = 'password'
		show = true
	}
}

btn.onsubmit = async event => {
	event.preventDefault()
	try {

		let user = {
			username: usernameInput.value,
			password: passwordInput.value,
		}
	
		const response = await request('/auth/login', 'POST', user)
		
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userId', response.userId)
		window.location = '/'
		
	} catch(error) {
		invalid_date.textContent = error.message
	}
}
