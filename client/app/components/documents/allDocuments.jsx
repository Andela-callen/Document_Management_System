import React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import DocumentDetail from './documentDetail';
import CreateDocument from './createDocument';
import toastr from 'toastr';
import {deleteDocument} from '../../actions/documentAction';


class AllDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdoc: '0'
    }
    this.editDocument = this.editDocument.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  }

  editDocument(e, documentIndex){
    this.setState({ currentdoc : documentIndex });
  }

  deleteDoc(event){
  // let docId = this.setState({ currentdoc : documentIndex });
  // let docId = this.props.documents[this.props.currentdoc].id
  // this.props.deleteDocument(this.props.documents[0].id)
  // event.preventDefault();
    this.props.deleteDocument(this.props.documents[0].id).then(() => {
  console.log("I am Here");
        toastr.success('Document successfully deleted');
      }).catch(() => {
        toastr.error('Unable to delete');
      });
}


  render() {
    const { documents } = this.props;
    const mappedDocs = documents.map((document, index) =>

      <div key={document.id}>
      <div className="main col s2 m2 l2">
        <a onClick={(e)=>{this.deleteDoc(this, index)}} className="waves-effect waves-light btn"><i className="material-icons">delete</i> Delete</a>
        <a onClick={(e)=>{this.editDocument(this, index)}} href="#modal1"  className="waves-effect waves-light btn"><i className="material-icons"></i> Edit</a>
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="https://placekitten.com/400/200" />
            </div>
            <div className="">
              <a href="#modal2"className="btn-floating btn-large waves-effect waves-light red ">
                <i  className="material-icons">add</i>
              </a>
              <span className="card-title  grey-text text-darken-4">{document.title} </span>
              <p><a href="#" className="activator">Read more....</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title blue-color">Card Title
              <i className="material-icons">clear</i>
              </span>
              <p>{document.content}</p>
            </div>
          </div>
        </div>

      {/*<li className="card-panel" key={document.id}>
        <Link to={`/documents/${document.id}`}>
          {document.title}
        </Link>
      </li>*/}
      </div>
    );

    return (
      <div>
        <DocumentDetail currentdoc={this.state.currentdoc} />
        <ul>
          {mappedDocs || <p>Hello</p>}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    docDeletedSuccess: state.documentReducer.docDeletedSuccess
  }
}

const  mapDispatchToProps = {
    deleteDocument
  }
export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments)