// dev 2
// const loginForm = document.querySelector('form#login-from')
// loginForm.addEventListener('submit', event => {
//     event.preventDefault()
// })

// we need a function that show all playlists of a user 
// we need a function that show all songs in a playlist
////////////// USER INFO //////////////
const userDiv = document.querySelector('div#users-name')

function user(userName) {
    // const userDiv = document.querySelector('div#users-name')
    // console.log(playlistDiv)
    const h2 = document.querySelector('h2')
    h2.textContent = userName.name
    h2.dataset.id = userName.id   
    // console.log(h2)

    const ul = document.querySelector('ul.list-playlist')

    ul.innerHTML = ''
    userName.playlists.forEach(list => {
        // console.log(list)
        const li = document.createElement('li')
        li.textContent = list.name
        li.dataset.id = list.id
        // console.log(li)
        ul.append(li)
})
}

////////////// FETCH FIRST USER //////////////
function fetchUsers() {
    fetch('http://localhost:3000/users/1')
        .then(response => response.json())
        .then(userArray => {
                user(userArray)
        })
}

////////////// SONG INFO //////////////
const playlistSongs = (songs) => {
    console.log(songs.id)
    const songInfo = document.querySelector('div#song-info')
    const songDiv = document.createElement('div')
    songDiv.classList.add('playlist-songs-detail')
    songDiv.dataset.id = songs.id
    // console.log(songDiv)

    const h4 = document.createElement('h4')
    h4.textContent = songs.title
    // console.log(h2)
    
    const pArtist = document.createElement('p')
    pArtist.classList.add('artist')
    pArtist.textContent = songs.artist
    // console.log(h3)
    
    const p = document.createElement('p')
    p.classList.add('genre')
    p.textContent = songs.genre
    
    songDiv.append(h4, pArtist, p)
    songInfo.append(songDiv)
}


////////////// GET THE PLAYLIST SONG WHEN WE CLICK THE PLAYLIST//////////////
const ul = document.querySelector('ul.list-playlist')

ul.addEventListener('click', e => {

    const songInfo = document.querySelector('#song-info')
    songInfo.innerHTML = ''

    if(e.target.matches('li')) {
        fetch(`http://localhost:3000/playlists/${e.target.dataset.id}`)
            .then(response => response.json())
            .then(playlists => {
// we had a id problem when we have "playlistSongs"(playlists.playlist_songs.forEach(song)
                    playlists.playlist_songs.forEach(song => {
                        console.log(song.song)
                        playlistSongs(song.song)
            })
        })  
    }
})

fetchUsers()

////////////// LIST OUT ALL THE SONGS //////////////


















////////////// ADD SONG FORM //////////////
















































//we are not click on the user anymore
// userDiv.addEventListener('click', e => {
    
//     if (e.target.matches('li')) {
//         console.log(e.target)
//         fetch(`http://localhost:3000/users/${e.target.dataset.id}`)
//         .then(response => response.json())
//         .then(user => {
//             user.playlists.forEach(playlist => {
//                 userPlaylist(playlist)
//             })       
//         })
//     }                  
// })


// function userPlaylist(playlistName) {
//     const playlistDiv = document.querySelector('div#playlists')
//     //console.log(playlistDiv)
//     playlistName.playlist.forEach(list => {
//         const li = document.createElement('li')
//         li.textContent = playlistName.name
//         li.dataset.id = playlistName.id
//         // console.log(li)
//         playlistDiv.append(li)
//     })
// }

// function allPlaylist(playlist) {
//     const playlistDiv = document.querySelector('div#playlists')
//     //console.log(playlistDiv)
//     const li = document.createElement('li')
//     li.textContent = playlist.name
//     li.dataset.id = playlist.id
//     // console.log(li)
//     playlistDiv.append(li)
// }

// function fetchPlaylist() {
//     fetch('http:localhost:3000/playlists')
//         .then(response => response.json())
//         .then(playlistArray => {
//             playlistArray.forEach(playlist => {
//                 allPlaylist(playlist)
//                 //console.log(playlist)
//             })
//         })
// }

// function fetchSongs(song) {
//     const divSong = document.querySelector('div#playlist-songs-detail')

//     const li = document.createElement('li')
//     console.log(divSong)
//     li.textContent = song.title
//     li.dataset.id = song.id
//     divSong.append(li)
// }

// const playlistDiv = document.querySelector('div#playlists')

// playlistDiv.addEventListener('click', event => {
//     if (event.target.matches('li')) {
//         fetch(`http:localhost:3000/playlist_songs/${event.target.dataset.id}`)
//         .then(response => response)
//         .then(songs => {
//             console.log(songs)
//         })
//     }                  
// })

// function fetchSongs(song) {
//     const divSong = document.querySelector('div#list-song')

//     const li = document.createElement('li')
//     console.log(divSong)
//     li.textContent = song.title
//     li.dataset.id = song.id
//     divSong.append(li)
// }

// function fetchListSongs() {
//     fetch('http:localhost:3000/songs')
//         .then(response => response.json())
//         .then(songsArray => {
//             songsArray.forEach(song => {
//                 fetchSongs(song)
//                 //console.log(playlist)
//             })
//         })
// }

// fetchPlaylist()
// fetchListSongs()
