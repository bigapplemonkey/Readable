// React packages
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Transition, Modal, Header, Button, Icon } from 'semantic-ui-react';

const MyConfirmationModal = props => {
  const { type, isVisible, onAction } = props;
  const modalHeader = props.type
    ? `Delete ${props.type[0].toUpperCase() + props.type.substr(1)}`
    : '';

  return (
    <Transition
      visible={isVisible}
      animation="fade down"
      unmountOnHide={true}
      duration={{ hide: 350, show: 250 }}
    >
      <Modal open={true} basic size="small" style={{ marginTop: '30vh' }}>
        <Header icon="trash" content={modalHeader} />
        <Modal.Content>
          <p>Are you sure you want to delete this {type}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => onAction(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted onClick={() => onAction(true)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </Transition>
  );
};

MyConfirmationModal.propTypes = {
  type: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired
};

export default MyConfirmationModal;
