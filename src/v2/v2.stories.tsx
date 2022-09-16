import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JsonEditor } from "./JsonEditor";

export default {
  title: "V2",
  component: JsonEditor,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof JsonEditor>;

const Template: ComponentStory<typeof JsonEditor> = (args) => (
  <JsonEditor {...args} />
);
const data = {
  order: {
    id: "order_124831sf23j123",
    price: 700010,
    isSuccess: true,
    details: [{ transact: true }, { hola: "amigo" }],
  },
};

export const Default = Template.bind({});
Default.args = {
  data,
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
