import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import JsonEditor from "./JsonEditor";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Examples",
  component: JsonEditor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof JsonEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JsonEditor> = (args) => (
  <JsonEditor {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: {
    hi: 123,
  },
  hasSelection: true,
  onChange: (data) => {
    // console.log(data);
  },
};

// {
//   order: {
//     id: "order_124831sf23j123",
//     price: 70000,
//     isSuccess: true,
//     details: {
//       transact: false,
//     },
//   },
// }
