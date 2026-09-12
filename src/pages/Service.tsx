import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Page = styled.div`
  min-height: 100vh;
  background: #faf7f4;
  color: #2b2424;
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 40px 100px;
`;

const Header = styled.div`
  max-width: 700px;
  margin-bottom: 55px;
`;

const Eyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #9b7777;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: clamp(45px, 6vw, 70px);
  line-height: 1;
  letter-spacing: -2px;
  margin: 0 0 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #756969;
  max-width: 600px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.button<{ $selected: boolean }>`
  position: relative;
  text-align: left;
  border: 1px solid
    ${({ $selected }) => ($selected ? "#c28f91" : "#eee5e1")};

  background: ${({ $selected }) => ($selected ? "#f5e6e5" : "white")};

  border-radius: 28px;
  padding: 32px;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(43, 36, 36, 0.08);
  }
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #faf0ee;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  margin-bottom: 25px;
`;

const ServiceTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 10px;
`;

const ServiceDescription = styled.p`
  color: #756969;
  line-height: 1.5;
  margin: 0;
`;

const Selected = styled.span`
  position: absolute;
  top: 25px;
  right: 25px;

  width: 28px;
  height: 28px;
  border-radius: 50%;

  background: #2b2424;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
`;

const BottomBar = styled.div`
  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 25px 30px;

  background: white;
  border-radius: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SelectedText = styled.div`
  color: #756969;

  strong {
    color: #2b2424;
  }
`;

const ContinueButton = styled(Link)`
  padding: 15px 25px;
  background: #2b2424;
  color: white;

  border-radius: 30px;
  text-decoration: none;

  text-align: center;

  transition: all 0.2s ease;

  &:hover {
    background: #423737;
    transform: translateY(-2px);
  }
`;

const services = [
  {
    id: "hair",
    icon: "✂️",
    title: "Hair",
    description: "Hairstyling, blowout, curls and more.",
  },
  {
    id: "makeup",
    icon: "💄",
    title: "Makeup",
    description: "Natural, soft glam or full glam makeup.",
  },
  {
    id: "nails",
    icon: "💅",
    title: "Nails",
    description: "Manicure, gel nails and nail art.",
  },
  {
    id: "brows",
    icon: "✨",
    title: "Brows & Lashes",
    description: "Brows, lash lift and extensions.",
  },
];

function Services() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((service) => service !== id)
        : [...current, id]
    );
  };

  return (
    <Page>
      <Navbar />

      <Container>
        <Header>
          <Eyebrow>Build your look</Eyebrow>

          <Title>What do you need for your special day?</Title>

          <Description>
            Choose the beauty services you want and we'll help you
            turn them into one organized Beauty Plan.
          </Description>
        </Header>

        <ServicesGrid>
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <ServiceCard
                key={service.id}
                $selected={isSelected}
                onClick={() => toggleService(service.id)}
              >
                {isSelected && <Selected>✓</Selected>}

                <Icon>{service.icon}</Icon>

                <ServiceTitle>{service.title}</ServiceTitle>

                <ServiceDescription>
                  {service.description}
                </ServiceDescription>
              </ServiceCard>
            );
          })}
        </ServicesGrid>

        <BottomBar>
          <SelectedText>
            <strong>{selectedServices.length}</strong>{" "}
            {selectedServices.length === 1
              ? "service selected"
              : "services selected"}
          </SelectedText>

          <ContinueButton to="/beauty-plan">
            Continue to Beauty Plan →
          </ContinueButton>
        </BottomBar>
      </Container>
    </Page>
  );
}

export default Services;