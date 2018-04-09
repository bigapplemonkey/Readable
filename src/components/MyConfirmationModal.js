// React packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import { Transition, Modal, Header, Button, Icon } from 'semantic-ui-react';

const MyConfirmationModal = props => {
  const { type, isVisible, onAction, category } = props;
  const modalHeader = type
    ? `Delete ${type[0].toUpperCase() + type.substr(1)}`
    : '';

  return (
    <Transition
      visible={isVisible}
      animation="fade down"
      unmountOnHide={true}
      duration={{ hide: 150, show: 250 }}
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
          {type === 'post' ? (
            <Link
              className="accept-link"
              to={`${process.env.PUBLIC_URL}/${category}`}
            >
              <Button
                className="accept-button"
                color="green"
                inverted
                onClick={() => onAction(true)}
              >
                <Icon name="checkmark" /> Yes{' '}
              </Button>
            </Link>
          ) : (
            <Button
              className="accept-button"
              color="green"
              inverted
              onClick={() => onAction(true)}
            >
              <Icon name="checkmark" /> Yes{' '}
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </Transition>
  );
};

MyConfirmationModal.propTypes = {
  type: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
};

export default MyConfirmationModal;
