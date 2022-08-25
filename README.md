# rc-json-editor
A simple react component that handles your JSON editing woes in a wink 😉

## The What and Why
This is a simple React Component _(and hence the "rc")_ that takes your JSON as input and renders a beautiful UI which allows you to edit the JSON on the go. I searched the web for this component for my specific needs and was not able to find one. And so, I created one.

### Why do you want a json-editor component?
You may think, why waste time on a component, while you can put `content-editable="true"` on a `code` tag and allow your users to edit their JSON themselves. But the catch here is, not everyone knows the syntax of a JSON. This tool could help in that case.

### This is not the "Perfect" component
It is just a start, issues and PRs are welcome if you find this component helping your needs. Find the [Demo Storybook](https://samuellawrentz.github.io/rc-json-editor/?path=/story/introduction--page)

## The How?
This component purely works on a custom Datatype called `JsonArray` which extends the `Array` class. So you know, it is an array of sorts, with some additional custom components.

This is a in-progress doc, so please visit the `JsonArrayClass.ts` file for the complete implementation.

> Changes are welcome so are feedbacks.

## Dependencies
There are no big dependencies per se.
- react
- react-dom

## Things to do
- Provide the full control of the rendering part as a prop
- Provide event callbacks

## Usage

Install the package from npm

```bash
npm install rc-json-editor
```

This is a simple usage example

```jsx
import { TreeWrapper } from 'rc-json-editor';

<TreeWrapper
  data={{
    order: {
      id: 'order_124831sf23j123',
      isSuccess: true,
      price: 70000
    }
  }}
  onChange={() => {}}
/>
```

## Props
- `data` - A JSON that needs to be viewed/edited
- `onChange` - A callback that gets executed when the `data` is updated


#### Storybook
Find the demo here - https://samuellawrentz.github.io/react-json-editor/?path=/story/introduction--page
NPM package link - https://www.npmjs.com/package/rc-json-editor
