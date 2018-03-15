// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Transition, Modal, Form, Button, Icon } from 'semantic-ui-react';

class MyEditModal extends Component {
  state = {
    author: '',
    title: '',
    category: '',
    body: '',
    isProcessing: false
  };

  handleChange(event, attribute) {
    this.setState({
      [attribute]:
        attribute === 'category'
          ? event.target.innerText.toLowerCase()
          : event.target.value
    });
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

  onSubmit() {
    this.setState({ isProcessing: true }, () => {
      const { item, isEdit } = this.props;
      const action = isEdit ? 'update' : 'create';
      const { author, title, category, body } = this.state;
      setTimeout(() => {
        this.props.onAction(action, { ...item, author, title, category, body });
        this.setState({ isProcessing: false });
      }, 200);
    });
  }

  render() {
    const self = this;

    const { categoryItems, item } = self.props;
    const { author, body, category, title } = self.state;

    const modalType = self.props.isEdit ? 'Edit' : 'Create';
    const buttonTitle = self.props.isEdit ? 'Update' : 'Create';

    const hiddenClass = self.props.isEdit ? ' is-hidden' : '';

    const isEnabled =
      author &&
      author.length > 0 &&
      (body && body.length > 0) &&
      (category && category.length > 0) &&
      (title && title.length > 0);

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
            <Form loading={self.state.isProcessing}>
              <Form.Group widths="equal" className={hiddenClass}>
                <Form.Input
                  fluid
                  label="Name"
                  placeholder="Name"
                  defaultValue={item.author}
                  onChange={event => self.handleChange(event, 'author')}
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
                  defaultValue={item.category}
                  onChange={event => self.handleChange(event, 'category')}
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Title"
                placeholder="Title"
                defaultValue={item.title}
                onChange={event => self.handleChange(event, 'title')}
              />
              <Form.TextArea
                label="Content"
                placeholder="Tell us more about it..."
                defaultValue={item.body}
                onChange={event => self.handleChange(event, 'body')}
                rows="5"
              />
              <Form.Group>
                <Button basic color="grey" onClick={() => self.props.onClose()}>
                  Cancel
                </Button>
                <Form.Button
                  color="green"
                  onClick={self.onSubmit.bind(self)}
                  disabled={!isEnabled}
                >
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
