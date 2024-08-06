import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "src/libs/redux";
import { TaskForm } from "src/layouts/task-form";

const meta = {
  title: "taskform",
  component: TaskForm,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
