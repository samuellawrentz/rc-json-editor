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
  current_page: 1,
  items: [
    {
      field_285: ["DVWQWRNZ49"],
      field_285_val: [
        {
          id: "DVWQWRNZ49",
          val: "Humane Wildlife Control Solutions",
        },
      ],
      field_481: "XYZ Widgets, Inc.",
      field_71: {
        first_name: "Brandi",
        last_name: "Riddle",
        middle_name: "",
        title: "",
      },
      field_72: "brandiriddlehwcs@gmail.com",
      field_73: {
        address: "5806 Crockett Drive",
        address2: "",
        city: "Louisville",
        country: "United States",
        lat: "38.1669682",
        lng: "-85.8739897",
        state: "Kentucky",
        zip: "40258",
      },
      field_74: "5026121316",
      field_75: "5024105444",
      field_97: 1290,
      id: "4PzQ4yGjJG",
    },
    {
      field_285: "",
      field_285_val: [],
      field_481: "",
      field_71: {
        first_name: "You Shouldn't",
        last_name: "See Me",
        middle_name: "",
        title: "",
      },
      field_72: "",
      field_73: {
        address: "",
        address2: "",
        city: "",
        country: "",
        lat: "",
        lng: "",
        state: "",
        zip: "",
      },
      field_74: "",
      field_75: "",
      field_97: 1291,
      id: "oaANBE1r1b",
    },
    {
      field_285: ["DVWQWRNZ49"],
      field_285_val: [
        {
          id: "DVWQWRNZ49",
          val: "Humane Wildlife Control Solutions",
        },
      ],
      field_481: "",
      field_71: {
        first_name: "Chuck edited",
        last_name: "Norris",
        middle_name: "new",
        title: "",
      },
      field_72: "norris@boread.com",
      field_73: {
        address: "Frisco",
        address2: "",
        city: "",
        country: "",
        lat: "",
        lng: "",
        state: "TX",
        zip: "",
      },
      field_74: "8871173937",
      field_75: "8871173937",
      field_97: 1292,
      id: "o6WQbJ5QnB",
    },
    {
      field_285: "",
      field_285_val: [
        {
          id: "",
          val: {
            name: "dfsfs",
          },
        },
      ],
      field_481: "test",
      field_71: {
        first_name: "wr",
        last_name: "",
        middle_name: "",
        title: "",
      },
      field_72: "",
      field_73: {
        address: "24",
        address2: "",
        city: "we",
        country: "",
        lat: "",
        lng: "",
        state: "illinoi",
        zip: "",
      },
      field_74: "7007114918",
      field_75: "7007114918",
      field_97: 1296,
      id: "698rd32jZw",
    },
  ],
  limit: 100,
  total_items: 4,
  total_pages: 1,
  type: "success",
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
