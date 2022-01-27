import '../styles/globals.css'
import '../styles/framework.css'
import '../styles/custom.css'

import type { AppProps } from 'next/app'
import Head from "next/head"
import { Toaster } from "react-hot-toast"

import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffd369',
    },
    success: {
      main: '#2e7d32',
    },
    info: {
      main: '#393e46',
    },
    secondary: {
      main: '#202024',
    },
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle Battle</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container sx={{ maxWidth: 375 }}>
          <div className="main flex flex-column mh-100">
            <Component {...pageProps} />
          </div>
        </Container>
        <Toaster
          toastOptions={{
            style: {
              background: "#393E46",
              color: "#eee",
            }
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default MyApp
