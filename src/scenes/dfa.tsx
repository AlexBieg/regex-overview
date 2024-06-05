import { Circle, Code, makeScene2D, Ray, Rect, Spline, Txt, View2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, createSignal, DEFAULT, Direction, easeInCubic, easeInOutElastic, easeInOutQuad, easeInOutSine, easeInSine, easeOutCubic, easeOutQuad, easeOutSine, linear, SimpleSignal, slideTransition } from '@motion-canvas/core';
import { codeBg, purple, red, white, yellow } from '../constants';

const STR_TEXT = "10101";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const bg = createRef<Rect>();
  view.add(<Rect ref={bg} width="100%" height="100%" fill={red} />)
  view.add(<Txt ref={title} text="Deterministic Finite Automata" padding={40} fontFamily="Quicksand" fontWeight={700} fontSize={100} />);
  const drawPercent = createSignal(0);


  yield* slideTransition(Direction.Bottom);
  yield* beginSlide('1')

  yield* title().text("DFA", 1);
  yield* beginSlide('1.1')
  yield* all(
    title().fontSize(40, 1),
    title().topLeft(bg().topLeft, 1),
    title().opacity(0.5, 1),
  )
  const flowMap = populateCircles(view, drawPercent);
  yield* drawPercent(1, 1)

  yield* beginSlide('2')
  const followerSize = createSignal(0);
  const follower = createRef<Circle>();
  view.add(<Circle zIndex={3} ref={follower} position={flowMap.start().from} width={followerSize} height={followerSize} fill={purple} stroke={codeBg} lineWidth={4} />)
  yield* followerSize(30, .5);
  yield* beginSlide('3')

  yield* follower().position(flowMap.endCirc().position, 1)

  const updater = followerUpdater(follower(), flowMap)

  for (let i = 0; i < STR_TEXT.length; i++) {
    yield* (flowMap.str() as Code).selection([[0,i+1],[0,i+2]], 1);
    yield* beginSlide(`4.${i}`);
    yield* updater(i);
  }

  yield* all(
    flowMap.str().fontSize(0, 1),
    flowMap.regex().fontSize(60, 1)
  )
  yield* beginSlide("5");
  yield* all(
    flowMap.regex().selection(flowMap.regex().findAllRanges(/1\*/g), 1),
    flowMap[flowMap.endCirc().key][1]().lineWidth(15, 1),
    flowMap[flowMap.otherCirc().key][1]().lineWidth(15, 1),
  );
  yield* beginSlide("6");
  yield* all(
    flowMap.regex().selection(flowMap.regex().findAllRanges(/0/g), 1),
    flowMap[flowMap.endCirc().key][1]().lineWidth(6, 1),
    flowMap[flowMap.otherCirc().key][1]().lineWidth(6, 1),
    flowMap[flowMap.endCirc().key][0]().lineWidth(15, 1),
    flowMap[flowMap.otherCirc().key][0]().lineWidth(15, 1),
  );
  yield* beginSlide("7");
  yield* all(
    flowMap.regex().selection(flowMap.regex().findAllRanges(/\(|\)\*/g), 1),
    flowMap[flowMap.endCirc().key][0]().lineWidth(6, 1),
    flowMap[flowMap.otherCirc().key][0]().lineWidth(6, 1),
    flowMap.start().lineWidth(15, 1),
  );
  yield* beginSlide("8");
});

