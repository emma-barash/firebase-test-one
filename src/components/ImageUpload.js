import React, { Component } from 'react';
import { storage } from '../firebase';
import DisplayImages from '../components/DisplayImages';
import axios from 'axios'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            all: [],
            url: '',
            progress: 0
        }
    }   

    handleChange = e => {
        const { files } = e.target
        if(files[0]){
            const video = files[0]
            this.setState(() =>({ video }))
        } 
    }

    handleUpload = () => {
        if(!this.state.video){
            const err = 'please choose a file!'
               return console.log(err)
            }
        const { video } = this.state;
        const uploadTask = storage.ref(`videos/${video.name}`).put(video);
        uploadTask.on('state_changed', 
        (snapshot) => {
            //progress function ...
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress})
        }, 
        (error) => {
            // error handler ...
            console.error(error)
        }, 
        () => {
            // 'complete' function ...
            storage.ref('videos').child(video.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState(ps => ({
                url
            }));
            this.postImage(url)
            this.getImages()
            })
        })
    }

    postImage = url => {
        axios.post('/images', {imgUrl: url})
        .then(res => {
            console.log(res.data)
        })
    }

    getImages = () => {
        axios.get('/images')
        .then(res => {
            console.log(res.data)
            const data = res.data
            this.setState(ps => {
                return { all: data, ...ps.all }
            })
        })
    }

    deleteImage = id => {
        console.log(id)
        axios.delete(`/images/${id}`)
        .then(res => {
            console.log(res.data)
            this.getImages()
        })
    }
    
    componentDidMount() {
        this.getImages()
    }

    render(){
        const images = this.state.all.map((image, i) => <DisplayImages key={i} {...image} delete={this.deleteImage}/>)
        return (
            <div>
                <progress max="100" value={this.state.progress}/><br/>
                <input type='file' onChange={this.handleChange}/>
                <button onClick={this.handleUpload}>upload</button><br/>
                {images}
            </div>
        );
    }
}

export default ImageUpload;