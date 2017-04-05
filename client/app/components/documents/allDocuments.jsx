import React from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router';
import DocumentDetail from './documentDetail'
import CreateDocument from './createDocument'


export default class AllDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentdoc: '0'
    }
    this.editDocument = this.editDocument.bind(this);
    this.onClickCreate = this.onClickCreate.bind(this);
  }

  editDocument(e, documentIndex){
    this.setState({ currentdoc : documentIndex });
  }

  onClickCreate(e){
    e.preventDefault();
    $('#modal2').modal('open');
  }

  render() {
    const { documents } = this.props;

    const mappedDocs = documents.map((document, index) =>

      <div>
      <div className="main col s2 m2 l2">
        <a className="waves-effect waves-light btn"><i className="material-icons">delete</i> Delete</a>
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