import Container from "../../components/container";
import Header from "../../components/header";
import PanelHeader from "../../components/panelHeader";

export default function Dashboard() {
  return (
    <div>
      <Header/>

      <Container>
        <PanelHeader/>
      </Container>
    </div>
  );
};