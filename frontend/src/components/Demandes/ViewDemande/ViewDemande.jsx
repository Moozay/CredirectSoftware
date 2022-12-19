import React, {useEffect, useState, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ViewDonneesPersonnelles from './ViewDonneesPersonnelles/ViewDonneesPersonnelles'
import ViewDonneesCredit from './ViewDonneesCredit/ViewDonneesCredit'
import ViewDonneesBancaires from './ViewDonneesBancaires/ViewDonneesBancaires'
const ViewDemande = () =>{
const location = useLocation()
const id = location.state.id
    return(
        <Tabs isFitted isLazy>
            <TabList mb='1em'>
                <Tab>Donnees Personnelles</Tab>
                <Tab>Donnees Bancaires</Tab>
                <Tab>Donnees Credit</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <ViewDonneesPersonnelles/>
                </TabPanel>
                <TabPanel>
                <ViewDonneesBancaires/>
                </TabPanel>
                <TabPanel>
                <ViewDonneesCredit/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ViewDemande