import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'react-image-resizer';
import UploadButton from './UploadButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import {GetTreatment} from './Request';
import ResultTabs from './ResultTabs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
      AcneType: "Acne Type",
      AcneDescription: null,
      AcneCauses: null,
      AcneTreatments: null,
      TreatmentName: null,
      TreatmentDescription: null,
    };
  }

  fileSelectedHandler = event => {
    var reader = new FileReader();
    reader.onload = () => {
      var dataURL = reader.result.replace(/^data:image\/(.*);base64,/, '');
      this.setState({
        image: dataURL,
        imagePreview: reader.result
      })
    };

    reader.readAsDataURL(event.target.files[0]);
   }

   handleButtonClick = () => {
    app.models.predict({id:'Acne', version:'4db4746377a34c69a1fafd5abf0dfe4d'}, this.state.image).then(
      response => {
        const answer = response.outputs[0].data.concepts[0].id
        this.setState({result: answer})

        GetTreatment(answer)
        .then(response => {
          this.setState({AcneType: response.data.AcneType});
          this.setState({AcneDescription: response.data.Description});
          this.setState({AcneCauses: response.data.Causes});
          this.setState({AcneTreatments: response.data.Treatments[1].TreatmentType});
          this.setState({TreatmentName: response.data.Treatments[1].Name});
          this.setState({TreatmentDescription: response.data.Treatments[1].Description});
        })
        .catch(error => {
          alert("Error" + error);
        })
      },
      function(err) {
        // there was an error
      },
    );
  };

  render() {
    return (
      <div className="backg" >
      <AppBar position="static">
      <div className="AppBar">
      <Toolbar>
      DermaPal
      </Toolbar>
      </div>
      </AppBar>

      <div className="main-container">
        <div className="container">
        <div className="imagePreview">
      <Image
       src={this.state.imagePreview}
       width={370}
       height={370} />

          </div>
          </div>
          <div className="container">

       <div className="AcneTypeLabel">
       <div className="Pap">
       <Paper>
       <Typography variant="headline" component="h1">
       {this.state.AcneType}
       </Typography>
       </Paper>
       </div>
      <ResultTabs
      AcneType = {this.state.AcneType}
      AcneDescription = {this.state.AcneDescription}
      AcneCauses = {this.state.AcneCauses}
      AcneTreatments = {this.state.AcneTreatments}
      TreatmentName = {this.state.TreatmentName}
      TreatmentDescription = {this.state.TreatmentDescription}/>
      </div>
      </div>
      </div>

      <div className="UploadButton">
      <input
      accept="image/*"
      id="raised-button-file"
      multiple
      type="file"
      style={{display: 'none'}}
      onChange = {(event) => this.fileSelectedHandler(event)}
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
