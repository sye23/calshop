import * as lokiIndexedAdapter from 'loki-indexed-adapter';
import * as React from 'react';
import axios from 'axios';
import {Input, Table, Button, Message, Modal,Icon, Header} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';




export default class FileUploader extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
       files: [], 
       modalOpen: false
    }
  }

 onDrop = (files: any)=> {
    console.log(files)
    this.setState({
      files:files
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })
  
  handleClose = () => this.setState({ modalOpen: false })

  uploadClick = ()=>{
    const fd = new FormData();

    for(let i = 0; i < this.state.files.length; i++){
      console.log('here')
      fd.append('files', this.state.files[i]);
    }
    
    let response = axios.post('/auth/fileUpload', fd);
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
                trigger={<Button inverted onClick={this.handleOpen}>Upload Guest Lists<small>(optional)</small></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                
                size='small'
              >
                <Header icon='browser' content='Cookies policy' />
                <Modal.Content>
                <div className="dropzone">
                  <Dropzone accept=".pdf,.xml,.xlsx,.xlsm,.xltx,.xltm,.csv,.txt,.doc,.docx" onDrop={this.onDrop}>
                    <p>Click here to upload guest lists, or drag and drop <br/> (max 5 lists, max 5mb)</p>
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

