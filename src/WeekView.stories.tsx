import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { WeekView } from "./WeekView";
import { addHours, addWeeks, endOfWeek, startOfWeek } from "date-fns";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "WeekView",
  component: WeekView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof WeekView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AllFeatures: Story = {
  args: {
    fromDate: startOfWeek(new Date()),
    toDate: endOfWeek(addWeeks(new Date(), 1)),
    from: 0,
    to: 24,
    events: [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-06T10:00"),
        endDate: new Date("2024-08-06T11:00"),
      },
      {
        id: "mockid2",
        title: "Event",
        startDate: new Date("2024-08-07T21:00"),
        endDate: new Date("2024-08-08T10:00"),
      },
    ],
  },
};

export const Default: Story = {
  args: {
    events: [
      {
        id: "mockid1",
        title: "Now",
        startDate: new Date(),
        endDate: addHours(new Date(), 1),
      },
    ],
  },
};
