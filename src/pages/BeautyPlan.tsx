import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Appointment,
  AppointmentDescription,
  AppointmentTitle,
  BookingButton,
  Container,
  DateInput,
  Description,
  EventButton,
  EventGrid,
  EventIcon,
  EventLabel,
  Eyebrow,
  Field,
  Header,
  Page,
  Plan,
  PlanHeader,
  PlanTitle,
  ProviderControls,
  ProviderSelect,
  Ready,
  ReminderButton,
  SaveButton,
  ScheduleFields,
  ScheduleNote,
  Section,
  SectionTitle,
  ServiceButton,
  ServiceGrid,
  Summary,
  SummaryActions,
  SummaryText,
  Time,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  TimelineLine,
  Title,
} from "./BeautyPlan.styles";
import { providers } from "../data/providers";
const events = [
  {
    id: "wedding",
    icon: "💍",
    name: "Wedding",
  },
  {
    id: "prom",
    icon: "✨",
    name: "Prom",
  },
  {
    id: "birthday",
    icon: "🎂",
    name: "Birthday",
  },
  {
    id: "other",
    icon: "♡",
    name: "Other",
  },
];

const appointments = [
  {
    title: "Nails",
    description: "Manicure & gel nails",
    duration: 60,
  },
  {
    title: "Brows & Lashes",
    description: "Brows & lash lift",
    duration: 45,
  },
  {
    title: "Makeup",
    description: "Soft glam makeup",
    duration: 60,
  },
  {
    title: "Hair",
    description: "Special occasion hairstyle",
    duration: 90,
  },
];

type SavedPlan = {
  selectedEvent: string;
  date: string;
  eventTime?: string;
  bufferMinutes?: number;
  selectedServices?: string[];
  providerAssignments?: ProviderAssignments;
  bookedServices?: Record<string, boolean>;
  reminders: Record<string, boolean>;
};

type ProviderAssignment = {
  providerId: string;
  slot: string;
};

