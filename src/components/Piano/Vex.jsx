import React, { Component } from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;
const notes = [
  // A quarter-note C.
  new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),
  // A quarter-note D.
  new VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),
  // A quarter-note rest. Note that the key (b/4) specifies the vertical
  // position of the rest.
  new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),
  new VF.StaveNote({ clef: 'treble', keys: ['c/4', 'e/4', 'g/4'], duration: '8d' }),
  new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: '16' }).addAccidental(0, new VF.Accidental('b')),
];


export default class Notes extends Component {
  componentDidMount() {
    this.createPentagram(notes);
  }

  createPentagram = () => {
    const svgContainer = document.createElement('div');
    const renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
    const context = renderer.getContext();
    // width, height
    renderer.resize(500, 500);
    // context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    svgContainer.style.position = 'relative';
    svgContainer.style.display = 'inlineBlock';

    // pentagrama x, y, width
    const stave = new VF.Stave(10, 40, 480);

    // añade la clave de sol y el tempo 4/4.
    stave.addClef('treble').addTimeSignature('4/4');

    // conecta al contexto de renderizado y pinta
    stave.setContext(context).draw();

    VF.Formatter.FormatAndDraw(context, stave, notes);

    this.refs.pentagram.appendChild(svgContainer);
  }

  render() {
    return <div ref='pentagram' />;
  }
}
