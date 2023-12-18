function genNextId<T>(prev?: T): T {
  return (typeof prev === 'number' ? prev + 1 : 0) as T;
}

export function createStack<T = number>(nextId?: (prev?: T) => T) {
  let curId: T | undefined;
  const stack: T[] = [];

  /**
   * Checks if the provided identifier is on top of the stack.
   * @param id
   */
  function onTopStack(id: T) {
    return stack.length > 0 && stack[stack.length - 1] === id;
  }

  /**
   * Resets the stack, removing all identifiers.
   */
  function resetStack() {
    curId = undefined;
    stack.length = 0;
  }

  /**
   * Pushes a new identifier onto the stack and returns the assigned stack id.
   */
  function pushStack() {
    curId = nextId ? nextId(curId) : genNextId(curId);
    stack.push(curId);
    return curId;
  }

  /**
   * Pops the identifier from the stack if it is on top.
   * Returns the popped stack id or undefined if the stack is empty or the provided identifier is not on top.
   * @param id
   * @param force
   */
  function popStack(id: T, force?: boolean) {
    if (onTopStack(id) || force) return stack.pop();
  }

  /**
   * Get a immutable state of the current stack.
   */
  function getState(): T[] {
    return [...stack];
  }

  return {
    getState,
    pushStack,
    popStack,
    resetStack,
    onTopStack,
  };
}
