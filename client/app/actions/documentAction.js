import axios from 'axios';
import jwt from 'jsonwebtoken';

export const CREATE_DOC_SUCCESSFUL = 'CREATE_DOC_SUCCESSFUL';
export const UPLOAD_DOCS_SUCCESS = 'UPLOAD_DOCS_SUCCESS';
export const UPLOAD_DOCS_REJECTED = 'UPLOAD_DOCS_REJECTED'
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
    type: UPLOAD_DOCS_REJECTED, payload: err };
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
      dispatch(uploadDocsRejected(err.data));
    })
  }
};

const updateDocument = (updateDocument) => {
  const config ={
    headers: {
      Authorization:window.localStorage.getItem('token')
    }
  };
  return (dispatch) =>{
     console.log(updateDocument.docId)
     return axios.put(`/api/documents/${updateDocument.docId}`, 
     [updateDocument.title, updateDocument.content, updateDocument.access], config)
     console.log("you are tring to update")
     .then((response) => {
       if (response.status === 200) {
       dispatch(getAllDocuments());
       console.log('I am getting all documents', response.status)
       }
  }).catch((err) => {
    console.log('You hit error')
    throw (err);
  });
  console.log("Nothing")
}

}

export { createDocument, createDocSuccess, getAllDocuments, updateDocument };