// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Transition, Modal, Form, Button, Icon } from 'semantic-ui-react';

class MyEditModal extends Component {
  state = {
    author: '',
    title: '',
    category: ''
  };

  handleChange(event, attribute) {
    this.setState({ [attribute]: event.target.value });
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    this.setState({
      author: item ? item.author : '',
      title: item ? item.title : '',
      category: item ? item.category : '',
      body: item ? item.body : ''
    });
  }

  render() {
    const self = this;

    const { categoryItems } = self.props;

    const modalType = self.props.isEdit ? 'Edit' : 'Create';
    const buttonTitle = self.props.isEdit ? 'Update' : 'Create';

    return (
      <Transition
        visible={self.props.visible}
        animation="fade down"
        unmountOnHide={true}
        duration={350}
      >
        <Modal
          className="view"
          dimmer="inverted"
          open={true}
          onClose={self.props.onClose}
          closeOnDimmerClick={false}
          closeIcon={true}
        >
          <Modal.Header icon="pin">{modalType} Post</Modal.Header>
          <Modal.Content scrolling={false}>
            <Form
              onSubmit={event => console.log('hereee', event.target.value)}
              loading={false}
            >
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Name"
                  placeholder="Name"
                  value={self.state.author}
                  onChange={event => self.handleChange(event, 'author')}
                  required
                />
                <Form.Select
                  fluid
                  label="Category"
                  options={categoryItems.map(item => {
                    const obj = {
                      key: item.key,
                      text: item.value,
                      value: item.key
                    };
                    return obj;
                  })}
                  placeholder="Category"
                  value={self.state.category}
                  onChange={event => self.handleChange(event, 'category')}
                  required
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Title"
                placeholder="Title"
                required
                value={self.state.title}
                onChange={event => self.handleChange(event, 'title')}
              />
              <Form.TextArea
                label="Content"
                placeholder="Tell us more about it..."
                value={self.state.body}
                onChange={event => self.handleChange(event, 'value')}
                rows="5"
                required
              />
              <Form.Group>
                <Button basic color="grey">
                  Cancel
                </Button>
                <Form.Button basic color="green">
                  <Icon name="pin" />
                  {buttonTitle}
                </Form.Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }
}

MyEditModal.propTypes = {
  // comment: PropTypes.object.isRequired,
  // handleCommentAction: PropTypes.func.isRequired
};

export default MyEditModal;
