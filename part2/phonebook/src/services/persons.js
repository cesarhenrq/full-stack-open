import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const personService = {
  getAll,
  create,
  deletePerson,
  update,
};

export default personService;
