# StackID

A lightweight JavaScript package for managing stacked views like modals. Easily create, push, and pop while ensuring secure closure using unique IDs. Ideal for handling modal interactions, such as closing with specific triggers like 'esc' key, while maintaining a clean and efficient stack structure.

## Installation

You can install the StackID using npm:

```bash
npm install --save stackid
```

## Usage

### Creating and use a stack

To create a new stack, use the `createStack` function:

```ts
import { createStack } from 'stackid';

// Create a stack
const stack = createStack();

const id1 = stack.pushStack(); // Pushes a new identifier (e.g., 1)
const id2 = stack.pushStack(); // Pushes another identifier (e.g., 2)

console.log(stack.onTopStack(id2)); // true

stack.popStack(id2); // Pops the identifier from the stack

console.log(stack.getState()); // [1]
```

### Managing the stack

StackID provides several methods for manipulating the stack:

- `pushStack`: Pushes a new identifier onto the stack and returns the assigned stack id.
- `popStack`: Pops the identifier from the stack if it is on top. Returns the popped stack id or undefined if the stack is empty or the provided identifier is not on top.
- `resetStack`: Resets the stack, removing all identifiers.
- `onTopStack`: Checks if the provided identifier is on top of the stack.
- `getState`: Returns an immutable state of the current stack.

### Customizing Identifier Type

You can customize the type of identifiers used in the stack by providing a type parameter to the `createStack` function. By default, the stack uses `number`:

```ts
const stack = createStack(() => crypto.randomUUID());
pushStack(); // '44f70f2c-2ba6-4c5f-b21b-36a268360e7d
```

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
