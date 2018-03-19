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

  // update state based on inputs
  handleChange(event, attribute) {
    this.setState({
      [attribute]:
        attribute === 'category'
          ? event.target.innerText.toLowerCase()
          : event.target.value
    });
  }

  // if receiving initial form values in props
  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    if (item)
      this.setState({
        author: item ? item.author : '',
        title: item ? item.title : '',
        category: item ? item.category : '',
        body: item ? item.body : ''
      });
  }

  handleSubmit() {
    this.setState({ isProcessing: true }, () => {
      const { item, isEdit } = this.props;
      const { author, title, category, body } = this.state;

      const action = isEdit ? 'update' : 'create';

      setTimeout(() => {
        this.props.onAction(action, { ...item, author, title, category, body });
        this.setState({ isProcessing: false });
      }, 200);
    });
  }

  render() {
    const self = this;

    const { categoryItems, item, isEdit, isVisible, onClose } = self.props;
    const { author, body, category, title } = self.state;

    const modalType = isEdit ? 'Edit' : 'Create';
    const buttonTitle = isEdit ? 'Update' : 'Create';
    const hiddenClass = isEdit ? ' is-hidden' : '';

    // enabled button only when all values present
    const isEnabled =
      author &&
      author.length > 0 &&
      (body && body.length > 0) &&
      (category && category.length > 0) &&
      (title && title.length > 0);

    return (
      <Transition
        visible={isVisible}
        animation="fade down"
        unmountOnHide={true}
        duration={350}
      >
        <Modal
          className="view"
          dimmer="inverted"
          open={true}
          onClose={onClose}
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
                <Button basic color="grey" onClick={onClose}>
                  Cancel
                </Button>
                <Form.Button
                  color="green"
                  onClick={self.handleSubmit.bind(self)}
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
  categoryItems: PropTypes.array.isRequired,
  item: PropTypes.object,
  isEdit: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
};

export default MyEditModal;
