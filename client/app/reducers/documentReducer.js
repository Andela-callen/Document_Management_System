import {UPLOAD_DOCS_SUCCESS} from '../actions/documentAction';
import {CREATE_DOC_SUCCESSFUL} from '../actions/documentAction';
import { UPLOAD_DOCS_REJECTED } from '../actions/documentAction';
import {GET_DOCS} from '../actions/documentAction'

const initialState = {
  document: [],
  documents: {},
  uploadDocsSuccess: false,
  docCreatedSuccess: false

}

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { document: action.document, uploadDocsSuccess:true });
    // case types.UPLOAD_DOCS_REJECTED:
    //   return Object.assign({}, state, { document: action.documents, uploadDocsSuccess:true });
    case CREATE_DOC_SUCCESSFUL:
      return Object.assign({}, state, { document: action.document, docCreatedSuccess: true });
    // case GET_DOCUMENT:
    //   return Object.assign({}, state, { currentDoc: state.allDocuments[action.id] });
    default:
      return state;
  }
}



