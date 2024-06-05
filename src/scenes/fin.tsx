import { Circle, Code, makeScene2D, Ray, Rect, Spline, Txt, View2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, createSignal, DEFAULT, Direction, easeInCubic, easeInOutElastic, easeInOutQuad, easeInOutSine, easeInSine, easeOutCubic, easeOutQuad, easeOutSine, linear, loop, SimpleSignal, slideTransition } from '@motion-canvas/core';
import { codeBg, pink, purple, red, white, yellow } from '../constants';

const STR_TEXT = "10101";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const link = createRef<Txt>();
  const bg = createRef<Rect>();
  view.add(<Rect ref={bg} width="100%" height="100%" fill={purple} />)
  view.add(
    <Rect layout direction="column" alignItems="center">
      <Txt ref={title} text="Q and A" padding={40} fontFamily="Quicksand" fontWeight={700} fontSize={100} fill={white}/>
      <Txt ref={subtitle} text="w/ hw" padding={40} fontFamily="Quicksand" fontSize={0} y={100} fill={white}/>
      <Txt ref={link} text="https://www.jeffwofford.com/regex/" padding={40} fontFamily="Quicksand" fontSize={0} y={100} fill={white}/>
    </Rect>
  );

  yield* slideTransition(Direction.Bottom);
  yield* beginSlide('1')
  yield* subtitle().fontSize(80, 1);
  yield* beginSlide('2')
  yield* link().fontSize(80, 1);
  yield* beginSlide('3')
});
