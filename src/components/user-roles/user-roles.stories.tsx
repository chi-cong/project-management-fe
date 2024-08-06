import type { Meta, StoryObj } from '@storybook/react';

import { UserRoles } from './user-roles';

const meta = {
  component: UserRoles,
} satisfies Meta<typeof UserRoles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};