type ProviderAssignments = Record<string, ProviderAssignment>;

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return [
    hours > 0 ? `${hours} hr` : "",
    remainingMinutes > 0 ? `${remainingMinutes} min` : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const createDefaultProviderAssignments = (bufferMinutes: number): ProviderAssignments => {
  let nextAvailableTime = 0;

  return appointments.reduce<ProviderAssignments>((assignments, appointment) => {
    const serviceProviders = providers.filter(
      (provider) => provider.service === appointment.title,
    );
    const options = serviceProviders
      .flatMap((provider) =>
        provider.availableSlots.map((slot) => ({
          provider,
          slot,
          startMinutes: toMinutes(slot),
        })),
      )
      .filter((option) => option.startMinutes >= nextAvailableTime)
      .sort((a, b) => a.startMinutes - b.startMinutes);
    const chosen = options[0] ?? {
      provider: serviceProviders[0],
      slot: serviceProviders[0]?.availableSlots[0] ?? "",
      startMinutes: 0,
    };

    if (chosen.provider) {
      assignments[appointment.title] = {
        providerId: chosen.provider.id,
        slot: chosen.slot,
      };
      nextAvailableTime = chosen.startMinutes + chosen.provider.duration + bufferMinutes;
    }

    return assignments;
  }, {});
};

const buildSchedule = (
  selectedServices: string[],
  providerAssignments: ProviderAssignments,
) => {
  const selected = appointments.filter((appointment) =>
    selectedServices.includes(appointment.title),
  );

  return selected
    .map((appointment) => {
      const assignment = providerAssignments[appointment.title];
      const selectedProvider = providers.find(
        (provider) => provider.id === assignment?.providerId,
      );
      const provider =
        selectedProvider?.service === appointment.title ? selectedProvider : undefined;
      const slot = provider?.availableSlots.includes(assignment?.slot ?? "")
        ? assignment?.slot
        : provider?.availableSlots[0];
      const startMinutes = slot ? toMinutes(slot) : -1;
      const duration = provider?.duration ?? appointment.duration;
      const endMinutes = startMinutes + duration;
      const scheduledAppointment = {
        ...appointment,
        provider,
        slot,
        duration,
        startMinutes,
        endMinutes,
        startTime: startMinutes >= 0 ? formatTime(startMinutes) : "",
        endTime: formatTime(endMinutes),
      };
      return scheduledAppointment;
    })
    .sort((a, b) => a.startMinutes - b.startMinutes);
};

const loadSavedPlan = (): SavedPlan | null => {
  try {
    const saved = localStorage.getItem("beauty-plan");
    if (!saved) return null;

    const plan = JSON.parse(saved) as SavedPlan;
    if (
      typeof plan.selectedEvent !== "string" ||
      typeof plan.date !== "string" ||
      typeof plan.reminders !== "object" ||
      plan.reminders === null
    ) {
      return null;
    }

    return plan;
  } catch {
    return null;
  }
};

function BeautyPlan() {
  const navigate = useNavigate();
  const [savedPlan, setSavedPlan] = useState(loadSavedPlan);
  const [selectedEvent, setSelectedEvent] = useState(
    savedPlan?.selectedEvent ?? "wedding",
  );
  const [date, setDate] = useState(savedPlan?.date ?? "");
  const [eventTime, setEventTime] = useState(savedPlan?.eventTime ?? "18:00");
  const [bufferMinutes, setBufferMinutes] = useState(savedPlan?.bufferMinutes ?? 15);
  const [selectedServices, setSelectedServices] = useState(
    savedPlan?.selectedServices ?? appointments.map((appointment) => appointment.title),
  );
  const [providerAssignments, setProviderAssignments] = useState<ProviderAssignments>(
    savedPlan?.providerAssignments ?? createDefaultProviderAssignments(savedPlan?.bufferMinutes ?? 15),
  );
  const [reminders, setReminders] = useState<Record<string, boolean>>(
    savedPlan?.reminders ?? {},
  );
  const [bookedServices, setBookedServices] = useState<Record<string, boolean>>(
    savedPlan?.bookedServices ?? {},
  );
  const [isSaved, setIsSaved] = useState(Boolean(savedPlan));
  const [eventHour, eventMinute] = eventTime.split(":").map(Number);
  const displayHour = eventHour % 12 || 12;
  const period = eventHour >= 12 ? "PM" : "AM";
  const minuteOptions = [
    ...new Set([
      ...Array.from({ length: 12 }, (_, index) => index * 5),
      eventMinute,
    ]),
  ].sort((a, b) => a - b);
  const scheduledAppointments = buildSchedule(
    selectedServices,
    providerAssignments,
  );
  const scheduleFits =
    scheduledAppointments.length > 0 &&
    scheduledAppointments.every((appointment, index) => {
      const nextAppointment = scheduledAppointments[index + 1];
      return (
        appointment.provider !== undefined &&
        appointment.startMinutes >= 0 &&
        appointment.endMinutes <= toMinutes(eventTime) &&
        (!nextAppointment ||
          appointment.endMinutes + bufferMinutes <= nextAppointment.startMinutes)
      );
    });

  useEffect(() => {
    const schedule = buildSchedule(
      selectedServices,
      providerAssignments,
    );
    const timers = schedule.flatMap((appointment) => {
      if (
        !reminders[appointment.title] ||
        !date ||
        !scheduleFits ||
        !appointment.provider
      ) {
        return [];
      }

      const appointmentDate = new Date(`${date}T${appointment.startTime}:00`);
      const reminderTime = Math.max(
        Date.now(),
        appointmentDate.getTime() - 30 * 60 * 1000,
      );

      if (appointmentDate.getTime() <= Date.now()) return [];

      const timer = window.setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification(`${appointment.title} appointment reminder`, {
            body: `Your appointment is at ${appointment.startTime}.`,
          });
        }
        setReminders((current) => ({
          ...current,
          [appointment.title]: false,
        }));
        setIsSaved(false);
      }, reminderTime - Date.now());

      return [timer];
    });

    return () => timers.forEach(window.clearTimeout);
  }, [
    date,
    eventTime,
    bufferMinutes,
    selectedServices,
    providerAssignments,
    reminders,
    scheduleFits,
  ]);

  const toggleReminder = async (appointmentTitle: string, time: string) => {
    if (reminders[appointmentTitle]) {
      setReminders((current) => ({ ...current, [appointmentTitle]: false }));
      setIsSaved(false);
      return;
    }

    if (!date || !scheduleFits || !("Notification" in window)) return;

    const appointmentDate = new Date(`${date}T${time}:00`);
    if (appointmentDate.getTime() <= Date.now()) return;

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setReminders((current) => ({ ...current, [appointmentTitle]: true }));
      setIsSaved(false);
    }
  };

  const savePlan = () => {
    if (!date) return false;

    const plan = {
      selectedEvent,
      date,
      eventTime,
      bufferMinutes,
      selectedServices,
      reminders,
      bookedServices,
      providerAssignments,
    };
    try {
      localStorage.setItem("beauty-plan", JSON.stringify(plan));
      setSavedPlan(plan);
      setIsSaved(true);
      return true;
    } catch {
      setIsSaved(false);
      return false;
    }
  };

  const updateProvider = (service: string, providerId: string) => {
    const provider = providers.find((item) => item.id === providerId);
    if (!provider) return;

    setProviderAssignments((current) => ({
      ...current,
      [service]: {
        providerId,
        slot: provider.availableSlots[0] ?? "",
      },
    }));
    setBookedServices((current) => ({ ...current, [service]: false }));
    setReminders((current) => ({ ...current, [service]: false }));
    setIsSaved(false);
  };

  const updateProviderSlot = (service: string, slot: string) => {
    setProviderAssignments((current) => {
      const assignment = current[service];
      if (!assignment) return current;
      return { ...current, [service]: { ...assignment, slot } };
    });
    setBookedServices((current) => ({ ...current, [service]: false }));
    setReminders((current) => ({ ...current, [service]: false }));
    setIsSaved(false);
  };

  const updateEventTime = (hour: number, minute: number, meridiem: string) => {
    const hour24 = (hour % 12) + (meridiem === "PM" ? 12 : 0);
    setEventTime(
      `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    );
    setIsSaved(false);
  };

  const selectedEventName =
    events.find((event) => event.id === selectedEvent)?.name;
  const bookedCount = scheduledAppointments.filter(
    (appointment) => bookedServices[appointment.title],
  ).length;
  const unbookedCount = scheduledAppointments.length - bookedCount;
  const isPlanReady = Boolean(date && scheduleFits && unbookedCount === 0);

  return (
    <Page>
      <Navbar />

      <Container>
        <Header>
          <Eyebrow>Your beauty journey</Eyebrow>

          <Title>Let's create your Beauty Plan.</Title>

          <Description>
            Tell us about your special day and we'll organize
            your beauty appointments into one simple plan.
          </Description>
        </Header>

        <Section>
          <SectionTitle>What is the occasion?</SectionTitle>

          <EventGrid>
            {events.map((event) => (
              <EventButton
                key={event.id}
                $selected={selectedEvent === event.id}
                onClick={() => {
                  setSelectedEvent(event.id);
                  setIsSaved(false);
                }}
              >
                <EventIcon>{event.icon}</EventIcon>

                {event.name}
              </EventButton>
            ))}
          </EventGrid>
        </Section>

        <Section>
          <SectionTitle>When is your special day?</SectionTitle>

          <ScheduleFields>
            <Field>
              Event date
              <DateInput
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setIsSaved(false);
                }}
              />
            </Field>
            <Field>
              Event starts at
              <TimePicker>
                <TimeSelect
                  aria-label="Event start hour"
                  value={displayHour}
                  onChange={(event) =>
                    updateEventTime(Number(event.target.value), eventMinute, period)
                  }
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </TimeSelect>
                <span>:</span>
                <TimeSelect
                  aria-label="Event start minute"
                  value={eventMinute}
                  onChange={(event) =>
                    updateEventTime(displayHour, Number(event.target.value), period)
                  }
                >
                  {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {String(minute).padStart(2, "0")}
                    </option>
                  ))}
                </TimeSelect>
                <TimeSelect
                  aria-label="Event start AM or PM"
                  value={period}
                  onChange={(event) =>
                    updateEventTime(displayHour, eventMinute, event.target.value)
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </TimeSelect>
              </TimePicker>
            </Field>
          </ScheduleFields>
        </Section>

        <Section>
          <SectionTitle>Which services would you like?</SectionTitle>
          <ScheduleNote>
            Choose the appointments you want. The suggested schedule places them before your event,
            with {bufferMinutes} minutes between each appointment. Provider slots are sample
            availability and are not filtered by date.
          </ScheduleNote>
          <ServiceGrid>
            {appointments.map((appointment) => {
              const selected = selectedServices.includes(appointment.title);
              return (
                <ServiceButton
                  key={appointment.title}
                  type="button"
                  $selected={selected}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedServices((current) =>
                      selected
                        ? current.filter((title) => title !== appointment.title)
                        : [...current, appointment.title],
                    );
                    if (selected) {
                      setBookedServices((current) => ({
                        ...current,
                        [appointment.title]: false,
                      }));
                      setReminders((current) => ({
                        ...current,
                        [appointment.title]: false,
                      }));
                    }
                    setIsSaved(false);
                  }}
                >
                  <strong>{appointment.title}</strong>
                  <span>
                    {appointment.description} · {appointment.duration} min
                  </span>
                </ServiceButton>
              );
            })}
          </ServiceGrid>
          <Field style={{ marginTop: 20 }}>
            Time between appointments (minutes)
            <DateInput
              type="number"
              min="0"
              max="120"
              step="5"
              value={bufferMinutes}
              onChange={(event) => {
                setBufferMinutes(Math.min(120, Math.max(0, Number(event.target.value))));
                setIsSaved(false);
              }}
            />
          </Field>
        </Section>

        <Plan>
          <PlanHeader>
            <PlanTitle>Your Beauty Timeline</PlanTitle>

            <EventLabel>
              {selectedEventName}
              {date ? ` · ${date}` : ""}
              {date ? ` · ${eventTime}` : ""}
            </EventLabel>
          </PlanHeader>

          <Section>
            {!scheduleFits && (
              <ScheduleNote $warning>
                {scheduledAppointments.length === 0
                  ? "Choose at least one service to build your schedule."
                  : "The selected provider times overlap, leave too little break, or fall after your event. Choose different slots or a later event time."}
              </ScheduleNote>
            )}
            {scheduleFits && (
                <ScheduleNote>
                Suggested schedule · {formatDuration(
                  scheduledAppointments.reduce(
                    (total, appointment) => total + appointment.duration,
                    0,
                  ),
                )} of appointments
              </ScheduleNote>
            )}
            <Timeline>
              {scheduledAppointments.map((appointment) => (
                <TimelineItem key={appointment.title}>
                  <Time>
                    {scheduleFits
                      ? `${appointment.startTime}–${appointment.endTime}`
                      : "—"}
                  </Time>

                  <TimelineLine />

                  <Appointment>
                    <AppointmentTitle>
                      {appointment.title}
                    </AppointmentTitle>

                    <AppointmentDescription>
                      {appointment.description} · {appointment.duration} min
                    </AppointmentDescription>

                    <ProviderControls>
                      <label>
                        Provider
                        <ProviderSelect
                          value={appointment.provider?.id ?? ""}
                          onChange={(event) =>
                            updateProvider(appointment.title, event.target.value)
                          }
                        >
                          <option value="">Choose a provider</option>
                          {providers
                            .filter((provider) => provider.service === appointment.title)
                            .map((provider) => (
                              <option key={provider.id} value={provider.id}>
                                {provider.name} · {provider.price}
                              </option>
                            ))}
                        </ProviderSelect>
                      </label>
                      <label>
                        Available time
                        <ProviderSelect
                          value={appointment.slot ?? ""}
                          disabled={!appointment.provider}
                          onChange={(event) =>
                            updateProviderSlot(appointment.title, event.target.value)
                          }
                        >
                          {appointment.provider?.availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </ProviderSelect>
                      </label>
                    </ProviderControls>

                    <ReminderButton
                      type="button"
                      $enabled={Boolean(reminders[appointment.title])}
                      disabled={
                        !reminders[appointment.title] &&
                        (!date || !scheduleFits || !("Notification" in window))
                      }
                      onClick={() =>
                        void toggleReminder(appointment.title, appointment.startTime)
                      }
                    >
                      {reminders[appointment.title]
                        ? "Reminder set · 30 min before"
                        : "Remind me"}
                    </ReminderButton>
                    <BookingButton
                      type="button"
                      $booked={Boolean(bookedServices[appointment.title])}
                      aria-pressed={Boolean(bookedServices[appointment.title])}
                      onClick={() => {
                        setBookedServices((current) => ({
                          ...current,
                          [appointment.title]: !current[appointment.title],
                        }));
                        setIsSaved(false);
                      }}
                    >
                      {bookedServices[appointment.title] ? "Booked ✓" : "Mark as booked"}
                    </BookingButton>
                  </Appointment>
                </TimelineItem>
              ))}
            </Timeline>
          </Section>
        </Plan>

        <Summary>
          <SummaryText>
            <h3>Your beauty look is coming together ✨</h3>

            <p>
              {bookedCount} of {scheduledAppointments.length} appointments marked booked.
              {unbookedCount > 0
                ? ` ${unbookedCount} still to confirm with providers.`
                : " Your appointments are all marked booked."}
            </p>
          </SummaryText>

          <SummaryActions>
            <Ready
              type="button"
              $ready={isPlanReady}
              disabled={!isPlanReady}
              onClick={() => {
                if (isPlanReady && savePlan()) navigate("/plan-review");
              }}
            >
              {!date
                ? "Choose a date"
                : !scheduleFits
                  ? "Adjust schedule"
                  : unbookedCount > 0
                    ? `${unbookedCount} to book`
                    : "Plan ready"}
            </Ready>
            <SaveButton
              type="button"
              disabled={!date || !scheduleFits}
              onClick={savePlan}
            >
              {isSaved ? "Plan saved ✓" : "Save plan"}
            </SaveButton>
          </SummaryActions>
        </Summary>
      </Container>
    </Page>
  );
}

export default BeautyPlan;
