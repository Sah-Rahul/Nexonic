import { useState } from "react";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "meeting" | "deadline" | "task";
}

const getEventColor = (type: string) => {
  switch (type) {
    case "meeting":
      return "bg-blue-500";
    case "deadline":
      return "bg-red-500";
    case "task":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const events: Event[] = [
    {
      id: "1",
      title: "Team Meeting",
      date: new Date(2025, 9, 15),
      type: "meeting",
    },
    {
      id: "2",
      title: "Product Launch",
      date: new Date(2025, 10, 22),
      type: "deadline",
    },
    {
      id: "3",
      title: "Review Orders",
      date: new Date(2025, 11, 18),
      type: "task",
    },
  ];

  const getEventsForDate = (d: Date) =>
    events.filter(
      (e) =>
        e.date.getFullYear() === d.getFullYear() &&
        e.date.getMonth() === d.getMonth() &&
        e.date.getDate() === d.getDate()
    );

  const goToToday = () => setDate(new Date());
  const goToPreviousMonth = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear()}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Manage your schedule and events
          </p>
        </div>
        <Button className="inline-flex items-center px-4 py-2">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="  lg:col-span-2 p-6 min-h-[520px]">
          <CardHeader className="flex items-center justify-between mb-6">
            <p></p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="flex items-center space-x-1"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Today</span>
              </Button>
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CalendarLib
            value={date}
            onChange={(value) => {
              if (value && !(value instanceof Array)) {
                setDate(value);
              }
            }}
            calendarType="iso8601"
            tileClassName={({ date: d, view }) => {
              if (view === "month") {
                const isSelected =
                  d.getDate() === date.getDate() &&
                  d.getMonth() === date.getMonth() &&
                  d.getFullYear() === date.getFullYear();

                return isSelected
                  ? "bg-blue-600 text-white rounded-lg shadow-md"
                  : "rounded-lg hover:bg-blue-100";
              }
              return "";
            }}
            tileContent={({ date: d, view }) => {
              if (view === "month") {
                const dayEvents = getEventsForDate(d);
                return (
                  <div className="mt-1 flex flex-col gap-0.5 px-0.5">
                    {dayEvents.map((e) => (
                      <span
                        key={e.id}
                        className={`text-[10px] px-1 rounded text-white truncate ${getEventColor(
                          e.type
                        )}`}
                        title={e.title}
                      >
                        {e.title}
                      </span>
                    ))}
                  </div>
                );
              }
              return null;
            }}
            prevLabel={<ChevronLeft className="w-5 h-5" />}
            nextLabel={<ChevronRight className="w-5 h-5" />}
            formatDay={(locale, date) => date.getDate().toString()}
            className={`border ${
              darkMode ? "text-black" : "text-black"
            }  border-gray-300 rounded-lg overflow-hidden
              react-calendar-custom`}
          />
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Upcoming Events
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Your scheduled activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 max-h-[480px] overflow-y-auto">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-gray-200 bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-400">
                        {event.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${getEventColor(
                        event.type
                      )} text-white capitalize`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      <style>{`
        /* Override default react-calendar styles for bigger calendar */
        .react-calendar-custom {
          width: 100% !important;
          max-width: none !important;
          font-family: inherit;
          font-size: 1rem;
        }

        .react-calendar-custom .react-calendar__tile {
          padding: 12px 10px !important;
          border-radius: 0.5rem !important;
          height: 80px !important;
          max-height: 80px !important;
          line-height: 1.2 !important;
        }

        .react-calendar-custom .react-calendar__month-view__weekdays__weekday {
          font-weight: 600;
          font-size: 0.875rem;
          padding: 8px 0 !important;
          text-transform: uppercase;
        }

        /* Adjust event badges inside tiles to fit better */
        .react-calendar-custom .react-calendar__tile > div {
          margin-top: 6px;
        }

        @media (max-width: 1024px) {
          /* Responsive tweaks */
          .react-calendar-custom .react-calendar__tile {
            height: 64px !important;
            padding: 8px 6px !important;
          }
        }

        @media (max-width: 640px) {
          .react-calendar-custom .react-calendar__tile {
            height: 56px !important;
            padding: 6px 4px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;
