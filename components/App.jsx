import React, {Component} from 'react';
import API from './API';

export default class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }
  createRequest(opts) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(opts.method || "GET", opts.url);
      if (opts.headers) {
        Object.keys(opts.headers).forEach(key => {
          xhr.setRequestHeader(key, opts.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(opts.body);
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.file);

    const options = API.getSignedHTTPRequest('https://myApi/files/', formData);
    const promise = this.createRequest(options);
    promise.then(function(response){
      console.log('Success: ', response);
    }, function(error){
      console.log('Failure: ', error);
    })
  }
  handleImageUpdate(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file
      });
    }
    reader.readAsDataURL(file)
  }
  render() {
  return (
    <div className="previewComponent">
      <form onSubmit={(e)=>this.handleSubmit(e)}>
        <input className="fileInput" type="file" onChange={(e)=>this.handleImageUpdate(e)} />
        <button className="submitButton" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
      </form>
    </div>
    )
  }
}