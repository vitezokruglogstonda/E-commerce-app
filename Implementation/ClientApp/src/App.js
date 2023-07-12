import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer ,PrivateRoute} from './components'
import {userContext} from './context/user_context'
import { authenticationService } from './services';
import {Role} from './helpers'
import axios from "axios";
import { authHeader } from './helpers';

import {
  Home,
  SingleProduct,
  Error,
  About,
  ProductsPageProzori,
  LoginPage,
  RegPage,
  AdminPage,
  ProdavacPage,
  ProdavacDodajPage,
  PosetilacPage,
  ForgetPage,
  ResetPage,
  MakeAdminPage,
  UserResetPage,
  ChangeAccountInfoPage,
  UserProductsPage,
  ProdavacIzmeniPage,
  DeleteNalog,
  ProdavacProfile,ProductsPageVrata,SearchPage,InformisiPage
} from './pages'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        currentUser: null,
        isAdmin: false,
        isPosetilac:false,
        isProdavac:false
    };
}

componentDidMount() {
  authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.tipKorisnika === Role.Admin,
      isPosetilac: x && x.tipKorisnika === Role.Posetilac,
      isProdavac: x && x.tipKorisnika === Role.Prodavac
  }));
}

logout() {   
  axios.put(`https://localhost:5001/Nalog/Logout/`,null,
  {
    headers: authHeader()
  }
  )
  .then(response => console.log(response))
  .catch(error => {  
    console.error('There was an error!', error);
  })
  authenticationService.logout();
}


  render() {
    const value = {
      currentUser : this.state.currentUser,
      isAdmin:this.state.isAdmin,
      isProdavac:this.state.isProdavac,
      isPosetilac:this.state.isPosetilac,
      logoutUser: this.logout
    }

  return (
    <userContext.Provider value={value}>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/info' component={InformisiPage}/>
      <Route exact path='/products/prozor' component={ProductsPageProzori}/>
      <Route exact path='/products/vrata' component={ProductsPageVrata}/>
      <Route exact path='/products/:tipProizvoda/:id' children={<SingleProduct />} />
      <Route exact path='/prodavac/:idP' children={<ProdavacProfile />}/>
      <Route exact path='/search/:search' children={<SearchPage />}/>
      <Route exact path='/user/login' component={LoginPage}/>
      <PrivateRoute path='/user/admin' roles={[Role.Admin]} component={AdminPage}/>
      <PrivateRoute path='/user/posetilac' roles={[Role.Posetilac]} component={PosetilacPage}/>
      <PrivateRoute path='/user/delete' roles={[Role.Posetilac,Role.Prodavac]} component={DeleteNalog}/>
      <PrivateRoute exact path='/user/prodavac/proizvodi' roles={[Role.Prodavac]} component={UserProductsPage}/>
      <PrivateRoute exact path='/user/prodavac/dodaj' roles={[Role.Prodavac]} component={ProdavacDodajPage}/>
      <PrivateRoute exact path='/user/prodavac/izmeni/:tipProizvoda/:id' roles={[Role.Prodavac]} children={<ProdavacIzmeniPage/>}/>
      <PrivateRoute path='/user/prodavac' roles={[Role.Prodavac]} component={ProdavacPage}/>
      <PrivateRoute path='/user/changePassword' roles={[Role.Prodavac,Role.Posetilac,Role.Admin]} component={UserResetPage}/>
      <PrivateRoute path='/user/changeAccountInfo' roles={[Role.Prodavac,Role.Posetilac,Role.Admin]} component={ChangeAccountInfoPage}/>
      <Route exact path='/user/registration' component={RegPage}/>
      <Route exact path='/user/forget' component={ForgetPage}/>
      <Route exact path='/user/forget/reset/:ID' children={<ResetPage/>}/>
      <Route exact path='/user/makeAdmin' component={MakeAdminPage}/>
      <Route exact path='*' component={Error}/>
      </Switch>
      <Footer/>
    </Router>
    </userContext.Provider>

    )
  }

}

export {App}
