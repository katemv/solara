import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ROUTES from "../../../providers/navigation/routes";
import Button from "../../Atoms/Button/Button.component";
import Logo from "../../Molecules/Logo/Logo.component";
import MenuItem from "./MenuItem/MenuItem.component";
import { useAuth } from "../../../hooks/useAuth";

import { Header, HeaderContainer, Menu, Nav } from "./styles";

const Layout = () => {
    const { isAuthorized } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState<string>(ROUTES.SHOP);

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <Header>
                <HeaderContainer
                    fullWidth
                    fullHeight
                    justify="space-between"
                    align="center"
                >
                    <Logo />
                    <Nav>
                        {isAuthorized ? (
                            <>
                                {currentRoute === ROUTES.ADMIN ? (
                                    <Button
                                        label="components.nav.back_to_shop"
                                        onClick={() => navigate(ROUTES.SHOP)}
                                        appearance="secondary"
                                    />
                                ) : (
                                    <>
                                        <Menu>
                                            <MenuItem
                                                to={ROUTES.SHOP}
                                                intlKey="components.nav.shop"
                                                isActive={currentRoute === ROUTES.SHOP}
                                            />
                                            <MenuItem
                                                to={ROUTES.CART}
                                                intlKey="components.nav.cart"
                                                isActive={currentRoute === ROUTES.CART}
                                            />
                                            <MenuItem
                                                to={ROUTES.ORDERS}
                                                intlKey="components.nav.orders"
                                                isActive={currentRoute === ROUTES.ORDERS}
                                            />
                                            <MenuItem
                                                to={ROUTES.PROFILE}
                                                intlKey="components.nav.profile"
                                                isActive={currentRoute === ROUTES.PROFILE}
                                            />
                                        </Menu>
                                        <Button
                                            label="components.nav.admin"
                                            onClick={() => navigate(ROUTES.ADMIN)}
                                            appearance="secondary"
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <Button
                                label="components.nav.login"
                                onClick={() => navigate(ROUTES.LOGIN)}
                                appearance="secondary"
                            />
                        )}
                    </Nav>
                </HeaderContainer>
            </Header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
