import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { WeekView, WeekViewContext } from "../WeekView";
import { addHours, addWeeks, endOfWeek, startOfWeek } from "date-fns";
import styles from "./custom.module.scss";

const meta = {
  title: "WeekView",
  component: WeekView,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],

  argTypes: {
    fromDate: {
      description: "The first date the calendar will show",
      control: { type: "date" },
      table: {
        defaultValue: {
          summary: "(Start of week)",
          detail: "Start of the present ISO week (Monday)",
        },
      },
    },
    toDate: {
      description: "The last date the calendar will show",
      control: { type: "date" },
      table: {
        defaultValue: {
          summary: "(End of week)",
          detail: "End of the present ISO week (Sunday)",
        },
      },
    },
    fromHour: {
      description: "The earliest hour the calendar will show",
      control: { type: "number", min: 0, max: 23, default: 0 },
      table: {
        defaultValue: {
          summary: "0",
        },
      },
    },
    toHour: {
      description: "The latest hour the calendar will show",
      control: { type: "number", min: 1, max: 24 },
      table: {
        defaultValue: {
          summary: "24",
        },
      },
    },
    events: {
      description: "The events to show at the appropriate day and time",
      control: { type: "object" },
      table: {
        defaultValue: {
          summary: "[]",
        },
      },
    },
  },
} satisfies Meta<typeof WeekView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFeatures: Story = {
  args: {
    fromDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    toDate: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
    fromHour: 7,
    toHour: 17,
    events: [
      {
        id: "mockid1",
        title: "Event",
        startDate: new Date("2024-08-06T05:00"),
        endDate: new Date("2024-08-06T11:00"),
      },
      {
        id: "mockid2",
        title: "Multi-day event",
        startDate: new Date("2024-08-07T21:00"),
        endDate: new Date("2024-08-08T10:00"),
      },
      {
        id: "mockid3",
        title: "Overlapping event",
        startDate: new Date("2024-08-06T09:00"),
        endDate: new Date("2024-08-06T12:00"),
      },
    ],
  },
};

/**
 * # Custom Styling
 * Use the WeekViewContext.style to substitute your own styles. Click
 * "Show code" and have a look at src/stories/custom.module.scss.
 */
export const CustomStyling: Story = {
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
  decorators: [
    (Story) => (
      <WeekViewContext.Provider value={{ styles }}>
        <Story />
      </WeekViewContext.Provider>
    ),
  ],
};
