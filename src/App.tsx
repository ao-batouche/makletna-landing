import { Router, Route, Switch } from "wouter";
import { LanguageProvider } from "./LanguageContext";
import LandingPage from "./LandingPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import PartnersPage from "./pages/PartnersPage";
import InvestPage from "./pages/InvestPage";
import NotFound from "./pages/not-found";
import { Seo } from "./Seo";

function App() {
  return (
    <LanguageProvider>
      <Router base="/">
        <Seo />
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/invest" component={InvestPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </LanguageProvider>
  );
}

export default App;
