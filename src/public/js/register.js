let form = document.querySelector('.site-form')
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


form.onsubmit = async event => {
	try {
		event.preventDefault()

		let formData = new FormData()
		
		formData.append('images', uploadInput.files[0])
		formData.append('username', usernameInput.value)
		formData.append('password', passwordInput.value)
	
		const response = await request('/auth/register', 'POST', formData)		
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userId', response.userId)
		window.location = '/'
		
	} catch(error) {
		invalid_date.textContent = error.message
	}
}