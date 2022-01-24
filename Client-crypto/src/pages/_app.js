import "~/styles/globals.css";
import "~/styles/coins.css";
import Layout from "~/components/Layout";
import { RouteGuard } from "~/components/auth/routeGuard";

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Layout>
  );
}

export default MyApp;
