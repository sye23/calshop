import * as React from 'react';
import axios from 'axios';
import {Input, Table, Button, Message, Modal,Icon, Header} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import * as querystring from 'querystring';




export default class FileUploader extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
       files: [], 
       modalOpen: false
    }
  }

 onDrop = (files: any)=> {
    this.setState({
      files:files
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })
  
  handleClose = () => this.setState({ modalOpen: false })

  uploadClick = ()=>{
    const fd: any = new FormData();

    const token: any = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token }
    };

    const path = localStorage.getItem('path');
    fd.append('path', path);
    for(let i = 0; i < this.state.files.length; i++){
      fd.append('files', this.state.files[i]);
    }
    
    let response = axios.post(`/api/fileUpload`,fd, config);
    this.handleClose();
  }

  cancelClick = ()=>{
    let files:any = [];
    this.setState({files});
  }


  render() {
    return (
      <div className="App">

        <Modal
                trigger={<Button size="huge"inverted onClick={this.handleOpen}>Upload Files<small>(optional)</small></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                
                size='small'
              >
                <Modal.Content>
                <div className="dropzone">
                  <Dropzone accept=".pdf,.xml,.xlsx,.xlsm,.xltx,.xltm,.csv,.txt,.doc,.docx, .ai, .eps, .jpeg, .png" onDrop={this.onDrop}>
                    <p>Click here to upload guest lists, or drag and drop <br/> (max 5 files, max 25mb)</p>
                  </Dropzone>
                </div>
                <aside className ='uploadModal'>
                  <Message color='teal'hidden= {(this.state.files.length)?false:true}>
                  <Table basic='very'>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>File Name</Table.HeaderCell>
                        <Table.HeaderCell>File Size</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                      this.state.files.map((f:any, index: any) => {
                        return (
                        <Table.Row  key={f.name}>
                          <Table.Cell>{f.name}</Table.Cell>
                          <Table.Cell>{f.size} bytes</Table.Cell>
                        </Table.Row>
                        )}
                      )}
                    
                    </Table.Body>
                  </Table>
                  <Button.Group >
                    <Button onClick={this.cancelClick}>Cancel</Button>
                    <Button.Or />
                    <Button positive onClick= {this.uploadClick}>Upload</Button>
                  </Button.Group>
                  </Message>
                  
                </aside>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' onClick={this.handleClose} inverted>
                    <Icon name='window close outline' /> Close
                  </Button>
                </Modal.Actions>
              </Modal>
        
       
      </div>
    );
  }
}

