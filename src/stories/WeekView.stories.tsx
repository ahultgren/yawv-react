import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { WeekView } from "../WeekView";
import {
  add,
  addHours,
  endOfWeek,
  interval,
  intervalToDuration,
  startOfWeek,
} from "date-fns";
import styles from "./custom.module.scss";
import { sv } from "date-fns/locale";

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

function relativeToMockWeek(date: Date) {
  const weekStart = startOfWeek(new Date("2024-08-06T00:00"));
  const diff = intervalToDuration(interval(weekStart, date));
  return add(startOfWeek(new Date()), diff);
}

export const AllFeatures: Story = {
  args: {
    fromDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    toDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
    fromHour: 7,
    toHour: 17,
    events: [
      {
        id: "mockid1",
        title: "Event",
        startDate: relativeToMockWeek(new Date("2024-08-06T05:00")),
        endDate: relativeToMockWeek(new Date("2024-08-06T11:00")),
      },
      {
        id: "mockid2",
        title: "Multi-day event",
        startDate: relativeToMockWeek(new Date("2024-08-07T15:00")),
        endDate: relativeToMockWeek(new Date("2024-08-08T10:00")),
      },
      {
        id: "mockid3",
        title: "Overlapping event",
        startDate: relativeToMockWeek(new Date("2024-08-06T09:00")),
        endDate: relativeToMockWeek(new Date("2024-08-06T12:00")),
      },
    ],
  },
};

/**
 * # Custom Styling
 * Provide your own stylesheet as an argument. Click "Show code" below to see
 * how it's implemented, and have a look at src/stories/custom.module.scss and
 * src/stories/WeekView.stories.tsx.
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
    styles: styles,
  },
};

/**
 * # Localization
 * Provide any locale supported by date-fns (see https://github.com/date-fns/date-fns/tree/main/src/locale).
 */
export const Localization: Story = {
  args: {
    fromHour: 10,
    toHour: 17,
    events: [
      {
        id: "mockid1",
        title: "Now",
        startDate: new Date(),
        endDate: addHours(new Date(), 1),
      },
    ],
    locale: sv,
  },
};
