import {makeProject} from '@motion-canvas/core';
import example from './scenes/example?scene';
import operators from './scenes/operators?scene';
import dfa from './scenes/dfa?scene';
import fin from './scenes/fin?scene';
import metachars from './scenes/metachars?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/javascript';

import './global.css';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [example, operators, metachars, dfa, fin],
});
