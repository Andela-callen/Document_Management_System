import { UPLOAD_DOCS_SUCCESS } from '../actions/documentAction';
import { CREATE_DOC_SUCCESSFUL } from '../actions/documentAction';
import { UPLOAD_DOCS_REJECTED } from '../actions/documentAction';
import { UPDATE_DOC_SUCCESS } from '../actions/documentAction';
import { DELETE_DOCUMENT_SUCCESS } from '../actions/documentAction';
import { DELETE_DOCUMENT_REJECTED } from '../actions/documentAction'; 
import { SEARCH_DOCUMENT_SUCCESS } from '../actions/documentAction';
import { SEARCH_DOCUMENT_REJECTED } from '../actions/documentAction'; 

const initialState = {
  document: {},
  documents: [],
  pagination: {},
  error: {},
  uploadDocsSuccess: false,
  docCreatedSuccess: false,
  updateDocSuccess: false,
  docDeletedSuccess: false,

}

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DOC_SUCCESSFUL:
      return Object.assign({}, state, { document: action.document, docCreatedSuccess: true },);
    case UPLOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { documents: action.payload.msg, pagination: action.payload.pagination });
    case UPLOAD_DOCS_REJECTED:
      return Object.assign({}, state, { error: action.payload},);
    case UPDATE_DOC_SUCCESS:
      return Object.assign({}, state, {error: action.payload },);
    case DELETE_DOCUMENT_SUCCESS:
      return Object.assign(
        {},
        state,
        { 
          documents: state.documents.filter((document) => document.id !== action.payload),
          docDeletedSuccess: true,
        },
      );
    case SEARCH_DOCUMENT_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          documents: action.payload.msg,
        },
      );
    default:
      return state;
  }
}



