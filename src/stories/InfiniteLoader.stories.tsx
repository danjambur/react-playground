import type { Meta, StoryObj } from "@storybook/react";

import InfiniteLoader from "../components";
import React from "react";

const meta = {
  title: "Example/InfiniteLoader",
  component: InfiniteLoader,
} satisfies Meta<typeof InfiniteLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiEndpoint: "https://picsum.photos/v2/list",
    limit: 10,
    renderContent: (data: any[]) => {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 m-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={`${item.download_url}`}
                alt={item.author}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="text-center">
                <p className="text-lg font-semibold">{item.author}</p>
                <p className="text-sm">
                  {item.width} x {item.height}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
};
