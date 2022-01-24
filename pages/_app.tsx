import '../styles/globals.css'
import '../styles/framework.css'
import '../styles/custom.css'

import type { AppProps } from 'next/app'
import Head from "next/head"
import { SWRConfig } from 'swr';
import fetcher from "../lib/fetcher"
import { Toaster } from "react-hot-toast"

import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle Battle</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher
        }}
      >
        <Container maxWidth="xs">
          <div className="main flex flex-column mh-100">
            <Component {...pageProps} />
          </div>
        </Container>
        <Toaster
          toastOptions={{
            style: {
              background: "#393E46",
              color: "#eee"
            }
          }}
        />
      </SWRConfig>
    </>
  )
}

export default MyApp
