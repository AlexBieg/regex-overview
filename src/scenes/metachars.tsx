import { Circle, Code, makeScene2D, Path, Ray, Rect, Spline, Txt, View2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, createSignal, DEFAULT, Direction, easeInCubic, easeInOutElastic, easeInOutQuad, easeInOutSine, easeInSine, easeOutCubic, easeOutQuad, easeOutSine, linear, loop, SimpleSignal, slideTransition } from '@motion-canvas/core';
import { codeBg, pink, purple, red, white, yellow } from '../constants';

const deadpool = ""

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const bg = createRef<Rect>();
  const face = createRef<Path>();
  const mask = createRef<Path>();
  const eyes = createRef<Path>();
  const dpProgress = createSignal(0);

  view.add(<Rect ref={bg} width="100%" height="100%" fill={pink} />)
  view.add(<Txt ref={title} text="Meta Characters" padding={40} fontFamily="Quicksand" fontWeight={700} fontSize={100} />);
  view.add(
    <Rect y={-370} x={-370}>
      <Path ref={face} end={0} lineWidth={4} stroke={codeBg} data="M435,157.8v434.5c96.5-26.1,167.7-113.6,167.7-217.2S531.5,183.9,435,157.8z M456.9,427.8l121-71.3C572.2,409.6,509,513.8,456.9,427.8z M375,45C193,45,45,193,45,375c0,182,148,330,330,330s330-148,330-330C705,193,557,45,375,45zM375,671.7C209.7,671.7,75.8,538.9,75.8,375S209.7,78.3,375,78.3c165.3,0,299.2,132.8,299.2,296.7S540.3,671.7,375,671.7zM147.3,375c0,103.6,71.2,191.1,167.7,217.2V157.8C218.5,183.9,147.3,271.4,147.3,375z M169.2,352.1l118.5,75.4C232.6,511.7,173,405.4,169.2,352.1z" />
      <Path ref={mask} end={0} lineWidth={4} stroke={codeBg} data="M375,78.3C209.7,78.3,75.8,211.1,75.8,375s134,296.7,299.2,296.7c165.3,0,299.2-132.8,299.2-296.7S540.3,78.3,375,78.3z M315,592.2C218.5,566.1,147.3,478.6,147.3,375S218.5,183.9,315,157.8V592.2z M435,592.2V157.8c96.5,26.1,167.7,113.6,167.7,217.2S531.5,566.1,435,592.2z" />
      <Path ref={eyes} end={0} lineWidth={4} stroke={codeBg} data="M169.2,352.1l118.5,75.4C232.6,511.7,173,405.4,169.2,352.1z M456.9,427.8c52.1,86.1,115.3-18.2,121-71.3L456.9,427.8z" />
    </Rect>
  )

  yield* slideTransition(Direction.Bottom);
  yield* beginSlide('1')
  yield* face().end(1, 1.5);
  mask().end(1);
  eyes().end(1);
  yield* all(
    face().fill(codeBg, .2),
    eyes().fill(white, .2),
    mask().fill("#ED1C24", .2)
  );
  yield* beginSlide('2')
  yield* all(
    face().fill(DEFAULT, .2),
    eyes().fill(DEFAULT, .2),
    mask().fill(DEFAULT, .2)
  );
  mask().end(0);
  eyes().end(0);
  yield* face().end(0, 1.5);
  yield* beginSlide('3')
  yield* all(
    title().fontSize(40, 1),
    title().topLeft(bg().topLeft, 1),
    title().opacity(0.5, 1),
  )
  const metaChars = [
    '// Metachars',
    '\\s: "Matches all whitespace characters."',
    '\\S: "Matches all non-whitespace characters."',
    '\\d: "Matches all numeric digit characters."',
    '\\D: "Matches all non-numberic non-digit characters"',
    '\\w: "Matches all word characters (i.e. [a-zA-Z0-9_])."',
    '\\W: "Matches all non-word characters.',
    '// Anchors (Similar, but do NOT consume characters)',
    ' ^: "Matches the start of the string"',
    ' $: "Matches the end of the string"',
    '\\b: "Matches a word boundary."',
  ];
  const metaList = createRef<Rect>();
  const internalRef = createRef<Code>();
  view.add(
    <Rect ref={metaList} fill={codeBg} gap={0} layout direction="column" radius={30} padding={20}>
      <Code ref={internalRef} code={""} padding={0} margin={0}/>
    </Rect>
  );

  yield* internalRef().code.append(metaChars[0], 0.5)
  yield* beginSlide(`4`)

  for (let i = 1; i < metaChars.length; i++) {
    const chars = metaChars[i];
    yield* internalRef().code.append("\n" + chars, 0.5)
    yield* beginSlide(`4: ${chars}`)
  }
});
