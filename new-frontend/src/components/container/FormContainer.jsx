import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../presentational/Input.jsx';
import Sidebar from '../Site/Sidebar';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo_title: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seo_title } = this.state;
    return(
      <section>
        {this.props.children}
      </section>
      /*<form id='article-form'>
        <Input
          text='Lets change the title'
          label='seo_title'
          type='text'
          id='seo_title'
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>*/
    );
  }
}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
