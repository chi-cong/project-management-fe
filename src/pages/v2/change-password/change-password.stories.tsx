import type { Meta, StoryObj } from '@storybook/react';

import { ChangePassword } from './change-password';

const meta = {
  component: ChangePassword,
} satisfies Meta<typeof ChangePassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};