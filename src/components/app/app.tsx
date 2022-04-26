import { ThemeProvider } from 'styled-components';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from '../common/common';

import DetailedQuest from '../detailed-quest/detailed-quest';
import Contacts from '../contacts/contacts';
import Home from '../home/home';
import { appTheme } from './common';
import * as S from './app.styled';
import React from 'react';
import NotFound from '../not-found/not-found';

const App = () => (
  <ThemeProvider theme={appTheme}>
    <S.GlobalStyle />
    <Router>
      <Switch>
        <Route exact path="/detailed-quest/:id" component={DetailedQuest}/>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
