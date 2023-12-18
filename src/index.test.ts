import { expect, test } from 'vitest';
import { createStack } from '.';

test('should use a different stack id creation algorith', () => {
  const { getState, pushStack } = createStack(() => crypto.randomUUID());
  pushStack();
  pushStack();
  pushStack();
  expect(getState().length).toBe(3);
  expect(getState()[0]).toBeTypeOf('string');
});

test('should do stack operations push and pop', () => {
  const { getState, pushStack, popStack } = createStack();

  expect(getState().length).toBe(0);

  const depth1 = pushStack();
  expect(getState()).toStrictEqual([depth1]);

  const depth2 = pushStack();
  expect(getState()).toStrictEqual([depth1, depth2]);

  popStack(depth1); // depth1 is not on top of the stack, so nothing will change.
  expect(getState()).toStrictEqual([depth1, depth2]);

  const depth3 = pushStack();
  expect(getState()).toStrictEqual([depth1, depth2, depth3]);

  const popDepth2 = popStack(depth1);
  expect(popDepth2).toBeUndefined();

  const popDepth3 = popStack(depth3);
  expect(popDepth3).toBeDefined();

  expect(getState()).toStrictEqual([depth1, depth2]);

  const depth4 = pushStack();
  expect(getState()).toStrictEqual([depth1, depth2, depth4]);

  // Pop all of the stack
  popStack(depth4);
  popStack(depth2);
  popStack(depth1);

  expect(getState().length).toBe(0);
});

test('should allow to use multiple stacks', () => {
  const stack1 = createStack();
  const stack2 = createStack();

  const s1d1 = stack1.pushStack();
  expect(stack1.getState()).toStrictEqual([s1d1]);

  const s2d1 = stack2.pushStack();
  expect(stack2.getState()).toStrictEqual([s2d1]);

  stack1.popStack(s1d1);
  expect(stack1.getState().length).toBe(0);
});

test('should reset the stack', () => {
  const { getState, pushStack, resetStack } = createStack();

  pushStack();
  pushStack();
  expect(getState().length).toBe(2);

  resetStack();
  expect(getState().length).toBe(0);
});

test('should detemine if a id is on top of the stack', () => {
  const { onTopStack, pushStack } = createStack();
  const first = pushStack();
  const second = pushStack();
  expect(onTopStack(first)).toBe(false);
  expect(onTopStack(second)).toBe(true);;
});

test('should able to force pop from the stack', () => {
  const { getState, popStack, pushStack } = createStack();
  const first = pushStack();
  const second = pushStack();
  popStack(first, true);
  expect(getState().length).toBe(1);
});
