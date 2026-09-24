import styled from "styled-components";

const Page = styled.div`
  min-height: 100vh;
  background: #faf7f4;
  color: #2b2424;
`;

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 32px 90px;
`;

const Header = styled.header`
  margin-bottom: 28px;
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #9b7777;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 5vw, 54px);
  font-weight: 500;
  letter-spacing: -1.5px;
`;

const Card = styled.section`
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid #f0e7e3;
  border-radius: 28px;
  background: white;
  box-shadow: 0 12px 35px rgba(43, 36, 36, 0.06);
  text-align: left;
`;

const EventName = styled.h2`
  margin: 0 0 24px;
  font-size: 25px;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding-bottom: 26px;
  border-bottom: 1px solid #f0e7e3;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Detail = styled.div`
  strong,
  span {
    display: block;
  }

  strong {
    margin-bottom: 5px;
    color: #9b7777;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  span {
    font-size: 16px;
  }
`;

const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 25px;
`;

const AppointmentCard = styled.article`
  padding: 20px;
  border: 1px solid #eee5e1;
  border-radius: 18px;
  background: #fdfbf9;
`;

const AppointmentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const BookingStatus = styled.span<{ $booked: boolean }>`
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 16px;
  background: ${({ $booked }) => ($booked ? "#eef4ec" : "#f5e6e5")};
  color: #756969;
  font-size: 12px;
`;

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  span {
    color: #756969;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ReminderNote = styled.p`
  margin: 14px 0 0;
  color: #9b7777;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 25px;
`;

const ActionButton = styled.button`
  padding: 13px 19px;
  border: 1px solid #e8dedb;
  border-radius: 22px;
  background: #2b2424;
  color: white;
  font: inherit;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #4a3c3c;
  }
`;

const EmptyMessage = styled.p`
  margin: 0 0 20px;
  color: #756969;
  line-height: 1.6;
`;

export {
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
};