function populateCircles(view: View2D, drawPercent: SimpleSignal<number>) {
  const diameter = 100;
  const endCirc = createRef<Circle>();
  const otherCirc = createRef<Circle>();


  view.add(
    <>
      <Circle zIndex={1} end={drawPercent} ref={endCirc} x={-200} fill={white} width={diameter + 30} height={diameter + 30} stroke={codeBg} lineWidth={8} />
      <Circle zIndex={2} end={drawPercent} x={-200} width={diameter} height={diameter} fill={white} stroke={codeBg} lineWidth={8} />
      <Circle zIndex={1} end={drawPercent} ref={otherCirc} x={200} width={diameter} height={diameter} fill={white} stroke={codeBg} lineWidth={8} />
    </>
  );

  const flowMap = {
    endCirc,
    otherCirc,
    [endCirc().key]: {
      0: createRef<Spline>(),
      1: createRef<Spline>(),
    },
    [otherCirc().key]: {
      0: createRef<Spline>(),
      1: createRef<Spline>(),
    },
    start: createRef<Ray>(),
    str: createRef<Code>(),
    regex: createRef<Code>(),
  }

  view.add(
    <>
      <Spline ref={flowMap[endCirc().key][0]} end={drawPercent} lineWidth={6} stroke={codeBg} endArrow points={[
        endCirc().getPointAtPercentage(.1).position.transformAsPoint(endCirc().localToParent()),
        [-100, 80],
        [0, 110],
        [100, 80],
        otherCirc().getPointAtPercentage(0.37).position.transformAsPoint(otherCirc().localToParent()),
      ]} />
      <Spline ref={flowMap[otherCirc().key][0]} end={drawPercent} endArrow lineWidth={6} stroke={codeBg} points={[
        otherCirc().getPointAtPercentage(0.60).position.transformAsPoint(otherCirc().localToParent()),
        [100, -80],
        [0, -110],
        [-100, -80],
        endCirc().getPointAtPercentage(0.9).position.transformAsPoint(endCirc().localToParent()),
      ]} />
      <Spline ref={flowMap[endCirc().key][1]} end={drawPercent} endArrow lineWidth={6} stroke={codeBg} points={[
        endCirc().getPointAtPercentage(0.8).position.transformAsPoint(endCirc().localToParent()),
        [endCirc().x() + 50, endCirc().y() - 150],
        [endCirc().x(), endCirc().y() - 190],
        [endCirc().x() - 50, endCirc().y() - 150],
        endCirc().getPointAtPercentage(0.7).position.transformAsPoint(endCirc().localToParent()),
      ]} />
      <Spline ref={flowMap[otherCirc().key][1]} end={drawPercent} endArrow lineWidth={6} stroke={codeBg} points={[
        otherCirc().getPointAtPercentage(0.7).position.transformAsPoint(otherCirc().localToParent()),
        [otherCirc().x() - 50, endCirc().y() - 150],
        [otherCirc().x(), endCirc().y() - 190],
        [otherCirc().x() + 50, endCirc().y() - 150],
        otherCirc().getPointAtPercentage(0.8).position.transformAsPoint(otherCirc().localToParent()),
      ]} />
      <Ray ref={flowMap.start} end={drawPercent} lineWidth={6} stroke={codeBg} endArrow fromX={-500} toX={endCirc().x() - (diameter / 2 + 15)} />
      <Rect layout direction="column" alignItems="center" fill={codeBg} padding={() => 20 * drawPercent()} radius={30} y={350}>
        <Code ref={flowMap.regex} code="(1*01*01*)*" fontSize={0} />
        <Code ref={flowMap.str} code={`"${STR_TEXT}"`} fontSize={() => 60 * drawPercent()} />
      </Rect>
    </>
  );

  view.add(
    <>
      <Txt
        text="1" 
        fontFamily="Quicksand" 
        fontSize={() => 40 * drawPercent()}
        x={flowMap[endCirc().key][1]().getPointAtPercentage(0.5).position.x} 
        y={flowMap[endCirc().key][1]().getPointAtPercentage(0.5).position.y - 30} />
      <Txt
        text="1" 
        fontFamily="Quicksand" 
        fontSize={() => 40 * drawPercent()}
        x={flowMap[otherCirc().key][1]().getPointAtPercentage(0.5).position.x} 
        y={flowMap[otherCirc().key][1]().getPointAtPercentage(0.5).position.y - 30} />
      <Txt
        text="0" 
        fontFamily="Quicksand" 
        fontSize={() => 40 * drawPercent()}
        x={flowMap[otherCirc().key][0]().getPointAtPercentage(0.5).position.x} 
        y={flowMap[otherCirc().key][0]().getPointAtPercentage(0.5).position.y - 30} />
      <Txt
        text="0" 
        fontFamily="Quicksand" 
        fontSize={() => 40 * drawPercent()}
        x={flowMap[endCirc().key][0]().getPointAtPercentage(0.5).position.x} 
        y={flowMap[endCirc().key][0]().getPointAtPercentage(0.5).position.y - 30} />
      <Txt
        text="Start" 
        fontFamily="Quicksand" 
        fontSize={() => 40 * drawPercent()}
        x={flowMap.start().from.x() - 70} 
        y={flowMap.start().from.y} />
    </>
  )

  return flowMap;
}

function followerUpdater(follower: Circle, flowMap) {
  let currentCirc = flowMap.endCirc;
  let futureCirc = flowMap.otherCirc;

  return function* (index: number) {
    const nextChar = STR_TEXT[index];
    const val = parseInt(nextChar);
    const end = val === 1 ? currentCirc : futureCirc;

    yield* all(
      followPath(follower, end(), flowMap[currentCirc().key][val]()),
    )
    
    if (val === 0) {
      const temp = currentCirc;
      currentCirc = futureCirc;
      futureCirc = temp;
    }
  }
  
}

function* followPath(follower: Circle, end: Circle, path: Spline) {
  // Move to start of spline
  yield* follower.position(path.getPointAtPercentage(0).position, 0.5, easeInCubic)
  // Follow spline
  const progress = createSignal(0);
  follower.position(() => path.getPointAtPercentage(progress()).position)
  yield* progress(1, .7, linear)
  // Move to center of circle from end of spline
  yield* follower.position(end.position, 0.5, easeOutCubic)
}