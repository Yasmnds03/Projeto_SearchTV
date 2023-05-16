const $ = document.getElementById.bind(document)
const API_URL = 'https://api.tvmaze.com/shows'

window.onload = () => {
	const favorites = JSON.parse(localStorage.getItem('favorites')) || []

	favorites.forEach(id => {
		fetch(`${API_URL}/${id}`).then(response => {
			response.json().then(result => {
				// const {
				// 	name,
				// 	type,
				// 	language,
				// 	genres,
				// 	status,
				// 	image,
				// 	network,
				// 	webChannel
				// } = result

				// const running = status === 'Ended' ? false : true
				// const imageUrl = image ? image.medium : '/img/noimage.png'
				// const channel = network ? network.name : webChannel.name

				// $('poster').src = imageUrl
				// $('name').innerText = name
				// $('type').innerText = type
				// $('language').innerText = language
				// $('genres').innerText = genres.join(', ')
				// $('running').innerText = running ? 'Sim' : 'Não'
				// $('channel').innerText = channel

				const { id, name, image } = result

				const imageUrl = image ? image.medium : '/img/noimage.png'

				const newShow = {
					id,
					name,
					imageUrl
				}

				printCard(newShow)
			})
		})
	})
}

const printCard = show => {
	const posterId = `poster-${show.id}`
	const titleId = `title-${show.id}`

	const showCard = `
        <div class="show-card">
          <a href="/details.html?id=${show.id}">
            <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
          </a>

          <a href="/details.html?id=${show.id}">
            <h3 id="${titleId}">${show.name}</h3>
          </a>
          </div>
    `

	const showsArea = $('favorites-area')
	showsArea.insertAdjacentHTML('beforeend', showCard)
}

// const API_URL = 'https://api.tvmaze.com/shows'

// const search = window.location.search
// const params = new URLSearchParams(search)
// const id = params.get('id')
// console.log(id)

// fetch(`${API_URL}/${id}`).then(response => {
// 	response.json().then(result => {
// 		const { name, type, language, genres, status, image, network, webChannel } =
// 			result

// 		const running = status === 'Ended' ? false : true
// 		const imageUrl = image ? image.medium : '/img/noimage.png'
// 		const channel = network ? network.name : webChannel.name

// 		$('poster').src = imageUrl
// 		$('name').innerText = name
// 		$('type').innerText = type
// 		$('language').innerText = language
// 		$('genres').innerText = genres.join(', ')
// 		$('running').innerText = running ? 'Sim' : 'Não'
// 		$('channel').innerText = channel
// 	})
// })
