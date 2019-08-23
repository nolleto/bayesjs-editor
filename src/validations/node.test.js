import {
  hasConnections,
  hasDescription,
  hasStates,
} from './node';

describe('Node Validations', () => {
  describe('hasConnections', () => {
    describe('Returns "true"', () => {
      it('when has "linkedNode" prop with a object', () => {
        expect(hasConnections({ linkedNode: {} })).toBeTruthy();
      });
    });

    describe('Returns "false"', () => {
      it('when has "linkedNode" prop with an array', () => {
        expect(hasConnections({ linkedNode: [] })).toBeFalsy();
      });

      it('when has "linkedNode" prop with a number', () => {
        expect(hasConnections({ linkedNode: 0 })).toBeFalsy();
      });

      it('when has "linkedNode" prop with null', () => {
        expect(hasConnections({ linkedNode: null })).toBeFalsy();
      });

      it('when has "linkedNode" prop with undefined', () => {
        expect(hasConnections({ linkedNode: undefined })).toBeFalsy();
      });

      it('when has not "linkedNode" prop', () => {
        expect(hasConnections({ })).toBeFalsy();
      });
    });
  });
  describe('hasDescription', () => {
    const description = 'description';
    const showDescription = true;

    describe('Returns "true"', () => {
      it('when "description" prop is a non empty string and "showDescription" prop is "true"', () => {
        expect(hasDescription({ description, showDescription })).toBeTruthy();
      });
    });

    describe('Returns "false"', () => {
      it('when "description" prop is empty and "showDescription" prop is "true"', () => {
        expect(hasDescription({ description: '', showDescription })).toBeFalsy();
      });

      it('when "description" prop is non empty and "showDescription" prop is "false"', () => {
        expect(hasDescription({ description, showDescription: false })).toBeFalsy();
      });

      it('when "description" prop is non empty and has no "showDescription" prop', () => {
        expect(hasDescription({ description })).toBeFalsy();
      });

      it('when has not "description" prop and "showDescription" prop is "true"', () => {
        expect(hasDescription({ showDescription })).toBeFalsy();
      });

      it('when has not "description" prop and no "showDescription" prop', () => {
        expect(hasDescription({ })).toBeFalsy();
      });
    });
  });

  describe('hasStates', () => {
    describe('Returns "true"', () => {
      it('when has "states" prop with an array', () => {
        expect(hasStates({ states: [] })).toBeTruthy();
      });
    });

    describe('Returns "false"', () => {
      it('when has "states" prop with a object', () => {
        expect(hasStates({ states: {} })).toBeFalsy();
      });

      it('when has "states" prop with a number', () => {
        expect(hasStates({ states: 0 })).toBeFalsy();
      });

      it('when has "states" prop with null', () => {
        expect(hasStates({ states: null })).toBeFalsy();
      });

      it('when has "states" prop with undefined', () => {
        expect(hasStates({ states: undefined })).toBeFalsy();
      });

      it('when has not "states" prop', () => {
        expect(hasStates({ })).toBeFalsy();
      });
    });
  });
});