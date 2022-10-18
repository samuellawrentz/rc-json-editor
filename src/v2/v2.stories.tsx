import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JsonEditor } from "./JsonEditor";
import { ArrayItem } from "../interfaces";
import { TreeUtils } from "./TreeUtils";

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
  order: "hi",
};

export const Default = Template.bind({});
Default.args = {
  data,
  onChange: (treeData: ArrayItem[]) => console.log(treeData),
};

export const FromTreeData = Template.bind({});
FromTreeData.args = {
  data: [
    {
      key: "start",
      response_key: "items.field_77.start",
      create: true,
      editable: true,
      optional: true,
      sub_object: [],
      data_type: "string",
    },
    {
      key: "end",
      response_key: "items.field_77.end",
      create: true,
      editable: true,
      optional: true,
      sub_object: [],
      data_type: "string",
    },
    {
      key: "all_day",
      response_key: "items.field_77.all_day",
      create: true,
      editable: true,
      optional: true,
      sub_object: [],
      data_type: "string",
    },
  ],
  fromTree: true,
  onChange: (treeData: ArrayItem[]) =>
    console.log(TreeUtils.convertTreetoJSON(treeData)),
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
