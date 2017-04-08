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

    this.onPageClick = this.onPageClick.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    // $(".dropdown-button").dropdown();
    // $('.modal').modal();
  }

  onPageClick(offset) {
    this.props.getAllDocuments(offset);
  }

  renderPagination() {
    const pages = [];
    for (let i = 1; i <= this.props.pagination.page_count; i++) {
      pages.push(i);
    }

    return pages.map((page) => {
      return (
        <li key={page} className="active" onClick={() => this.onPageClick((page-1)*5)}><a href="#!">{page}</a></li>
      );
    });
  }

  render() {
    return (
    <div className="row">
      <div className="app">
        <div className="row">
          <AllDocuments documents={this.props.documents} />
        </div>

        <div className="row">
          <ul className="pagination">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {this.renderPagination()}
            {/*{console.log(this.props)}*/}
            
            
            
            
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div>

      </div>
        
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
    pagination: state.documentReducer.pagination,
    user: state.userReducer
  }
}

const mapDispatchToProps = {
    getAllDocuments
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



