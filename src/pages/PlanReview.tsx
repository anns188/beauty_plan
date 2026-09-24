import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { providers } from "../data/providers";
import {
  ActionButton,
  Actions,
  AppointmentCard,
  AppointmentDetails,
  AppointmentHeader,
  AppointmentList,
  BookingStatus,
  Card,
  Container,
  Detail,
  Details,
  EmptyMessage,
  EventName,
  Eyebrow,
  Header,
  Page,
  ReminderNote,
  Title,
} from "./PlanReview.styles";

type ReviewPlan = {
  selectedEvent: string;
  date: string;
  eventTime?: string;
  selectedServices?: string[];
  providerAssignments?: Record<string, { providerId: string; slot: string }>;
  bookedServices?: Record<string, boolean>;
  reminders?: Record<string, boolean>;
};

const events: Record<string, string> = {
  wedding: "Wedding",
  prom: "Prom",
  birthday: "Birthday",
  other: "Other",
};

const loadPlan = (): ReviewPlan | null => {
  try {
    const storedPlan = localStorage.getItem("beauty-plan");
    if (!storedPlan) return null;

    const plan = JSON.parse(storedPlan) as ReviewPlan;
    if (typeof plan.selectedEvent !== "string" || typeof plan.date !== "string") {
      return null;
    }

    return plan;
  } catch {
    return null;
  }
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${period}`;
};

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

function PlanReview() {
  const navigate = useNavigate();
  const plan = loadPlan();
  const serviceDetails = (plan?.selectedServices ?? []).map((service) => {
    const assignment = plan?.providerAssignments?.[service];
    const provider = providers.find((item) => item.id === assignment?.providerId);
    return { service, provider, slot: assignment?.slot };
  });
  const totalDuration = serviceDetails.reduce(
    (total, item) => total + (item.provider?.duration ?? 0),
    0,
  );
  const totalPrice = serviceDetails.reduce(
    (total, item) => total + (item.provider?.price ?? 0),
    0,
  );

  return (
    <Page>
      <Navbar />
      <Container>
        <Header>
          <Eyebrow>Your beauty journey</Eyebrow>
          <Title>Plan review</Title>
        </Header>

        {!plan ? (
          <Card>
            <EmptyMessage>
              There is no saved beauty plan to review yet. Return to your planner and save a plan
              first.
            </EmptyMessage>
            <ActionButton type="button" onClick={() => navigate("/beauty-plan")}>
              Back to planner
            </ActionButton>
          </Card>
        ) : (
          <Card>
            <EventName>{events[plan.selectedEvent] ?? "Your event"}</EventName>

            <Details>
              <Detail>
                <strong>Event date</strong>
                <span>{formatDate(plan.date)}</span>
              </Detail>
              <Detail>
                <strong>Event starts</strong>
                <span>{formatTime(plan.eventTime ?? "18:00")}</span>
              </Detail>
              <Detail>
                <strong>Appointments</strong>
                <span>{serviceDetails.length}</span>
              </Detail>
              <Detail>
                <strong>Total appointment time</strong>
                <span>{formatDuration(totalDuration) || "—"}</span>
              </Detail>
              <Detail>
                <strong>Listed total</strong>
                <span>{totalPrice}</span>
              </Detail>
            </Details>

            <AppointmentList>
              {serviceDetails.map(({ service, provider, slot }) => (
                <AppointmentCard key={service}>
                  <AppointmentHeader>
                    <h3>{service}</h3>
                    <BookingStatus $booked={Boolean(plan.bookedServices?.[service])}>
                      {plan.bookedServices?.[service] ? "Booked" : "Needs booking"}
                    </BookingStatus>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <span>Provider: {provider?.name ?? "Not selected"}</span>
                    <span>
                      Time: {slot ? formatTime(slot) : "Not selected"}
                    </span>
                    <span>
                      Duration: {provider ? formatDuration(provider.duration) : "—"}
                    </span>
                    <span>Listed price: {provider?.price ?? "—"}</span>
                  </AppointmentDetails>
                  <ReminderNote>
                    {plan.reminders?.[service]
                      ? "Reminder enabled for 30 minutes before."
                      : "No reminder set."}
                  </ReminderNote>
                </AppointmentCard>
              ))}
            </AppointmentList>

            <Actions>
              <ActionButton type="button" onClick={() => navigate("/beauty-plan")}>
                Edit plan
              </ActionButton>
              <ActionButton type="button" onClick={() => window.print()}>
                Print itinerary
              </ActionButton>
            </Actions>
          </Card>
        )}
      </Container>
    </Page>
  );
}

export default PlanReview;
