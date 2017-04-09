import React from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Input, Button, Row, Col, Icon } from 'react-materialize';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import { createDocument } from '../../actions/documentAction';

class CreateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model:'',
      title: '',
      content: '',
      access: '',
      userId: jwt.decode(localStorage.getItem('token')).userId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  componentDidMount() {
    $('#selectMe').on('change', this.handleChange);
  }

  handleChange(event) {
    console.log(event)
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleModelChange(model){
    this.setState({ content: model });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.title === '' || this.state.access === '') {
      toastr.error('Please enter the required fields');
    } else {
      this.props.createDocument(this.state.title,
       this.state.content, 
       this.state.access, 
       jwt.decode(localStorage.getItem('token')).userId)
       .then(() => {
         toastr.success('Document created');
       }).catch(() => {
         toastr.error('An error occured creating the document');
       });
    }   
  }
  render() {
    return (
      <div>
        <div className="card col s6" >
          <div className="row" onChange={this.handleChange} >
            <div className="input-field col s6">
              <Input s={6} type="text" value={this.state.title} name="title" label="Title" validate></Input>
            </div>
        <div >
        <select onChange={this.handleChange} className="browser-default" name="access" label="XXXXx" value={this.state.access}>
            <option value="">Choose your option</option>
            <option value= "private">Private</option>
            <option value="public">Pubilc</option>
            <option value="role">role</option>
          </select>
          </div>
            <div className="input-field col m12">
              <FroalaEditor
                    tag='textarea'
                    config={this.config}
                    model={this.state.content}
                    onModelChange={this.handleModelChange}
                  />
            </div>
          </div>
        </div>
        <div>
          <input className="waves-effect waves-light btn" onClick={this.handleSubmit} type="button" value="submit" />
        </div>
      </div>

    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    docCreatedSuccess: state.documentReducer.docCreatedSuccess
  }
}

const  mapDispatchToProps = {
    createDocument
  }
export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);