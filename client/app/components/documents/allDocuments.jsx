import React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import DocumentDetail from './documentDetail';
import CreateDocument from './createDocument';
import toastr from 'toastr';
import {deleteDocument} from '../../actions/documentAction';
import logo from '../../img/logo1.png';


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
    this.props.deleteDocument(this.props.documents[0].id).then((data) => {
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
        <a onClick={(e)=>{this.deleteDoc(this, index)}} className="waves-effect light-blue darken-3 btn"><i className="material-icons">delete</i> Delete</a>
        <a onClick={(e)=>{this.editDocument(this, index)}} href="#modal1"  className="waves-effect light-blue darken-3 btn"><i className="material-icons"></i> Edit</a>
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={logo} />
            </div>
            <div className="">
              <span className="card-title  grey-text text-darken-4">{document.title} </span>
              <p><a href="#" className="activator">Read more....</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title blue-color">{document.title}
              <i className="material-icons">clear</i>
              </span>
              <p>{document.content}</p>
            </div>
          </div>
        </div>
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