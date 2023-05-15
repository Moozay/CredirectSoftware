import React from 'react'

// Routings
import { HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import ProtectedRoutes from "ProtectedRoutes"

// Pages & Components
import Index from "components/Index"
import Dashboard from "Layouts/Dashboard"
import Auth from "Layouts/Auth";
import Login from "components/Auth/Login/Login";
import Profile from "components/User/Profile"


// Contexts & Providers
import {GlobalProvider} from "context/GlobalContext"
import { AuthContext, AuthConsumer, AuthProvider } from 'context/JWTAuthContext'
import { Flex, Spinner } from '@chakra-ui/react'
import PublicRoute from 'components/Auth/PublicRoute'
import Authenticated from 'components/Auth/Authenticated'
import Users from 'components/Admin/Users/Users'
import Prospects from 'components/Prospects/Prospects'
import Prospect from 'components/Prospects/Prospect/Prospect'


import DemandeCredit from 'components/Credits/DemandeCredit/DemandeCredit'
import Clients from 'components/Clients/Clients'
import Client from 'components/Clients/Client/Client'
import Panel from 'components/Dashboard/Panel'
import Demandes from 'components/Demandes/Demandes'
import Honnaires from 'components/Honnaires/Honnaires'
import UpdateContext from 'components/Demandes/UpdateRecord/ViewProspect'
import AuthRoute from 'components/Auth/AuthRoute'
import ViewProspect from 'components/Demandes/UpdateRecord/ViewProspect'

const App = () => {
  return (
    <>
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {(auth) => !auth.isInitialized ? (
            <Flex
              height="100vh"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner 
                thickness="4px"
                speed='0.65s'
                emptyColor='#f7941e'
                color="blue.800"
                size="xl"
              />
            </Flex>
          ) : (
            <Routes>
              <Route path="/" exact element={<Authenticated><Navigate to ="dashboard/metrics" replace /></Authenticated>}/>
              <Route path="*" exact element={<Navigate to ="/" replace />}/>
              
              <Route path="dashboard" element={<Authenticated><Dashboard/></Authenticated>}>
                  <Route path="metrics" exact element={<Authenticated><Panel/></Authenticated>}/>
                  <Route element={<AuthRoute allowedRoles={["Manager","Admin"]}/>}>
                    <Route path="users" element={<Authenticated><Users/></Authenticated>}/>
                  </Route>
                  <Route path="profile" element={<Authenticated><Profile/></Authenticated>}/>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager","Admin"]}/>}>
                    <Route path="clients" exact element={<Authenticated><Clients/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager"]}/>}>
                    <Route path="client" exact element={<Authenticated><Client/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Admin","Manager"]}/>}>
                  < Route path="prospects" exact element={<Authenticated><Prospects/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Admin","Manager"]}/>}>
                  <Route path="prospect" exact element={<Authenticated><Prospect/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager","Admin"]}/>}>
                    <Route path="demandeCredit" exact element={<Authenticated><DemandeCredit/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager","Admin"]}/>}>
                    <Route path="demandes" exact element={<Authenticated><Demandes/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager","Admin"]}/>}>
                    <Route path="honnaires" exact element={<Authenticated><Honnaires/></Authenticated>}/>
                  </Route>
                  <Route element={<AuthRoute allowedRoles={["Agent","Manager","Admin"]}/>}>
                    <Route path="viewProspect" exact element={<Authenticated><ViewProspect/></Authenticated>}/>
                  </Route>
                 
              </Route>

              <Route path="auth" element={<Auth />}>
                <Route path="login" element={<PublicRoute><Login/></PublicRoute>} />
              </Route>
            </Routes>
          )
          }  
        </AuthConsumer>
      </Router>
    
    </AuthProvider>
    </>
  )
}

export default App