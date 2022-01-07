let list = document.querySelector('.navbar-list')
let vidList = document.querySelector('.iframes-list')
let createVideo = document.querySelector('.search-btn')
let btn = document.querySelectorAll('.hover-after')
let input = document.querySelector('.search-input ')

let bt = document.querySelector('.hover-after')

let dataVidio = []


const voice = new window.webkitSpeechRecognition()
voice.lang = 'en-EN'

micrafon.addEventListener('click', (event) => {
	event.preventDefault()
	voice.start()
	input.placeholder = "Eshityabman"
})

voice.onspeechstart = () => {
}

voice.onsoundend = () => {
	input.placeholder = "stop"
}

voice.onresult = (event) => {
	let result = event.results[0][0].transcript
	setTimeout(async() => {
		input.value = result
		let data = await request('/vidio')
		let res = data.filter(video => video.vidioTitle.includes(input.value))
			vidList.innerHTML = null
			renderVidios(0, res)
			dataList2(res)
	}, 500);
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

async function renderVidios(arg=0,filter = []){
	let vid = []
	let vidio = await request('/vidio')
	let users = await request('/users')
	let photos = await request('/images','POST')
	if (filter.length) vidio = filter
	
	if(arg != 0 ){
		vid = vidio.filter( vid => +vid.userId == +arg)
	}else{
		vid = vidio
	}
	console.log(vid)
	vidList.innerHTML = null
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
		dataVidio = vid
		dataList2(vid)
	
}


let datalist = document.querySelector('#datalist')
async function dataList2(arg = []){
	let vidios = await request('/vidio')
	if (arg.length) vidios = arg
	let htmlDataset = ``
	vidios.forEach(video => {
		htmlDataset += `<option value="${video.vidioTitle}">`
	});
	datalist.innerHTML = htmlDataset;
}	


createVideo.addEventListener('click', async el => {
	el.preventDefault()
	let res = dataVidio.filter(video => video.vidioTitle.includes(input.value))
	voise.value = null
	renderVidios(0, res)
	dataList2(res)
}) 



salom.onclick = () =>{
	window.location = "/admin"
}



dataList2()
renderVidios(0)
renderUsers()

