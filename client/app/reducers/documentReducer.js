import {UPLOAD_DOCS_SUCCESS} from '../actions/documentAction';
import {CREATE_DOC_SUCCESSFUL} from '../actions/documentAction';
import { UPLOAD_DOCS_REJECTED } from '../actions/documentAction';

const initialState = {
  document: {},
  documents: [],
  error: {},
  uploadDocsSuccess: false,
  docCreatedSuccess: false

}

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_DOC_SUCCESSFUL:
      return Object.assign({}, state, { document: action.document, docCreatedSuccess: true },);
    case UPLOAD_DOCS_SUCCESS:
      return Object.assign({}, state, { documents: action.payload.msg },
      );
    case UPLOAD_DOCS_REJECTED:
      return Object.assign({}, state, { error: action.payload},);
    default:
      return state;
  }
}



