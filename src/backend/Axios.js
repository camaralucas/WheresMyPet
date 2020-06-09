import axios from 'axios';

export default function Axios() {
  function SearchCep(value) {
    let regexCep = /^[0-9]{8}$/;

    if (regexCep.test(value)) {
      return axios.get(`https://viacep.com.br/ws/${value}/json/`);
    } else {
      alert('Formato de CEP inválido.');
    }
  }

  function GetGeocoding(value) {
    return axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyDA4rN6KOHSujkwlp7CWkPdlHCgrxLCCnA`,
    );
  }

  return {SearchCep, GetGeocoding};
}
