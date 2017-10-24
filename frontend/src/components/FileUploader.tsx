import * as React from 'react';
import Dropzone from 'react-dropzone'
const upload = require('superagent');

export default class FileUploader extends React.Component <any, any>{

  onDrop =(files: any) =>{

    let file = new FormData();
    file.append('file', files[0]);
    console.log(file)

    upload.post('/auth/fileUpload')
    .attach('file', files[0])
    .end((err: any, res: any) => {
      if (err) console.log(err);
      alert('File uploaded!');
    })
  }

  render(){
    return (
        <div>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            <div>Try dropping a file here, or click to select a file to upload.</div>
          </Dropzone>
        </div>
    )
  }
 
}
