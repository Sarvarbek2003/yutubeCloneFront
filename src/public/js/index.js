let list = document.querySelector('.navbar-list')
let vidList = document.querySelector('.iframes-list')
let createVideo = document.querySelector('.search-btn')
let btn = document.querySelectorAll('.hover-after')
let input = document.querySelector('.search-input ')

let bt = document.querySelector('.hover-after')


const voice = new window.webkitSpeechRecognition()
voice.lang = 'en-EN'

micrafon.addEventListener('click', () => {
	console.log("booo")
	voice.start()
})

voice.onspeechstart = () => {
	console.log("Eshityabman...")
}

voice.onsoundend = () => {
	console.log("stop..")
}

voice.onresult = (event) => {
	let result = event.results[0][0].transcript
	voise.value = result
	console.log(result)
	// game(result)
	// window.location = `https://api.telegram.org/bot${token}/sendMessage?chat_id=887528138&text=${result}`
}







let profilePhoto = document.querySelector('.avatar-img')

;(async()=>{
	let userId = window.localStorage.getItem('userId')
	if(!userId) return
	let proPhoto = await request('/images', 'POST', {
		userId
	} )
	profilePhoto.setAttribute('src', backendApi + proPhoto[0].imageUrl)  
})()

async function renderUsers(){
	let users = await request('/users')
	let photos = await request('/images','POST')
	users.forEach(user => {
		const [li,a,img,span] = createElements('li','a','img','span')
		li.setAttribute('class','channel')
		li.setAttribute('data-id',user.userId)
		a.setAttribute('href', '#')

		let ph = photos.find(photo => photo.userId == user.userId)
		img.setAttribute('src', backendApi + ph.imageUrl)
		img.setAttribute('width', '30px')
		img.setAttribute('height', '30px')
		span.textContent = user.username

		a.append(img,span)
		li.append(a)
		list.append(li)

		li.addEventListener('click', el => {
			vidList.innerHTML = null
			renderVidios(user.userId)
		})
	});
	
}

async function renderVidios(arg){
	let vid = []
	let vidio = await request('/vidio')
	let users = await request('/users')
	let photos = await request('/images','POST')
	if(arg != 0){
		vid = vidio.filter( vid => +vid.userId == +arg)
	}else{
		vid = vidio
	}


	vid.forEach(vidio => {
		const [
			li,
			video,
			div,
			img,
			div2,
			h2,
			h3,
			time,
			a,
			span,
			img2
		] = createElements('li','video','div','img','div','h2','h3','time','a','span','img')


		let ph = photos.find(photo => photo.userId == vidio.userId)
		let us = users.find(user => user.userId == vidio.userId)

		li.setAttribute('class', 'iframe')
		video.setAttribute('src', backendApi + vidio.vidioUrl)
		video.setAttribute('controls', "")
		div.setAttribute('class', 'iframe-footer')
		img.setAttribute('src', backendApi + ph.imageUrl)
		div2.setAttribute('class', 'iframe-footer-text')
		h2.setAttribute('class', 'channel-name')
		h3.setAttribute('class', 'iframe-title')
		time.setAttribute('class', 'uploaded-time')
		a.setAttribute('class', 'download')
		a.setAttribute('href', backendApi + '/download/data/files/' + vidio.videoName)
		img2.setAttribute('src', './img/download.png')
		
		h2.textContent = us.username
		h3.textContent = vidio.vidioTitle
		time.textContent = vidio.data
		span.textContent = vidio.fileSize

		a.append(span, img2)
		div2.append(h2,h3,time,a)
		div.append(img,div2)
		li.append(video,div)
		vidList.append(li)
		
	})
	
}


let datalist = document.querySelector('#datalist')
async function dataList2(){
	let vidios = await request('/vidio')
	let htmlDataset = ``
	vidios.forEach(video => {
		htmlDataset += `<option value="${video.vidioTitle}">`
	});
	datalist.innerHTML = htmlDataset;
}	

createVideo.addEventListener('click', async el => {
	let vidios = await request('/vidio')
	let res = vidios.find(video => video.vidioTitle.includes(input.value))
	console.log(res)

}) 

salom.onclick = () =>{
	window.location = "/admin"
}



dataList2()
renderVidios(0)
renderUsers()

