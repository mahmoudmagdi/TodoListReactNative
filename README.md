# React Native Todo List Application

## Overview

This is a React Native application for managing a Todo list with full CRUD (Create, Read, Update, Delete) functionality.
The application uses Redux for state management.

## Features

- **Add Todo Item:** Users can add new tasks to the list.
- **View Todo Items:** Display all tasks in a list.
- **Update Todo Item:** Users can edit the details of an existing task.
- **Delete Todo Item:** Users can remove tasks from the list.

## Setup

### Prerequisites

- Node.js
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mahmoudmagdi/TodoListReactNative.git
   cd TodoApp
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Install iOS dependencies:
   ```sh
   cd ios
   pod install
   cd ..
   ```

4. Start the application:
   ```sh
   npm run ios  # for iOS
   npm run android  # for Android
   ```

## Usage

### Adding a Todo Item

1. Open the app.
2. Write some todo item in the input field.
3. Click on the "Add Todo" button.
4. The new task will be added to the list

### Viewing Todo Items

1. Open the app.
2. All tasks will be displayed in a list on the main screen.

### Updating a Todo Item

1. Click on a task in the list.
2. Edit the task details in the form that appears.
3. Click "Submit" to save changes.

### Deleting a Todo Item

1. Swipe left on a task in the list.
2. Click the "Delete" button that appears.

## Screenshots

### iOS (Dark theme)

![Main Screen](https://github.com/mahmoudmagdi/TodoListReactNative/blob/update-readme/screenshots/ios-todo-list-dark-theme.gif?raw=true)

### Android (Light theme)

![Add Todo Screen](https://github.com/mahmoudmagdi/TodoListReactNative/blob/update-readme/screenshots/android-todo-list-light.gif?raw=true)

## Architecture

### Redux Setup

- **Store:** Centralized state management.
- **Actions:** Define the type of actions that can be dispatched.
- **Reducers:** Update the state based on actions.

## Code Structure

```
.
├── __tests__
│   ├── utils
│   └── todo
│       ├── TodoForm.test.tsx
│       ├── TodoItem.test.tsx
│       └── TodoList.test.tsx
├── components
│   └── todo
│       ├── TodoForm.tsx
│       ├── TodoItem.tsx
│       └── TodoList.tsx
│   └── UI
│       ├── CustomHeader.tsx
│       └── VerticalLine.tsx
├   └── MainComponenet.tsx
├── constants
│   └── colors.ts
├── model
│   └── Todo.ts
├── store
│   └── redux
│       ├── actions
│       ├── reducers.ts
│       └── store.ts
├── App.tsx
├── babel.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Testing

### Running Tests

To run the tests, execute:

```sh
npm test
```

To run the tests with coverage:

```sh
npm test:coverage
```

### Test Coverage

After running the tests, view the coverage results:

```shell
=============================== Coverage summary ===============================
> TodoApp@0.0.1 test:coverage
> jest --coverage

 PASS  __tests__/TodoList.test.tsx
 PASS  __tests__/TodoForm.test.tsx
 PASS  __tests__/App.test.tsx
 PASS  __tests__/TodoItem.test.tsx
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |   83.82 |    59.52 |   81.48 |   84.21 |                   
 TodoApp                 |     100 |       50 |     100 |     100 |                   
  App.tsx                |     100 |       50 |     100 |     100 | 18-38             
 TodoApp/components      |     100 |       50 |     100 |     100 |                   
  MainComponent.tsx      |     100 |       50 |     100 |     100 | 28                
 TodoApp/components/UI   |     100 |       50 |     100 |     100 |                   
  CustomHeader.tsx       |     100 |       50 |     100 |     100 | 24-30             
  VerticalLine.tsx       |     100 |       50 |     100 |     100 | 25                
 TodoApp/components/todo |   96.96 |    67.85 |     100 |   96.42 |                   
  TodoForm.tsx           |   93.33 |    66.66 |     100 |    92.3 | 37                
  TodoItem.tsx           |     100 |    66.66 |     100 |     100 | 55-59             
  TodoList.tsx           |     100 |       75 |     100 |     100 | 49                
 TodoApp/constants       |     100 |      100 |     100 |     100 |                   
  colors.ts              |     100 |      100 |     100 |     100 |                   
 TodoApp/store/redux     |   41.17 |        0 |   16.66 |   46.66 |                   
  actions.ts             |     100 |      100 |     100 |     100 |                   
  reducers.ts            |   23.07 |        0 |   16.66 |   27.27 | 17-28             
  store.ts               |     100 |      100 |     100 |     100 |                   
-------------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.976 s, estimated 1 s
Ran all test suites.
=============================== Coverage summary ===============================
```

#### Detailed Coverage

- **TodoForm Component:**
    - Renders correctly.
    - Calls `addTodo` action when form is submitted with valid input.
    - Clears input field after form submission.

- **TodoItem Component:**
    - Renders correctly.
    - Calls `updateTodo` action when edit button is clicked.
    - Calls `deleteTodo` action when delete button is clicked.

- **TodoList Component:**
    - Renders correctly.
    - Displays a list of todo items.
    - Handles empty state when there are no todos.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## Contact

For any questions or inquiries, please contact [mahmoudmagdi@ymail.com].
