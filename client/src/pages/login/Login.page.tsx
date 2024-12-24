import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container } from "../../components/Pages/Auth/Container.component";
import Button from "../../components/Atoms/Button/Button.component";
import Flex from "../../components/Atoms/Flex/Flex.component";
import { Card } from "../../components/Pages/Auth/Card.component";
import Input from "../../components/Atoms/Input/Input.component";
import { setStorageData } from "../../utils/localStorage";
import Text from "../../components/Atoms/Text/Text.component";
import Logo from "../../components/Molecules/Logo/Logo.component";
import { useServer } from "../../hooks/useServer";
import { LOGIN_ROUTE } from "../../api/constants";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
}).required();

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    userId: string;
}

const LoginPage = () => {
    const { setUser, setIsAuthorized } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema)
    });

    const logout = () => {
        setUser(null);
        setIsAuthorized(false);
        setStorageData("token", null);
    };

    const { request: loginRequest, isLoading } = useServer<LoginRequest, LoginResponse>({
        path: LOGIN_ROUTE,
        onSuccess: (data) => {
            const { token, userId } = data;

            setStorageData("token", token);
            setUser({
                id: userId,
                token: token
            });
            setIsAuthorized(true);
            navigate("/shop", { replace: true });
        },
        onError: () => {
            logout();
        }
    });

    return (
        <Container align="center" justify="center">
            <Card direction="column" gap="spacing3">
                <Logo marginBottom="spacing6" />
                <Flex
                    direction="column"
                    gap="spacing3"
                    align="start"
                    justify="start"
                    marginBottom="spacing5"
                >
                    <Text
                        as="h1"
                        intlKey="pages.login.welcome_back"
                        appearance="headline2"
                    />
                    <Text
                        as="p"
                        intlKey="pages.login.login_message"
                        color="dark80"
                    />
                </Flex>

                <form
                    onSubmit={handleSubmit(loginRequest)}
                >
                    <Flex direction="column" gap="spacing3" marginBottom="spacing9">
                        <Flex direction="column" gap="spacing3" marginBottom="spacing4">
                            <Input
                                control={control}
                                placeholderIntlKey="forms.email_placeholder"
                                name="email"
                                prefixIconType="mail"
                            />
                            <Input
                                control={control}
                                placeholderIntlKey="forms.password_placeholder"
                                name="password"
                                type="password"
                                prefixIconType="lock"
                                suffixIconType="visibility_off"
                            />
                        </Flex>
                        <Link to="/shop">
                            <Text as="span" intlKey="pages.login.forgot_password" color="purple100" />
                        </Link>
                    </Flex>
                    <Button
                        label="pages.login.login"
                        loading={isLoading}
                        type="submit"
                        fullWidth
                    />
                </form>


                <Flex align="center" justify="center" gap="spacing2">
                    <Text as="p" intlKey="pages.login.no_account" color="dark80" />
                    <Link to="/signup">
                        <Text as="span" intlKey="pages.login.signup" color="purple100" />
                    </Link>
                </Flex>
            </Card>
        </Container>
    );
};

export default LoginPage;
