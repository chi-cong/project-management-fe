import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "src/libs/redux";

import { ActivityItem } from "./activity-item";

const meta = {
  component: ActivityItem,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof ActivityItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activity: {
      description: "Reading documents",
      createdAt: "2021-04-15",
      user: {
        username: "supeAdmin",
      },
    },
    uid: "abcdefghijklmnopqrstuvwxyz",
  },
};
