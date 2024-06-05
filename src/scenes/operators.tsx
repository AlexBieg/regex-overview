import { Code, lines, makeScene2D, Rect, Txt, word } from '@motion-canvas/2d';
import { all, beginSlide, createRef, createSignal, DEFAULT, Direction, slideTransition } from '@motion-canvas/core';
import { codeBg, orange, red } from '../constants';

export default makeScene2D(function* (view) {
  // Start
  const title = createRef<Txt>();
  const group = createRef<Rect>();
  const bg = createRef<Rect>();
  const selectedIndexes = createSignal("0");

  view.add(<Rect ref={bg} width="100%" height="100%" fill={orange} />)

  view.add(<Txt ref={title} text="RegEx Operators" padding={40} fontFamily="Quicksand" fontWeight={700} fontSize={100} />);

  yield* slideTransition(Direction.Bottom);
  yield* beginSlide('2');

  view.add(
    <Rect layout y={1000} ref={group} gap={150} direction='column' x={-700}>
      <Rect>
        <Txt text="Or" opacity={() => selectedIndexes().includes("0") ? 1 : .2} grow={1} fontFamily="Quicksand" />
      </Rect>
      <Rect>
        <Txt text="Group" opacity={() => selectedIndexes().includes("1") ? 1 : .2} fontFamily="Quicksand" />
      </Rect>
      <Rect>
        <Txt text="Counts" opacity={() => selectedIndexes().includes("2") ? 1 : .2} fontFamily="Quicksand" />
      </Rect>
      <Rect>
        <Txt text="Wildcards" opacity={() => selectedIndexes().includes("3") ? 1 : .2} fontFamily="Quicksand" />
      </Rect>
    </Rect>
  )
  yield* all(
    title().fontSize(40, 1),
    title().topLeft(bg().topLeft, 1),
    title().opacity(0.5, 1),
    group().y(0, 1),
  )
  yield* beginSlide('3');

  const code = createRef<Code>();
  const string = createRef<Code>();

  view.add(
    <Rect fill={codeBg} layout direction="column" alignItems={'center'} radius={30} padding={20} gap={40}>
      <Code ref={code} code="" />
      <Code ref={string} code="" />
    </Rect>
  );

  yield* all(
    code().code("/cat|dog/", 1),
    string().code("\"The animal is a cat.\"", 1),
  );

  yield* beginSlide('4');

  yield* string().selection(string().findAllRanges(/(cat|dog)/g), 1);

  yield* beginSlide('5');
  yield* string().code.replace(string().findAllRanges(/cat/g)[0], "dog", 1);
  yield* beginSlide('6');



  yield* string().selection(DEFAULT, 0);
  yield* all(
    selectedIndexes("01", 0),
    string().code.replace(lines(0), "\"The cat slept in the cot.\"", 1),
    code().code.replace(lines(0), "/c(a|o)t/g", 1),
  )

  yield* beginSlide('7')
  yield* string().selection(string().findAllRanges(/c(a|o)t/g), 1);
  yield* beginSlide('8')
  yield* code().code.replace(lines(0), "/c[ao]t/g", 1),
  yield* beginSlide('8.1')
  yield* string().selection(DEFAULT, 0);
  yield* all(
    selectedIndexes("2", 0),
    string().code.replace(lines(0), "\"My cat acts like my other caaat!\"", 1),
    code().code.replace(lines(0), "/cat/g", 1),
  )
  yield* string().selection(string().findAllRanges(/cat/g), 1);
  yield* beginSlide('9')
  yield* code().code.insert([0, 2], "aa", 1),
  yield* string().selection(string().findAllRanges(/caaat/g), 1);
  yield* beginSlide('10')
  yield* code().code.replace(word(0, 2, 3), "a{3}", 1),
  yield* beginSlide('11')
  yield* code().code.insert([0, 4], ",", 1);  
  yield* string().selection(string().findAllRanges(/ca+t/g), 1);
  yield* beginSlide('12');
  yield* code().code.replace(lines(0), `\
// + = {1,}"
/ca+t/g`, 
    1
  );
  yield* beginSlide('13');
  yield* code().code.replace(lines(0,1), `\
// * = {0,}
/ca*t/`, 
    1
  );
  yield* string().selection(string().findAllRanges(/ca*t/g), 1);
  yield* beginSlide('14');
  yield* code().code.replace(lines(0,1), `\
// ? = {0,1}
/ca?t/`, 
      1
    );
  yield* string().selection(string().findAllRanges(/ca?t/g), 1);
  yield* beginSlide('15');
  yield* string().selection(DEFAULT, 0);
  yield* all(
    selectedIndexes("3", 0),
    string().code.replace(lines(0), "\"Ca!ts are the best and I love cauts!\"", 1),
    code().code.replace(lines(0,1), "/ca.?t/gi", 1),
  )
  yield* string().selection(string().findAllRanges(/ca.?t/gi), 1);
  yield* beginSlide('16');
  yield* code().code.replace(lines(0,1), "/ca[a-zA-Z]?t/gi", 1),
  yield* string().selection(string().findAllRanges(/ca[a-zA-Z]?t/gi), 1);
  yield* beginSlide('16.1');
  yield* group().y(1000, 1);
  yield* all(
    selectedIndexes("3", 0),
    string().selection(DEFAULT, 0),
    string().code.replace(lines(0), "\"Kittens is another term for a cat but I prefer the term kitty\"\n\"for cats. Why don't we use the term catty?.\"", 1),
    code().code.replace(lines(0,1), "/????/", 1),
  )
  yield* beginSlide('17');
  const regex = /cat(s| )|kit{2}(y|en)s?/gi
  yield* code().code.replace(lines(0), `${regex}`, 1),
  yield* string().selection(string().findAllRanges(regex), 1);
  yield* beginSlide('18');
});

