import HomeRoute from "../routes/HomeRoute/HomeRoute.mjs";
import ErrorRoute from "../routes/ErrorRoute/ErrorRoute.mjs";
import RegisterRoute from "../routes/RegisterRoute/RegisterRoute.mjs";
import LoginRoute from "../routes/LoginRoute/LoginRoute.mjs";
import AboutRoute from "../routes/AboutRoute/AboutRoute.mjs";
import CollaboratorsRoute from "../routes/CollaboratorsRoute/CollaboratorsRoute.mjs";
import DashboardRoute from "../routes/DashboardRoute/DashboardRoute.mjs";
import ExploreRoute from "../routes/ExploreRoute/ExploreRoute.mjs";
import MessagesRoute from "../routes/MessagesRoute/MessagesRoute.mjs";
import MusespaceRoute from "../routes/MusespaceRoute/MusespaceRoute.mjs";
import NotificationsRoute from "../routes/NotificationsRoute/NotificationsRoute.mjs";
import ProfileRoute from "../routes/ProfileRoute/ProfileRoute.mjs";
import ProjectRoute from "../routes/ProjectRoute/ProjectRoute.mjs";
import SupportRoute from "../routes/SupportRoute/SupportRoute.mjs";
import VersionsRoute from "../routes/VersionsRoute/VersionsRoute.mjs";
import VisitProfileRoute from "../routes/VisitProfileRoute/VisitProfileRoute.mjs";
import VisitProjectRoute from "../routes/VisitProjectRoute/VisitProjectRoute.mjs";

export default class RouterModule {
    #Routes = [];
    #RouterComponent;
    constructor(){
        // **** CanActive
        this.routes = [
            {
                path:'/',
                selector:'app-home',
                component:HomeRoute,

            },
            {
                path:'/register',
                selector:'app-register',
                component:RegisterRoute,
            },
            {
                path:'/about',
                selector:'app-about',
                component:AboutRoute,
            },
            {
                path:'/login',
                selector:'app-login',
                component:LoginRoute,
            },
            {
                path:'/collaborators',
                selector:'app-collaborators',
                component:CollaboratorsRoute,
            },
            {
                path:'/dashboard',
                selector:'app-dashboard',
                component:DashboardRoute,
            },
            {
                path:'/explore',
                selector:'app-explore',
                component:ExploreRoute,
            },
            {
                path:'/messages',
                selector:'app-messages',
                component:MessagesRoute,
            },
            {
                path:'/musespace',
                selector:'app-musespace',
                component:MusespaceRoute,
            },
            {
                path:'/notifications',
                selector:'app-notifications',
                component:NotificationsRoute,
            },
            {
                path:'/profile',
                selector:'app-profile',
                component:ProfileRoute,
                query:false
            },
            {
                path:'/project',
                selector:'app-project',
                component:ProjectRoute,
            },
            {
                path:'/support',
                selector:'app-support',
                component:SupportRoute,
            },
            {
                path:'/versions',
                selector:'app-versions',
                component:VersionsRoute,
            },
            {
                path:'/visitProfile',
                selector:'app-visitprofile',
                component:VisitProfileRoute,
                query:true
            },
            {
                path:'/visitProject',
                selector:'app-visitproject',
                component:VisitProjectRoute,
                query:true
            },
            {
                path:'**',
                selector:'app-error',
                component:ErrorRoute
            }
        ];
        // setting interval because it may take long time to download and load all the content to the component
        this.redirect();
        // **** Set interval it may not catch some
        this.getCustomComponents('a',(hyperlinks)=>{
            for(const hyperlink of hyperlinks){
                hyperlink.onclick = (e)=>{
                    e.preventDefault();
                    const hyperlink = e.target;
                    const routerLink = hyperlink.getAttribute('routerLink');
                    if(routerLink){
                        this.redirect(routerLink)
                    }
                }
            }
        },20)
    }
    // It will take time to load route depends on content "HTML" and script "MJS" so we set interval
    getCustomComponent (name,callback,timeout =1){
        return new Promise((resolve) => {
            const validator = setInterval(()=>{
                const component = document.querySelector(name);
                if(component){
                    clearInterval(validator);
                    return resolve(component);
                }
            },1)
        }).then(component =>{
            return callback(component)
        })
    }
    getCustomComponents (name,callback,timeout =1){
        return new Promise((resolve) => {
            const validator = setInterval(()=>{
                const component = document.querySelectorAll(name);
                if(component.length > 0){
                    clearInterval(validator);
                    return resolve(component);
                }
            },1)
        }).then(component =>{
            return callback(component)
        })
    }

    // On page load it will loop over "#Routes" to fined what route user use
    redirect(pathname = location.pathname,search=undefined){
        if(pathname !== location.pathname){
            if(!search)search="";
            else search = `?${search}`;
            window.history.pushState('','',`${pathname}${search}`);
        }
        // check if already defined
        // When "router-outlet" defined from document
        if(this.#RouterComponent){
            for(let route of this.#Routes){
                if(pathname === route.path ){
                    // if(search && route.query && location.search){}
                    return this.#RouterComponent.route = route.selector
                }
                if(route.path === '**'){
                    return this.#RouterComponent.route = route.selector
                }
            }
        } else {
            this.getCustomComponent('router-outlet',(component)=>{
                this.#RouterComponent = component;
                for(let route of this.#Routes){
                    if(pathname === route.path){
                        return component.route = route.selector
                    }
                    if(route.path === '**'){
                        return component.route = route.selector
                    }
                }
            });
        }

    }
    // routes defining custom elements and pushed to "#Routes" **** canActive validation
    set routes(routes){
        for(let route of routes){
            customElements.define(route.selector,route.component);
            this.#Routes.push({
                path:route.path,
                selector:route.selector
            })
        }
    }
}

customElements.define('router-outlet',class extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = 'Router Bridged';
    }
    set route (selector){
        this.innerHTML = `<${selector}></EXTERNAL_FRAGMENT>`;
    }
});