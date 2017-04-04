import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { getAllDocuments } from '../../actions/documentAction';
import { updateDocument } from '../../actions/documentAction';
import toastr from 'toastr';

// Require Editor JS files.
require("froala-editor/js/froala_editor.pkgd.min.js");

// // Require Editor CSS files.
require("froala-editor/css/froala_style.min.css");
require("froala-editor/css/froala_editor.pkgd.min.css");

// // Require Font Awesome.
// require('font-awesome/css/font-awesome.css');

var FroalaEditor = require('react-froala-wysiwyg');


class DocumentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      title: Object.assign({}, props.documents).title,
      access: Object.assign({}, props.documents).access,
      content: Object.assign({}, props.documents).content,
      userId: jwt.decode(localStorage.getItem('token')).userId,
      docId: this.props.routeParams.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

handleModelChange(model){
  this.setState({ model });
}

handleChange(event) {
    this.setState({ access: event.target.value });
  }

onChange(event) {
    this.setState({ title: event.target.value });
  }

componentDidMount() {
  // $('select').material_select();
  $('#selectMe-edit').on('change', this.handleChange);
}

componentWillReceiveProps(nextProps) {
  if(this.props.documents.id !== nextProps.documents.id) {
    this.setState({
      title: Object.assign({}, nextProps.documents).title,
      access: Object.assign({}, nextProps.documents).access,
      content: Object.assign({}, nextProps.documents).content,
      docId: nextProps.routeParams
    })
  }
}

onClick(event) {
    event.preventDefault();
    this.props
      .updateDocument(this.state)
      .then(() => {
        toastr.success('Document successfully updated');
      }).catch(() => {
        console.log("i am here on click",this.state)
        toastr.error('An error occured updating the document');
      });
  }
  
  render() {
    const { documents } = this.props;
    const { id } = this.props.routeParams;
    const targetDocument = documents.filter(document => document.id === Number(id))

    return (
      <div className="card col s12 m6">
        <ul className="card">
          {/*<div>{targetDocument[0].id}</div>*/}
          {/*<div>{targetDocument[0].title}</div>*/}
          <FroalaEditor
  tag='textarea'
  config={this.config}
  model={this.state.model}
  onModelChange={this.handleModelChange}
/>
<div className="modal-footer">
              <a
                className="waves-effect waves-light btn modal-action modal-close"
                id="edit-doc"
                onClick={this.onClick}>UPDATE</a>
            </div>
          {/*<div>{targetDocument[0].content}</div>*/}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents
  }
}

const mapDispatchToProps = {
    getAllDocuments,
    updateDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);