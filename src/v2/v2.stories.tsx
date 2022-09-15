import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import JsonSchemaEditor from "./JsonSchemaEditor";

export default {
  title: "V2",
  component: JsonSchemaEditor,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof JsonSchemaEditor>;

const Template: ComponentStory<typeof JsonSchemaEditor> = (args) => (
  <JsonSchemaEditor {...args} />
);
const data = {
  order: {
    id: "order_124831sf23j123",
    price: 70000,
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
