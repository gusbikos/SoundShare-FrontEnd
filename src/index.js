// dev 2 
////////////// LOGIN FORM //////////////
// const loginForm = document.querySelector('form#login-from')
// loginForm.addEventListener('submit', event => {
//     event.preventDefault()
// })

////////////// USER INFO //////////////

const userDiv = document.querySelector('div#users-name')
const songInfo = document.querySelector('#song-info')

function user(userName) {

    const h2 = document.querySelector('h2')
    h2.textContent = userName.name
    h2.dataset.id = userName.id   

    const ul = document.querySelector('ul.list-playlist')

    ul.innerHTML = ''
    userName.playlists.forEach(list => {

        const li = document.createElement('li')
        li.textContent = list.name
        li.dataset.id = list.id
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn') 
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
        // deleteBtn.textContent = 'x'
        deleteBtn.dataset.id = list.id
        li.append(deleteBtn)
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
    
    const songInfo = document.querySelector('div#song-info')
    const songDiv = document.createElement('div')
    songDiv.classList.add('playlist-songs-detail')
    songDiv.dataset.id = songs.id

    const h5 = document.createElement('h5')
    h5.textContent = `Title: ${songs.title}`
    
    const pArtist = document.createElement('p')
    pArtist.classList.add('artist')
    pArtist.textContent = `Artist: ${songs.artist}`
    
    const p = document.createElement('p')
    p.classList.add('genre')
    p.textContent = `Genre: ${songs.genre}`
    
    const aTag = document.createElement('a')
    aTag.href = songs.link
    aTag.textContent = "View"

    const likes = document.createElement('p')
    likes.classList.add('likes-display')
    // Using emoji will break the code when we use `emoji ${songs.likes}`
    likes.textContent = `${songs.likes} likes`
    likes.dataset.id = songs.id
    
    const likesBtn = document.createElement('button')
    likesBtn.dataset.id = songs.id
    likesBtn.classList.add("like-btn")
    likesBtn.textContent = "♥"
    
    songDiv.append(h5, pArtist, p, aTag, likes, likesBtn)
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
                    playlists.playlist_songs.forEach(song => {

                        playlistSongs(song.song)
            })
        })  
    }
})

////////////// LIST OUT ALL THE SONGS //////////////

const renderSongs = (songLibrary) => {

    const libraryDiv = document.createElement('div')
    libraryDiv.classList.add('song')
    // libraryDiv.dataset.id = songsLibrary.id

    const h5 = document.createElement('h5')
    h5.textContent = `Title: ${songLibrary.title}`
    
    const pArtist = document.createElement('p')
    pArtist.classList.add('artist')
    pArtist.textContent = `Artist: ${songLibrary.artist}`
    
    const p = document.createElement('p')
    p.classList.add('genre')
    p.textContent = `Genre: ${songLibrary.genre}`
    
    const aTag = document.createElement('a')
    aTag.href = songLibrary.link
    aTag.textContent = "View"

    const addBtn = document.createElement('button')
    addBtn.dataset.id = songLibrary.id
    addBtn.classList.add("btn")
    addBtn.textContent = "Add to Playlist"
    
    libraryDiv.append(h5, pArtist, p, aTag, addBtn)
    const songLibraryDiv = document.querySelector('div#song-library')
    songLibraryDiv.append(libraryDiv)
}


////////////// FETCH ALL THE SONGS //////////////

function fetchSong(){
    fetch('http://localhost:3000/songs')
    .then(response => response.json())
    .then(songsArray => {
    songsArray.forEach(song => {renderSongs(song)})
})
}

////////////// INCREASE LIKE TO SONG //////////////
////////////// FIND THE WHOLE DOCUMENT TO TARGET THE LIKES BUTTON/////////////
document.addEventListener('click', e =>{

    if(e.target.matches("button.like-btn")){

        const likeNumber = e.target.parentElement.children[4]
        const currentLike = parseInt(likeNumber.textContent)
        const newLike = currentLike + 1
        
        fetch(`http://localhost:3000/songs/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({likes: newLike})
        })
            .then(response => response.json())
            .then(songObj => {
                likeNumber.textContent = `${songObj.likes} likes`
        })
    }
})

////////////// ADD SONG TO PLAYLIST //////////////

const songLibraryDiv = document.querySelector('div#song-library')

songLibraryDiv.addEventListener('click', event => {
    
    if(event.target.matches('button')){
       
        fetch(`http://localhost:3000/playlist_songs`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                song_id: event.target.dataset.id,
                playlist_id: 1
            })
        })
        .then(response => response.json())
        .then(songToPlaylist => {
                console.log("songToPlaylist", songToPlaylist)
    // How do we do add this song to a specific playlist
            // playlistSongs(songToPlaylist)
            
        })
    }
})


////////////// CREATE NEW PLAYLIST //////////////

const addPlayButton = document.querySelector('#submit-btn')

addPlayButton.addEventListener('click', e => {
    e.preventDefault()    
    const playListName = e.target.parentElement.children[1].value
    
    fetch('http://localhost:3000/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name: playListName, user_id: 1})
    })
    .then(res => res.json())
    .then(newPlaylist => {
        
        const ul = document.querySelector('ul.list-playlist')
        const li = document.createElement('li')
        li.textContent = playListName
        li.dataset.id = newPlaylist.id
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn') 
        deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
        // deleteBtn.textContent = 'x'
        deleteBtn.dataset.id = newPlaylist.id
        li.append(deleteBtn)  
        ul.append(li)
    })
})

////////////// DELETE THE PLAYLIST ///////////


const deleteBtn = document.querySelector('button.delete-btn')

document.addEventListener('click', e => {
    e.preventDefault()
    
    const li = e.target.closest('li')

    if(e.target.matches('button.delete-btn')){
        
        fetch(`http://localhost:3000/playlists/${li.dataset.id}`, {
            method: "DELETE"
        })
    li.remove()
    }
})

////////////// ADD SONG FORM //////////////

const newSongButton = document.querySelector('#newsong-btn')

newSongButton.addEventListener("click", e => {
        e.preventDefault()
        /* selecting the new song form*/
        const form = e.target.parentElement
        const formData = form.children

        const title = formData.title.value
        const artist = formData.artist.value
        const genre = formData.genre.value
        const link = formData.link.value

        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({title: title, artist: artist, genre: genre, link: link})
        }
    
        fetch('http://localhost:3000/songs', option)
        .then(res => res.json())
        .then(newSong => {
            renderSongs(newSong)
        })  
})

fetchSong()
fetchUsers()





































































































// function playlistSongsLoad(){
// fetch('http://localhost:3000/playlists')
//             .then(response => response.json())
//             .then(playlists => {console.log(playlists)
// // we had a id problem when we have "playlistSongs"(playlists.playlist_songs.forEach(song)
//                     playlists.playlist_songs.forEach(song => {
//                         console.log(song.song)
//                         firstPlaylistSongs(song.song[0])
//             })
//         })  
//     }


// playlistSongsLoad()





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
