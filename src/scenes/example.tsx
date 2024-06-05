import { Code, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, beginSlide, createRef, createSignal } from '@motion-canvas/core';
import { codeBg, red, yellow } from '../constants';

export default makeScene2D(function* (view) {
  // Start
  const title = createRef<Txt>();
  const code = createRef<Code>();
  const string = createRef<Code>();
  const bg = createRef<Rect>();
  const codePadding = createSignal(0);

  view.add(<Rect ref={bg} width="100%" height="100%" fill={yellow} />)
  view.add(<Txt ref={title} text="Regular Expressions" fontFamily="Quicksand" fontWeight={700} fontSize={100} padding={40} />);
  view.add(
    <Rect layout direction="column" alignItems="center" fill={codeBg} padding={codePadding} radius={30}>
      <Code ref={code} fontSize={60} fill="#ffffff" />
      <Code ref={string} fontSize={0} />
    </Rect>
  )

  yield* beginSlide('1');
  yield* title().text("RegEx", 1);

  yield* beginSlide('2');
  yield* title().text("What is RegEx?", 1);

  yield* beginSlide('3');
  yield* all(
    title().fontSize(40, .5),
    title().topLeft(bg().topLeft, .5),
    title().opacity(0.5, .5),
  )

  codePadding(20);
  yield* code().code('/cat/', 1),


  yield* beginSlide('4');

  yield* all(
    code().y(-100, 1),
    string().code("\"A cute cat.\"", 1),
    string().fontSize(60, .5),
  )
  yield* beginSlide('5');
  yield* string().selection(string().findAllRanges(/cat/g), 1)

  yield* beginSlide('6');
  yield* string().code.insert([0, 11], " and I love cats", 1)

  yield* beginSlide('7');
  yield* code().code.append("g", 0.6);
  yield* string().selection(string().findAllRanges(/cat/g), 1)

  yield* beginSlide('8');
  yield* string().code.insert([0, 27], ". Cats are my fav", 1)
  yield* code().code.append("i", 0.6);
  yield* string().selection(string().findAllRanges(/cat/gi), 1)
  yield* beginSlide('9');
});
