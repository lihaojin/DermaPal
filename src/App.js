import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'react-image-resizer';
import UploadButton from './UploadButton';
import Button from '@material-ui/core/Button';
import './App.css';

const Clarifai = require('clarifai');
let app = new Clarifai.App({apiKey: 'd77a062d5fc44d5c9b99843df2572d4d'});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: null,
      imagePreview: null,
      result: null,
    };
  }


  fileSelectedHandler = event => {
    this.setState({
      image: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0])
    })
   }

   handleButtonClick = () => {
     const result = JSON.stringify(this.state.imagePreview);
     console.log(result);
    app.models.predict({id:'Acne', version:'4db4746377a34c69a1fafd5abf0dfe4d'}, result).then(
      function(response) {
        //this.setState({result: response})
        console.log(response)
      },
      function(err) {
        // there was an error
      }
    );
  };

  render() {
    return (
      <div>
      <AppBar position="static">
      <div className="AppBar">
      <Toolbar>
      DermaPal
      </Toolbar>
      </div>
      </AppBar>

      <div className="imagePreview">
      <Image
       src={this.state.imagePreview}
       width={370}
       height={370}/>
       </div>

      <div className="UploadButton">
      <input
      accept="image/*"
      id="raised-button-file"
      multiple
      type="file"
      style={{display: 'none'}}
      onChange = {this.fileSelectedHandler}
      />
      <UploadButton />
      </div>

      <div className="AnalyzeButton">
      <Button
      variant= "contained"
      style = {{maxWidth: '120px', maxHeight: '100px', minWidth: '120px', minHeight: '30px'}}
      color= "secondary"
      onClick={this.handleButtonClick}>
      Analyze
      </Button>
      </div>

      </div>
    );
  }
}

App.propTypes = {
  fileSelectedHandler: PropTypes.func
}
export default App;
