"use client"

import { useState, useEffect } from "react"
import { getClasses, getLocations, MindBodyClass } from "@/lib/mindbody-api"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface Location {
  Id: number
  Name: string
}

export default function SchedulePage() {
  const [classes, setClasses] = useState<MindBodyClass[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true)
      const startDate = new Date(currentDate)
      const endDate = new Date(currentDate)
      endDate.setDate(endDate.getDate() + 6)

      const formattedStartDate = `${startDate.getFullYear()}-${(
        startDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`
      const formattedEndDate = `${endDate.getFullYear()}-${(
        endDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`

      const { classes } = await getClasses({
        startDateTime: formattedStartDate,
        endDateTime: formattedEndDate,
        hideCanceled: true,
        locationIds:
          selectedLocation !== "all"
            ? [parseInt(selectedLocation)]
            : undefined,
      })
      setClasses(classes)
      setIsLoading(false)
    }

    const fetchLocations = async () => {
      const locations = await getLocations()
      setLocations(locations)
    }

    fetchSchedule()
    fetchLocations()
  }, [currentDate, selectedLocation])

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const groupedClasses = classes.reduce(
    (acc, cls) => {
      const date = new Date(cls.StartDateTime).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(cls)
      return acc
    },
    {} as Record<string, MindBodyClass[]>,
  )

  // Sort classes within each day by start time
  for (const date in groupedClasses) {
    groupedClasses[date].sort(
      (a, b) =>
        new Date(a.StartDateTime).getTime() -
        new Date(b.StartDateTime).getTime(),
    )
  }

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentDate)
    day.setDate(day.getDate() + i)
    return day
  })

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Class Schedule
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Book your favorite classes with ease.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location.Id} value={location.Id.toString()}>
                  {location.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handlePreviousWeek}>
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Previous Week
          </Button>
          <Button variant="outline" onClick={handleNextWeek}>
            Next Week
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {days.map(day => {
            const dateKey = day.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            const dayClasses = groupedClasses[dateKey] || []
            const displayDate = day.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })

            return (
              <div key={dateKey}>
                <h2 className="text-xl font-semibold mb-2 border-b pb-2">
                  {displayDate}
                </h2>
                <div className="divide-y">
                  {dayClasses.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-y-2 gap-x-4 items-center py-4 font-semibold text-gray-500 dark:text-gray-400">
                        <div className="md:col-span-1">Time</div>
                        <div className="md:col-span-1">Class</div>
                        <div className="md:col-span-1">Teacher</div>
                        <div className="md:col-span-1">Location</div>
                        <div className="md:col-span-1">Spots Left</div>
                        <div className="md:col-span-1 text-left md:text-right" />
                      </div>
                      {dayClasses.map(cls => {
                        const startTime = new Date(
                          cls.StartDateTime,
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })
                        const endTimeParts = new Date(cls.EndDateTime)
                          .toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })
                          .split(" ")
                        const spotsLeft = (() => {
                          const capacity =
                            cls.WebCapacity ?? cls.MaxCapacity ?? 0
                          const booked = cls.TotalBooked ?? 0
                          const open = capacity - booked
                          if (
                            cls.WebCapacity === null &&
                            cls.MaxCapacity === null
                          ) {
                            return "N/A"
                          }
                          return Math.max(0, open)
                        })()

                        const classEnd = new Date(cls.EndDateTime)
                        const isCompleted = classEnd < new Date()

                        return (
                          <div
                            key={cls.Id}
                            className="grid grid-cols-1 md:grid-cols-6 gap-y-2 gap-x-4 items-center py-4"
                          >
                            <div className="md:col-span-1">
                              <p className="font-medium">
                                {startTime} - {endTimeParts[0]}
                              </p>
                            </div>
                            <div className="md:col-span-1 font-semibold">
                              {cls.ClassDescription.Name.replace(/\+/g, " + ")}
                            </div>
                            <div className="md:col-span-1">
                              {cls.Staff.Name}
                            </div>
                            <div className="md:col-span-1">
                              {cls.Location.Name}
                            </div>
                            <div className="md:col-span-1">{spotsLeft}</div>
                            <div className="md:col-span-1 text-left md:text-right">
                              {isCompleted ? (
                                <Button
                                  size="sm"
                                  disabled
                                  className="bg-gray-400 text-white"
                                >
                                  Completed
                                </Button>
                              ) : (
                                <Button
                                  asChild
                                  size="sm"
                                  className="gradient-sage text-white hover:opacity-90"
                                  disabled={spotsLeft === 0}
                                >
                                  <a
                                    href={`https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=-7&sView=day&sLoc=${
                                      cls.Location.Id
                                    }&sTrn=0&sDate=${
                                      new Date(cls.StartDateTime).getMonth() + 1
                                    }%2f${new Date(
                                      cls.StartDateTime,
                                    ).getDate()}%2f${new Date(
                                      cls.StartDateTime,
                                    ).getFullYear()}&sClassid=${cls.Id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="uppercase"
                                  >
                                    {spotsLeft === 0 ? "Full" : "Sign Up"}
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="py-4 text-gray-500">
                      We&apos;re sorry, there are no more classes today.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}