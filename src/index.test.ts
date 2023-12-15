import { beforeEach, expect, test } from 'vitest';
import { pushStack, popStack, stack, createStack, resetStack } from '.';

beforeEach(async () => {
  resetStack();
});

test('push to global stack', () => {
  const depth1 = pushStack();
  expect(stack).toStrictEqual([depth1]);
});

test('pop from the global stack', () => {
  const depth1 = pushStack();
  expect(stack).toStrictEqual([depth1]);
  popStack(depth1);
  expect(stack.length).toBe(0);
});

test('reset the global stack', () => {
  pushStack();
  expect(stack.length).toBe(1);
  resetStack();
  expect(stack.length).toBe(0);
});

test('global stack meganism', () => {
  expect(stack.length).toBe(0);

  const depth1 = pushStack();
  expect(stack).toStrictEqual([depth1]);

  const depth2 = pushStack();
  expect(stack).toStrictEqual([depth1, depth2]);

  popStack(depth1); // depth1 is not on top of the stack, so nothing will change.
  expect(stack).toStrictEqual([depth1, depth2]);

  const depth3 = pushStack();
  expect(stack).toStrictEqual([depth1, depth2, depth3]);

  const popDepth2 = popStack(depth1);
  expect(popDepth2).toBeUndefined();

  const popDepth3 = popStack(depth3);
  expect(popDepth3).toBeDefined();

  expect(stack).toStrictEqual([depth1, depth2]);

  const depth4 = pushStack();
  expect(stack).toStrictEqual([depth1, depth2, depth4]);

  // Pop all of the stack
  popStack(depth4);
  popStack(depth2);
  popStack(depth1);

  expect(stack.length).toBe(0);
});

test('local stack', () => {
  const stack1 = createStack();
  const { stack: stack2, pushStack: pushStack2 } = createStack();

  const s1d1 = stack1.pushStack();
  expect(stack1.stack).toStrictEqual([s1d1]);

  const s2d1 = pushStack2();
  expect(stack2).toStrictEqual([s2d1]);

  stack1.popStack(s1d1);
  expect(stack1.stack.length).toBe(0);
});
