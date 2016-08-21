import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeNodeStates } from '../../actions';
import EditStatesList from '../EditStatesList';
import Modal from '../Modal';
import Button from '../Button';
import styles from './styles.css';

class EditStates extends Component {
  state = {
    states: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.node == null && nextProps.node != null) {
      this.setState({ states: [...nextProps.node.states] });
      setTimeout(() => this.statesList.focusAddInput(), 0);
    }
  }

  handleAddState = newState => {
    this.setState({
      states: [...this.state.states, newState],
    });
  };

  handleDeleteState = state => {
    this.setState({
      states: this.state.states.filter(x => x !== state),
    });
  };

  handleSaveClick = () => {
    if (this.state.states.length === 0) {
      alert('Você deve informar pelo menos um estado');
      return;
    }

    this.props.dispatch(changeNodeStates(this.props.node.id, this.state.states));
    this.props.onRequestClose();
  };

  render() {
    const { node, onRequestClose } = this.props;
    let children = null;

    if (node != null) {
      children = (
        <div className={styles.container}>
          <EditStatesList
            states={this.state.states}
            onAddState={this.handleAddState}
            onDeleteState={this.handleDeleteState}
            ref={ref => (this.statesList = ref)}
          />

          <div className={styles.buttons}>
            <Button primary onClick={this.handleSaveClick}>Salvar</Button>
            <Button onClick={onRequestClose}>Cancelar</Button>
          </div>
        </div>
      );
    }

    return (
      <Modal
        title="Editar Estados"
        isOpen={node != null}
        onRequestClose={onRequestClose}
      >
        {children}
      </Modal>
    );
  }
}

EditStates.propTypes = {
  dispatch: PropTypes.func.isRequired,
  node: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
};

export default connect()(EditStates);
