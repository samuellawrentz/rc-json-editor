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
  results: "",
};

console.log(TreeUtils.convertJSONtoTree(data, undefined));

export const Default = Template.bind({});
Default.args = {
  data,
  onChange: (treeData: ArrayItem[]) => console.log(treeData),
};

export const FromTreeData = Template.bind({});
FromTreeData.args = {
  data: [
    {
      key: "active",
      data_type: "boolean",
      selected: true,
      sub_object: [],
    },
    {
      key: "createdAt",
      data_type: "string",
      selected: true,
      sub_object: [],
    },
    {
      key: "customer_add",
      data_type: "list",
      selected: true,
      sub_object: [
        {
          key: "address",
          data_type: "list of booleans",
          selected: true,
          sub_object: [],
        },
        {
          key: "city",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
        {
          key: "country",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
        {
          key: "state",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
      ],
    },
    {
      key: "customer_category",
      data_type: "list",
      selected: true,
      sub_object: [],
    },
    {
      key: "customer_data",
      data_type: "object",
      selected: true,
      sub_object: [
        {
          key: "age",
          data_type: "number",
          selected: true,
          sub_object: [],
        },
        {
          key: "first_name",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
        {
          key: "last_name",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
        {
          key: "title",
          data_type: "string",
          selected: true,
          sub_object: [],
        },
      ],
    },
    {
      key: "description",
      data_type: "string",
      selected: true,
      sub_object: [],
    },
    {
      key: "email",
      data_type: "string",
      selected: true,
      sub_object: [],
    },
    {
      key: "id",
      data_type: "string",
      selected: true,
      sub_object: [],
    },
    {
      key: "phone",
      data_type: "string",
      selected: true,
      sub_object: [],
    },
    {
      key: "home_phone",
      data_type: "string",
      selected: true,
      sub_object: [],
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
