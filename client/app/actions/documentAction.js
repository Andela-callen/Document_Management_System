import axios from 'axios';
import jwt from 'jsonwebtoken';

export const CREATE_DOC_SUCCESSFUL = 'CREATE_DOC_SUCCESSFUL';
export const UPLOAD_DOCS_SUCCESS = 'UPLOAD_DOCS_SUCCESS';
export const UPLOAD_DOCS_REJECTED = 'UPLOAD_DOCS_REJECTED'
export const UPDATE_DOC_SUCCESS = 'UPDATE_DOC_SUCCESS';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_REJECTED = 'DELETE_DOCUMENT_REJECTED';
export const SEARCH_DOCUMENT_SUCCESS = 'SEARCH_DOCUMENT_SUCCESS';
export const SEARCH_DOCUMENT_REJECTED = 'SEARCH_DOCUMENT_REJECTED';

// export const GET_DOCS = 'GET_DOCS';

export const createDocSuccess = (document) => {
  return { type: CREATE_DOC_SUCCESSFUL, document }
}
export const uploadDocsSuccess = (document) => {
  return {
    type: UPLOAD_DOCS_SUCCESS, payload: document };
}

export const uploadDocsRejected = (document) => {
  return {
    type: UPLOAD_DOCS_REJECTED, payload: document };
}

export const updateDocumentSuccess = (updated) => {
  return {
    type: UPDATE_DOC_SUCCESS, payload: updated};
}

export const docDeletedSuccess = (docId) => {
  return { type: DELETE_DOCUMENT_SUCCESS, payload: docId };
}
export const docDeletedRejected = (err) => {
  return { type: DELETE_DOCUMENT_REJECTED, payload: err };
}

export const searchDocumentSuccess = (result) => {
  return { type: SEARCH_DOCUMENT_SUCCESS, payload: result };
}

export const searchDocumentRejected = (error) => {
  return { type: SEARCH_DOCUMENT_SUCCESS, payload: error };
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

const searchDocuments = (query) => {
  const config = {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    }
  };
  return (dispatch) => {
    return axios.get(`/api/search/documents/?text=${query}`, config)
    .then((response) => {
      if (response.status === 200) {
        dispatch(searchDocumentSuccess(response.data));
      }
    })
    .catch((err) => {
      dispatch(searchDocumentRejected(err.data));
    })
  }
}

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

};

 const deleteDocument = (docId) => {
     const config = {
      headers: {
          Authorization: window.localStorage.getItem('token'),
        }
     };
     return (dispatch) => {
      return axios.delete(`/api/documents/${docId}`, config)
      .then((response) => {
        if (response.status === 201) {
          dispatch(docDeletedSuccess(docId));
        }
      })
      .catch((err) => {
        dispatch(docDeletedRejected(err.data));
      });
    };
 }

export {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  searchDocuments, 
};