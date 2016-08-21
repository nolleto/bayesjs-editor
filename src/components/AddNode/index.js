import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNode } from '../../actions';
import EditStatesList from '../EditStatesList';
import Modal from '../Modal';
import Button from '../Button';
import styles from './styles.css';

const initialState = {
  name: '',
  states: ['T', 'F'],
};

class AddNode extends Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (this.props.position == null && nextProps.position != null) {
      this.setState(initialState);
      setTimeout(() => this.inputName.focus(), 0);
    }
  }

  handleNameBlur = e => {
    this.setState({ name: e.target.value });
  };

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

  handleAdicionarClick = () => {
    const { name, states } = this.state;

    if (name === '') {
      alert('Preencha o nome da variável corretamente');
      this.inputName.focus();
      return;
    }

    if (states.length === 0) {
      alert('Você deve informar pelo menos um estado');
      return;
    }

    this.props.dispatch(addNode(name, states, this.props.position));
    this.props.onRequestClose();
  };

  render() {
    const { position, onRequestClose } = this.props;

    let children = null;

    if (position != null) {
      children = (
        <div className={styles.container}>
          <div className={styles.fieldWrapper}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              defaultValue={this.state.name}
              onBlur={this.handleNameBlur}
              ref={ref => (this.inputName = ref)}
            />
          </div>

          <EditStatesList
            states={this.state.states}
            onAddState={this.handleAddState}
            onDeleteState={this.handleDeleteState}
          />

          <div className={styles.buttons}>
            <Button primary onClick={this.handleAdicionarClick}>
              Adicionar
            </Button>
            <Button onClick={onRequestClose}>
              Cancelar
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Modal
        title="Adicionar Variável"
        isOpen={position != null}
        onRequestClose={onRequestClose}
      >
        {children}
      </Modal>
    );
  }
}

AddNode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  position: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
};

export default connect()(AddNode);
