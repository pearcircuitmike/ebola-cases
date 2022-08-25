import Head from "next/head";
import { csv } from "csvtojson";
import {
  Container,
  Heading,
  Flex,
  Text,
  Box,
  Spacer,
  Button,
  Center,
  Input,
  InputGroup,
  InputAddon,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { colors } from "../../styles/colors.js";

export const getStaticProps = async () => {
  const date = Math.floor(new Date().getTime() / 1000);
  const url = `https://www.cdc.gov/wcms/vizdata/poxvirus/monkeypox/data/USmap_counts.csv?${date} `;

  const res = await fetch(url);
  const text = await res.text();
  const data = await csv().fromString(text);

  return {
    props: { stateVals: data },
  };
};

const States = ({ stateVals }) => {
  const [stateFilter, setStateFilter] = useState("");
  const handleSearch = (event) => setStateFilter(event.target.value);

  return (
    <>
      <Head>
        <title>Monkeypox Tracker | States</title>
        <meta
          name="description"
          content="Monkeypox case counts, deaths, confirmed cases, and new cases for U.S. states."
        />

        <meta property="og:title" content="Monkeypox Tracker | FAQ" />
        <meta
          property="og:description"
          content="Monkeypox case counts, deaths, confirmed cases, and new cases for U.S. states."
        />

        <meta property="og:url" content="https://monkeypoxtracker.net/" />
        <meta
          property="og:image"
          content="https://monkeypoxtracker.net/socialImg.png"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="Monkeypox case counts, deaths, confirmed cases, and new cases for U.S. states."
        />
        <meta
          property="twitter:image"
          content="https://monkeypoxtracker.net/socialImg.png"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4489327921275613"
          crossOrigin="anonymous"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DFXC4Y1G0E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());

       gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`,
          }}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="5xl">
        <HStack mt={10}>
          <Heading>All States </Heading>
          <Spacer />

          <Link href={"/countries"}>
            <Button
              size="sm"
              style={{ backgroundColor: `${colors.yellowGreen}` }}
            >
              View countries
            </Button>
          </Link>
        </HStack>

        <Text mt={5}>
          Select a state to view more details about their Monkeypox situation.
          Each state has a situation report, automatically generated from the
          most recent data. You can also view graphs of the disease activity in
          each state, and review data in tabular form. Data is sourced from Our
          World In Data and the US CDC.
        </Text>

        <InputGroup mt={5}>
          <Input
            variant="outline"
            value={stateFilter}
            onChange={handleSearch}
            placeholder="Search by state name"
          />
          <InputRightElement mr={3}>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>

        {stateVals
          .filter((state) =>
            state.Location.toLowerCase().includes(stateFilter.toLowerCase())
          )
          .map((stateVal) => (
            <Box
              key={stateVal.Location}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              pt={2}
              pb={3}
              pr={10}
              pl={10}
              mt={5}
            >
              <Flex spacing={8} direction="row">
                <Center>
                  <div>
                    <Heading size="md" mt={1}>
                      {stateVal.Location}
                    </Heading>
                    <Text>
                      Currently active cases:{" "}
                      {parseInt(stateVal.Cases).toLocaleString()}
                    </Text>
                  </div>
                </Center>

                <Spacer />
                <Center>
                  <Link href={"/states/" + stateVal.Location}>
                    <Button>
                      <a>View data</a>
                    </Button>
                  </Link>
                </Center>
              </Flex>
            </Box>
          ))}
      </Container>
    </>
  );
};

export default States;
