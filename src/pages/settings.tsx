import Navbar from "@/components/navbar/Navbar";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { text } from "stream/consumers";

const Settings = () => {
  return (
    <Box>
      <Navbar />
      <Flex as="section" px="6rem" my="1rem">
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>Customization</Tab>
            <Tab>Notifications</Tab>

            <Tab>Advanced Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>Profile</Text>
            </TabPanel>
            <TabPanel>
              <Text>Customization</Text>
            </TabPanel>
            <TabPanel>
              <Text>Notifications</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default Settings;
