import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import AllDocuments from '../documents/allDocuments';
import { getAllDocuments } from '../../actions/documentAction';
import DocumentDetail from '../documents/documentDetail'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.props.getAllDocuments();
  }


  render() {
    return (
    <div className="row">
      <div className="app">
        
          <AllDocuments documents={this.props.documents} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
  }
}

const mapDispatchToProps = {
    getAllDocuments,
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

