/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import Component from './lib/component';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';


import {HashRouter,Switch,Route,Link,withRouter,Redirect,NavLink} from 'react-router-dom';

let data = [
    {
        text:'导航1',
        path:'/home'
    },
    {
        text:'导航2',
        path:'/login'
    }
];

const Container = props => {
    return <HashRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={Home2} />
                <Route path="/login" component={Login} />
                <Redirect to="/home"/>
            </Switch>
        </div>
    </HashRouter>
};

const Header = () => {
    return <div>
        {
            data.map(({path,text},i) => {
                return <div key={i} className="sss">
                    <NavLink to={path} >{text}</NavLink>
                </div>
            })
        }
    </div>
};

class Home extends Component{
    render(){
        let {match} = this.props;
        return <div>
            <HashRouter basename={match.url}>
                <div>
                    <Header data={data}/>
                    <Switch>
                        <Route path="/home" component={Home2} />
                        <Route path="/login" component={Login} />
                        <Redirect to="/home"/>
                    </Switch>
                </div>
            </HashRouter>
        </div>
    }
}
class Home2 extends Component{
    render(){
        let {match} = this.props;
        return <div>
            home2
        </div>
    }
}
class Login extends Component{
    render(){
        return <div>
            login
        </div>
    }
}

render(<Provider store={store}>
    <Container/>
</Provider>,$('#container')[0]);