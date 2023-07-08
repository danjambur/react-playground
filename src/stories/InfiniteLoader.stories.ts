import type { Meta, StoryObj } from "@storybook/react";

import InfiniteLoader from "../components";

const meta = {
  title: "Example/InfiniteLoader",
  component: InfiniteLoader,
} satisfies Meta<typeof InfiniteLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiEndpoint: "",
    limit: 10,
    renderContent: (data: unknown[]) => null,
  },
};
