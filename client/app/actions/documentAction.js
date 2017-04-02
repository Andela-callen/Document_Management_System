import axios from 'axios';
import jwt from 'jsonwebtoken';

export const CREATE_DOC_SUCCESSFUL = 'CREATE_DOC_SUCCESSFUL';
export const UPLOAD_DOCS_SUCCESS = 'UPLOAD_DOCS_SUCCESS';
export const UPLOAD_DOCS_REJECTED = 'UPLOAD_DOCS_REJECTED'
// export const GET_DOCS = 'GET_DOCS';

export const createDocSuccess = (document) => {
  return { type: CREATE_DOC_SUCCESSFUL, document }
}
const uploadDocsSuccess = (document) => {
  return {
    type: UPLOAD_DOCS_SUCCESS,
    docs };
}
// const uploadDocsSuccess = (document) => {
//   return {
//     type: types.UPLOAD_DOCS_SUCCESS,
//     docs
//   };
// }

// export function getDocument(id) {
//   return {
//     type: types.GET_DOCUMENT,
//     id
//   };
// }
// const uploadDocument = (document) => {
//   return dispatch => axios.get('/api/documents', {
//     headers: {
//       'Authority': window.localStorage.getItem('token')
//     }
//   }).then((res) => {
//     dispatch(uploadDocsSuccess(res.data));
//   });
// };


export const createDocument = (title, content, access, userId) => {
  return(dispatch) => {
    return axios.post('/api/documents/', {
    title,
    content,
    access,
    userId
  },
  {
    headers: {
      Authorization: window.localStorage.getItem('token')
    }
  }).then((response) => {
    if(response.status === 201) {
      dispatch(createDocSuccess(response.data))
    }
  }).catch((err) => {
    throw (err);
  });
  };
};


const getDocuments = (id) => {
  return {
    type: types.GET_DOCUMENT,
    id
  }
};
