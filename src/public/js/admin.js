let vidList = document.querySelector('.videos-list')
let file = document.querySelector('#uploadInput')


async function renderVideoPublic (){
	let video = await request('/vidio')
	let vid = video.filter(vid => {
		return vid.userId == +(window.localStorage.getItem('userId'))
	});
	vid.forEach(el => {
		const [li, video, p, img] = createElements('li', 'video','p', 'img')
		li.setAttribute('class', 'video-item')
		video.setAttribute('src', backendApi + el.vidioUrl)
		video.setAttribute('controls', '')
		p.setAttribute('class', 'content')
		p.setAttribute('contenteditable', 'true')
		img.setAttribute('src', './img/delete.png')
		img.setAttribute('width', '25px')
		img.setAttribute('class', 'delete-icon')
		img.setAttribute('alt', 'upload')

		p.textContent = el.vidioTitle
		li.append(video, p, img)
		vidList.append(li)

		img.addEventListener('click', even => {
			li.remove()
			vidDelete(el.fileId)
		})

		p.addEventListener('keyup', event => {
			if(event.keyCode == 13){
				vidioUpdate(el.fileId, p.textContent)
			}
		})
	});

}


async function vidioUpdate(arg, title){
	console.log(arg)
	console.log(title)
	let body = {
		fileId: arg,
		vidioTitle: title
	}
	const response = await request('/vidio', 'PUT', body)
	if(!(response.status === 200 || response.status === 201)) {
		alert(response.message)
	}
}

submitButton.onclick = async event => {
	try {
		event.preventDefault()
		let formData = new FormData()

		formData.append('vid', file.files[0])
		formData.append('title', videoInput.value)


		const response = await request('/vidio', 'POST', formData)		
		window.location = '/'
		
	} catch(error) {
		alert(error.message)	
	}
}

async function vidDelete(arg){
	let res = await request('/vidio','DELETE',{
		fileId: arg
	})

	console.log(res)
}


renderVideoPublic()