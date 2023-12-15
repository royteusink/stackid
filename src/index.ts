export type StackId = number;
export type Stack = StackId[];

let stackId: StackId = 0;

export const stack: Stack = [];

const _reset = (_stack: Stack) => {
  _stack.length = 0;
};

const _push = (_stack: Stack) => {
  const id = ++stackId;
  _stack.push(id);
  return id;
};

const _pop = (_stack: Stack, id: StackId) => {
  if (_stack.length > 0 && _stack[_stack.length - 1] === id) {
    return _stack.pop();
  }
};

/**
 * Push something to the stack.
 * @returns The stack id which needs to be stored in order to popStack.
 */
export const pushStack = () => _push(stack);

/**
 * Pop from the stack.
 * @returns The stack id that has been popped of.
 */
export const popStack = (id: StackId) => _pop(stack, id);

export const resetStack = () => _reset(stack);

export function createStack() {
  const localStack: Stack = [];
  const pushStack = () => _push(localStack);
  const popStack = (id: StackId) => _pop(localStack, id);
  const resetStack = () => _reset(localStack);
  return { stack: localStack, pushStack, popStack, resetStack };
}
