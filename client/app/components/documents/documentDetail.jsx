import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FroalaEditor from 'react-froala-wysiwyg';
import jwt from 'jsonwebtoken';
import { getAllDocuments } from '../../actions/documentAction';
import { updateDocument } from '../../actions/documentAction';
import toastr from 'toastr';
import AllDocuments from './allDocuments';



class DocumentDetail extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
      model: '',
      title: Object.assign({}, props.documents[props.currentdoc]).title,
      access: Object.assign({}, props.documents[props.currentdoc]).access,
      content: Object.assign({}, props.documents[props.currentdoc]).content,
      userId: jwt.decode(localStorage.getItem('token')).userId,
      docId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleModelChange(model){
    this.setState({ content: model });
  }

  handleChange(event) {
    this.setState({ access: event.target.value });
  }

  onChange(event) {
    this.setState({ title: event.target.value });
  }

  componentDidMount() {
    $('#selectMe-edit').on('change', this.handleChange); 
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.currentdoc !== nextProps.currentdoc) {this.setState({
        title: Object.assign({}, nextProps.documents[nextProps.currentdoc]).title,
        access: Object.assign({}, nextProps.documents[nextProps.currentdoc]).access,
        content: Object.assign({}, nextProps.documents[nextProps.currentdoc]).content,
      })
    }
  }

onClick(event) {
    event.preventDefault();
    let docId = this.props.documents[this.props.currentdoc].id
    this.props
      .updateDocument(this.state.title, this.state.content, this.state.access, docId)
      .then(() => {
        toastr.success('Document successfully updated');
      }).catch(() => {
        toastr.error('You are not authorized to edit this file');
      });
  }
  
  render() {
    return (
      <div>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="">
              <h4 className="center">Edit Document</h4>
              <form className="">
                <div className="input-field col s12">
                  <input
                    id="text-edit"
                    type="text"
                    value={this.state.title}
                    name="title"
                    className="validate"
                    onChange={this.onChange} />
                </div>
              </form>
              <div className=" col s12">
                <ul className="card">
                  {/*<FroalaEditor
                    tag='textarea'
                    config={this.config}
                    model={this.state.content}
                    onModelChange={this.handleModelChange}
                  />*/}
                </ul>

                <select onChange={this.handleChange} className="browser-default" name="access" value={this.state.access}>
                  <option value="">Choose your option</option>
                  <option value="private">Private</option>
                  <option value="public">Pubilc</option>
                  <option value="role">role</option>
                </select>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <a className="modal-action waves-effect waves-green btn-flat "
              id="edit-doc"
              onClick={this.onClick}>Update</a>
          </div>
        </div>
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