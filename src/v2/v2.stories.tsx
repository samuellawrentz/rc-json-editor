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

export const FromTreeData = Template.bind({});
FromTreeData.args = {
  data: TreeUtils.cleanTree(
    TreeUtils.convertJSONtoTree({ a: [{ a: 123 }] }, undefined)
  ),
  fromTree: true,
  onChange: (treeData: ArrayItem[]) =>
    console.log(TreeUtils.convertTreetoJSON(treeData)),
};

console.log(
  TreeUtils.convertTreetoJSON([
    {
      key: "author123",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
    {
      key: "description",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
    { key: "isbn", selected: false, data_type: "string", sub_object: [] },
    { key: "pages", selected: false, data_type: "number", sub_object: [] },
    {
      key: "published",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
    {
      key: "publisher",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
    {
      key: "subtitle",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
    { key: "title", selected: false, data_type: "string", sub_object: [] },
    {
      key: "website",
      selected: false,
      data_type: "string",
      sub_object: [],
    },
  ])
);

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
