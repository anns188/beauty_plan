import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Page = styled.div`
  min-height: 100vh;
  background: #faf7f4;
  color: #2b2424;
`;

const Hero = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 70px 50px 100px;

  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 50px 25px;
  }
`;

const Content = styled.div`
  max-width: 650px;
`;

const Eyebrow = styled.p`
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #9b7777;
  font-weight: 600;
  margin-bottom: 25px;
`;

const Title = styled.h1`
  font-size: clamp(52px, 6vw, 82px);
  line-height: 0.98;
  letter-spacing: -3px;
  font-weight: 600;
  margin: 0 0 30px;
`;

const Highlight = styled.span`
  color: #c28f91;
`;

const Description = styled.p`
  max-width: 520px;
  font-size: 18px;
  line-height: 1.7;
  color: #756969;
  margin-bottom: 35px;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 17px 30px;

  background: #2b2424;
  color: white;

  border-radius: 40px;

  text-decoration: none;
  font-size: 15px;
  font-weight: 500;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #423737;
  }
`;

const Services = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 55px;
  flex-wrap: wrap;
`;

const Service = styled.span`
  font-size: 14px;
  color: #756969;

  &::before {
    content: "✦";
    color: #c28f91;
    margin-right: 8px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ImageCard = styled.div`
  height: 620px;
  border-radius: 180px 180px 30px 30px;
  background: #ead9d5;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  @media (max-width: 900px) {
    height: 500px;
  }
`;

const ImagePlaceholder = styled.div`
  text-align: center;
  color: #8c7070;

  p {
    margin: 8px 0 0;
    font-size: 14px;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  left: -35px;
  bottom: 35px;

  background: white;
  padding: 20px 24px;
  border-radius: 18px;

  box-shadow: 0 15px 40px rgba(43, 36, 36, 0.12);

  @media (max-width: 900px) {
    left: 20px;
  }
`;

const FloatingTitle = styled.p`
  margin: 0 0 5px;
  font-size: 12px;
  color: #9b7777;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FloatingText = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
`;

function Home() {
  return (
    <Page>
      <Navbar />

      <Hero>
        <Content>
          <Eyebrow>Beauty planning, made simple</Eyebrow>

          <Title>
            Your beauty look,
            <br />
            <Highlight>perfectly planned.</Highlight>
          </Title>

          <Description>
            Hair, makeup, nails and more — organize everything
            you need for your special day in one beautiful plan.
          </Description>

          <Button to="/beauty-plan">
            Create my Beauty Plan →
          </Button>

          <Services>
            <Service>Hair</Service>
            <Service>Makeup</Service>
            <Service>Nails</Service>
            <Service>Brows</Service>
          </Services>
        </Content>

        <ImageWrapper>
          <ImageCard>
            <ImagePlaceholder>
              <strong>Beauty image</strong>
              <p>We will add the image here</p>
            </ImagePlaceholder>
          </ImageCard>

          <FloatingCard>
            <FloatingTitle>Your special day</FloatingTitle>
            <FloatingText>Everything in one plan ✦</FloatingText>
          </FloatingCard>
        </ImageWrapper>
      </Hero>
    </Page>
  );
}

export default Home;