import styled from "styled-components";
import Navbar from "../components/Navbar";

const Page = styled.div`
  min-height: 100vh;
  background: #faf7f5;
`;

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 40px;
`;

function BeautyPlan() {
  return (
    <Page>
      <Navbar />

      <Container>
        <h1>Your Beauty Plan</h1>

        <p>
          Plan your complete beauty look for your special day.
        </p>
      </Container>
    </Page>
  );
}

export default BeautyPlan;