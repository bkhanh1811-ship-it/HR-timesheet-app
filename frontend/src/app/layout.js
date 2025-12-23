import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import "@fontsource-variable/nunito";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "HR Bạch Hổ – Hệ Thống Chấm Công",
  description:
    "Hệ thống quản lý chấm công, ca trực và nhân sự bảo vệ tập trung của Bạch Hổ Security.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={nunito.className}>
        <CssVarsProvider>
          <CssBaseline />
          <HeaderComponent />
          <main className="flex min-h-screen flex-col items-center justify-between bg-background-default">
            {children}
          </main>
          <FooterComponent />
        </CssVarsProvider>
      </body>
    </html>
  );
}
