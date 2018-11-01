import axios from 'axios';

class Song {
  constructor() {
    this.song = axios.create({
      baseURL: 'http://localhost:3001/song',
      withCredentials: true,
    });
  }

  newSong(song) {
    return this.song.post('/newsong', song)
      .then(({ data }) => data);
  }

  getUserSongs() {
    return this.song.get('/getusersongs')
      .then(({ data }) => data);
  }

  getSong(id) {
    return this.song.get(`/${id}`)
      .then(({ data }) => data);
  }

  editSong(id, song) {
    return this.song.put(`/${id}`, song)
      .then(({ data }) => data);
  }

  deleteSong(id) {
    return this.song.delete(`/${id}`, id)
      .then(({ data }) => data);
  }
}

const song = new Song();

export default song;
