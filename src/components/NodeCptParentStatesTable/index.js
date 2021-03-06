import React from 'react';
import { toString } from 'ramda';
import { nodePropTypes } from 'models';
import NodeCptStatesThead from 'components/NodeCptStatesThead';

const NodeCptParentStatesTable = ({ node: { parents, cpt } }) => (
  <table>
    <NodeCptStatesThead states={parents} />
    <tbody>
      {cpt.map(({ when }) => (
        <tr key={toString(when)}>
          {parents.map(parent => (
            <td key={parent}>{when[parent]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

NodeCptParentStatesTable.propTypes = {
  node: nodePropTypes.isRequired,
};

export default NodeCptParentStatesTable;
