import axios from 'axios';

class Song {
  constructor() {
    this.song = axios.create({
      baseURL: 'http://localhost:3001/song',
    });
  }

  newSong(song) {
    console.log('NEWSONG');
    return this.song.post('/newsong', song)
      .then(({ data }) => {
        console.log(data);
        return data;
      });
  }

  getSong(id) {
    return this.song.get(`/song/${id}`)
      .then(({ data }) => data);
  }

  editSong(id, song) {
    return this.song.post(`/song/${id}`, song)
      .then(({ data }) => data);
  }

  deleteSong(id) {
    return this.song.delete(`/song/${id}`)
      .then(({ data }) => data);
  }
}

const song = new Song();

export default song;
