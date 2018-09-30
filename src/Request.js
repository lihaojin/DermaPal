import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {GetTreatment}
  function GetTreatment(acneType){
    console.log(acneType)
    if(acneType == "Cyst") {
      return axios.get(baseUrl + '/Cyst')
    }

    else if(acneType == "Pustule") {
      return axios.get(baseUrl + '/Pustule')
    }

    else if(acneType == "None") {
      return axios.get(baseUrl + '/None')
    }
  }
