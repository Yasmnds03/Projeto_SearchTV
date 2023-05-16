const $ = document.getElementById.bind(document)

const API_URL = 'https://api.tvmaze.com/shows'

const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get('id')
console.log(id)

fetch(`${API_URL}/${id}`).then((response) => {
  response.json().then((result) => {
    const { name, type, language, genres, status, image, network, webChannel } =
      result

    const running = status === 'Ended' ? false : true
    const imageUrl = image ? image.medium : '/img/noimage.png'
    const channel = network ? network.name : webChannel.name

    $('poster').src = imageUrl
    $('name').innerText = name
    $('type').innerText = type
    $('language').innerText = language
    $('genres').innerText = genres.join(', ')
    $('running').innerText = running ? 'Sim' : 'Não'
    $('channel').innerText = channel
  })
})
