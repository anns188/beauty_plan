import styled from "styled-components";

const Page = styled.div`
  min-height: 100vh;
  background: #faf7f4;
  color: #2b2424;
`;

const Container = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 40px 100px;
`;

const Header = styled.div`
  margin-bottom: 45px;
`;

const Eyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #9b7777;
  font-weight: 600;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  font-size: clamp(45px, 6vw, 70px);
  line-height: 1;
  letter-spacing: -2px;
  margin: 0 0 18px;
`;

const Description = styled.p`
  color: #756969;
  font-size: 18px;
  line-height: 1.6;
  max-width: 600px;
`;

const Section = styled.section`
  background: white;
  border-radius: 28px;
  padding: 35px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin: 0 0 25px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EventButton = styled.button<{ $selected: boolean }>`
  border: 1px solid ${({ $selected }) =>
    $selected ? "#c28f91" : "#eee5e1"};

  background: ${({ $selected }) =>
    $selected ? "#f5e6e5" : "#faf7f4"};

  color: #2b2424;

  border-radius: 18px;
  padding: 20px 12px;
  box-shadow: 0 2px 6px rgba(43, 36, 36, 0.08);

  cursor: pointer;
  font-size: 15px;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EventIcon = styled.div`
  font-size: 25px;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  width: 100%;
  max-width: 350px;

  padding: 16px 18px;

  border: 1px solid #e8dedb;
  border-radius: 15px;

  font-size: 16px;
  color: #2b2424;
  background: #faf7f4;

  outline: none;

  &:focus {
    border-color: #c28f91;
  }
`;

const Plan = styled.div`
  margin-top: 30px;
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 25px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const PlanTitle = styled.h2`
  margin: 0;
  color: #2b2424;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 3vw, 34px);
  font-weight: 500;
  letter-spacing: -0.8px;
  line-height: 1.15;
`;

const ScheduleFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  max-width: 760px;
  margin: 0 auto;

  input {
    box-sizing: border-box;
    width: 100%;
    max-width: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProviderControls = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #756969;
    font-size: 12px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProviderSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e8dedb;
  border-radius: 12px;
  background: #faf7f4;
  color: #2b2424;
  font: inherit;
  font-size: 13px;

  &:focus {
    outline: 1px solid #c28f91;
  }

  &:disabled {
    opacity: 0.55;
  }
`;

const TimePicker = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeSelect = styled.select`
  min-width: 84px;
  padding: 16px 18px;
  border: 1px solid #e8dedb;
  border-radius: 15px;
  background: #faf7f4;
  color: #2b2424;
  font: inherit;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #c28f91;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: #756969;
  font-size: 14px;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceButton = styled.button<{ $selected: boolean }>`
  padding: 18px;
  border: 1px solid ${({ $selected }) => ($selected ? "#c28f91" : "#eee5e1")};
  border-radius: 18px;
  background: ${({ $selected }) => ($selected ? "#f5e6e5" : "#faf7f4")};
  color: #2b2424;
  text-align: left;
  cursor: pointer;

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 5px;
    color: #756969;
    font-size: 13px;
  }
`;

const ScheduleNote = styled.p<{ $warning?: boolean }>`
  margin: 0 0 20px;
  color: ${({ $warning }) => ($warning ? "#9b5555" : "#756969")};
  font-size: 14px;
  line-height: 1.5;
`;

const EventLabel = styled.span`
  color: #9b7777;
  font-size: 14px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 80px 25px 1fr;
  gap: 15px;
  min-height: 100px;
`;

const Time = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-top: 5px;
`;

const TimelineLine = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;

    width: 11px;
    height: 11px;

    background: #c28f91;
    border-radius: 50%;

    top: 7px;
    left: 2px;
  }

  &::after {
    content: "";

    position: absolute;

    width: 1px;
    height: 100%;

    background: #ead9d5;

    left: 7px;
    top: 18px;
  }
`;

const Appointment = styled.div`
  padding-bottom: 30px;
  text-align: left;
`;

const ReminderButton = styled.button<{ $enabled: boolean }>`
  margin-top: 10px;
  padding: 7px 12px;
  border: 1px solid ${({ $enabled }) => ($enabled ? "#c28f91" : "#e8dedb")};
  border-radius: 18px;
  background: ${({ $enabled }) => ($enabled ? "#f5e6e5" : "white")};
  color: #756969;
  font: inherit;
  font-size: 12px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const BookingButton = styled.button<{ $booked: boolean }>`
  margin: 10px 0 0 8px;
  padding: 7px 12px;
  border: 1px solid ${({ $booked }) => ($booked ? "#b6c8b2" : "#e8dedb")};
  border-radius: 18px;
  background: ${({ $booked }) => ($booked ? "#eef4ec" : "white")};
  color: #756969;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
`;

const AppointmentTitle = styled.h3`
  margin: 0 0 5px;
  font-size: 17px;
`;

const AppointmentDescription = styled.p`
  margin: 0;
  color: #756969;
  font-size: 14px;
`;

const Summary = styled.div`
  margin-top: 20px;

  background: #2b2424;
  color: white;

  border-radius: 25px;
  padding: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SummaryText = styled.div`
  h3 {
    margin: 0 0 8px;
    font-size: 21px;
  }

  p {
    margin: 0;
    color: #d8caca;
    font-size: 14px;
  }
`;

const Ready = styled.button<{ $ready: boolean }>`
  padding: 12px 18px;
  border: 0;
  border-radius: 20px;
  background: ${({ $ready }) => ($ready ? "#c28f91" : "#756969")};
  color: white;
  font: inherit;
  font-size: 13px;
  cursor: ${({ $ready }) => ($ready ? "pointer" : "default")};

  &:disabled {
    opacity: 1;
  }
`;

const SummaryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const SaveButton = styled.button`
  padding: 12px 18px;
  border: 1px solid #d8caca;
  border-radius: 20px;
  background: white;
  color: #2b2424;
  font: inherit;
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export { Page, Container, Header, Eyebrow, Title, Description, Section, SectionTitle, EventGrid, EventButton, EventIcon, DateInput, Plan, PlanHeader, PlanTitle, ScheduleFields, ProviderControls, ProviderSelect, TimePicker, TimeSelect, Field, ServiceGrid, ServiceButton, ScheduleNote, EventLabel, Timeline, TimelineItem, Time, TimelineLine, Appointment, ReminderButton, BookingButton, AppointmentTitle, AppointmentDescription, Summary, SummaryText, Ready, SummaryActions, SaveButton };
