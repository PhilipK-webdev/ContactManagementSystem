import { PanelManagementPage } from "./components/PanelManagementPage";
import GlobalStyles from "./style/globalStyle";
import styled from "styled-components";
function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <PanelManagementPage />
      </AppContainer>
    </>
  );
}

const AppContainer = styled.main`
  display: flex;
  padding: 10px;
  flex-direction: column;
  height: 100vh;
`;

export default App;
