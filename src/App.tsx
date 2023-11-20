import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/PageLayout/PageLayout";
import AllCollections, {
  urlPath as allCollectionsPath,
} from "./pages/AllCollections/AllCollections";
import UpcomingCollections, {
  urlPath as upcomingCollectionsPath,
} from "./pages/UpcomingCollections/UpcomingCollections";
import ContactUs, {
  urlPath as contactUsPath,
} from "./pages/ContactUs/ContactUs";
import PrivacyAndTerms, {
  urlPath as privacyAndTermsPath,
} from "./pages/PrivacyAndTerms/PrivacyAndTerms";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route
          path={upcomingCollectionsPath}
          element={<UpcomingCollections />}
        />
        <Route path={contactUsPath} element={<ContactUs />} />
        <Route path={privacyAndTermsPath} element={<PrivacyAndTerms />} />
        <Route path={allCollectionsPath} element={<AllCollections />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
