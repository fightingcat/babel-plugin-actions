# babel-plugin-actions

> Babel plugin to generate traceable type for the-actions.

_Issues related to the-actions should be reporter on `the-actions` [issue-tracker](https://github.com/zccz14/the-actions/issues)._

## Install

```sh
npm install --save-dev babel-plugin-actions
```

## Usage

Run:

```sh
babel --plugins actions script.js
```

Or add the plugin to your `.babelrc` configuration:

```json
{
  "plugins": [ "actions" ]
}
```

## Example

The plugin will compile the following code:

```js
// actions.js
const UserAction = ActionCreator();
const OtherActions = {
    Example: ActionCreator()
}
```

into:

```js
// actions.js
const UserAction = ActionCreator("actions.js: UserAction");
const OtherActions = {
    Example: ActionCreator("actions.js: OtherActions.Example")
}
```