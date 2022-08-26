import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import JsonTree from "./JsonTree";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Examples",
  component: JsonTree,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof JsonTree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JsonTree> = (args) => (
  <JsonTree {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: {
    order: {
      id: "order_124831sf23j123",
      price: 70000,
      isSuccess: true,
    },
  },
  hasSelection: true,
};
