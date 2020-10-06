import {useState, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import Link from 'next/link'
import {APP_NAME} from '../config';
import {isAuth, signout} from "../actions/auth";
import Router from "next/router";
import NProgress from 'nprogress';
import './../node_modules/nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {!isAuth() && (<Fragment>
                                <NavItem>
                                    <Link href="/signin">
                                        <NavLink style={{cursor: 'pointer'}}>
                                            Signin
                                        </NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link href="/signup">
                                        <NavLink style={{cursor: 'pointer'}}>
                                            Signup
                                        </NavLink>
                                    </Link>
                                </NavItem>
                            </Fragment>
                        )}

                        {isAuth() && isAuth().role === 0 &&  (
                            <NavItem>
                                <Link href="/user">
                                    <NavLink>
                                        {`${isAuth().name}'s Dashboard`}
                                    </NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && isAuth().role === 1 &&  (
                            <NavItem>
                                <Link href="/admin">
                                    <NavLink>
                                        {`${isAuth().name}'s Dashboard`}
                                    </NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && (
                            <NavItem>
                                <NavLink
                                    onClick={() => signout(() => Router.replace('/signin'))}
                                    style={{cursor: 'pointer'}}>
                                    Signout
                                </NavLink>

                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
