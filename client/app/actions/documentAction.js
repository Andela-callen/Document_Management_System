import axios from 'axios';
import jwt from 'jsonwebtoken';

export const CREATE_DOC_SUCCESSFUL = 'CREATE_DOC_SUCCESSFUL';
export const UPLOAD_DOCS_SUCCESS = 'UPLOAD_DOCS_SUCCESS';
export const UPLOAD_DOCS_REJECTED = 'UPLOAD_DOCS_REJEsCTED'
export const UPDATE_DOC_SUCCESS = 'UPDATE_DOC_SUCCESS'
// export const GET_DOCS = 'GET_DOCS';

const createDocSuccess = (document) => {
  return { type: CREATE_DOC_SUCCESSFUL, document }
}
const uploadDocsSuccess = (document) => {
  return {
    type: UPLOAD_DOCS_SUCCESS, payload: document };
}

const uploadDocsRejected = (document) => {
  return {
    type: UPLOAD_DOCS_REJECTED, payload: document };
}

const updateDocumentSuccess = (updated) => {
  return {
    type: UPDATE_DOC_SUCCESS, payload: err};
}

const createDocument = (title, content, access, userId) => {
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


const getAllDocuments = () => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('token')
    }
  };
  return (dispatch) => {
    return axios.get('/api/documents/', config)
    .then((response) => {
      if (response.status === 200 ){
        dispatch(uploadDocsSuccess(response.data));
      }
    }).catch((err) => {
      // console.log(err)
      dispatch(uploadDocsRejected(err.data));
    })
  }
};

const updateDocument = (title, content, access, docId) => {
  const config ={
    headers: {
      Authorization:window.localStorage.getItem('token')
    }
  };
  return (dispatch) =>{
     return axios.put(`/api/documents/${docId}`, 
     {title, content, access}, config)
     .then((response) => {
       if (response.status === 200) {
       dispatch(getAllDocuments());
       }
  }).catch((err) => {
    throw (err);
  });
}

}

export { createDocument, createDocSuccess, getAllDocuments, updateDocument };