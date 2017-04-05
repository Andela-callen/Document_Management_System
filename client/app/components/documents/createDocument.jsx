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
      title: '',
      content: '',
      access: '',
      userId: jwt.decode(localStorage.getItem('token')).userId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $('#selectMe').on('change', this.handleChange);
    $('.modal').modal();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.uploadDocsSuccess) {
  //     browserHistory.push('/createDocument'); //should be docs or dashboard
  //   }
  // }
  handleChange(event) {
    console.log(event)
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
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
              {/*<Input s={6} type="textarea" className="materialize-textarea" value={this.state.content} name="content" label="Content" validate></Input>*/}
          </div>
          </div>
        </div>
        <div>
          <button className="waves-effect btn" onClick={this.handleSubmit} type="button" value="submit" />
        </div>

      {/*<a class="modal-trigger waves-effect waves-light btn" href="#modal1">Modal</a>*/}

  {/*<div id="modal1" className="modal modal-fixed-footer">
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
    </div>
  </div>*/}
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