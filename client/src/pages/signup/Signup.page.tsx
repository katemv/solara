import { Link } from "react-router-dom";

import { Container } from "../../components/Pages/Auth/Container.component";
import Button from "../../components/Atoms/Button/Button.component";
import Flex from "../../components/Atoms/Flex/Flex.component";
import { Card } from "../../components/Pages/Auth/Card.component";
import Input from "../../components/Atoms/Input/Input.component";
import Text from "../../components/Atoms/Text/Text.component";
import Logo from "../../components/Molecules/Logo/Logo.component";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface SignupRequest {
    email: string;
    password: string;
}

export interface SignupResponse {
    token: string;
    userId: string;
}

const signupSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
}).required();

const SignupPage = () => {
    // const navigate = useNavigate();
    const { control } = useForm<SignupRequest>({
        resolver: yupResolver(signupSchema)
    });

    // const { request: signupRequest, isLoading } = useServer<SignupRequest, SignupResponse>({
    //     path: SIGNUP_ROUTE,
    //     onSuccess: () => {
    //         navigate(LOGIN_ROUTE, { replace: true });
    //     },
    //     onError: () => {
    //     }
    // });

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
                        intlKey="pages.signup.signup"
                        appearance="headline2"
                    />
                    <Text
                        as="p"
                        intlKey="pages.signup.signup_message"
                        color="dark80"
                    />
                </Flex>

                <form
                    onSubmit={() => {
                        // todo handle req
                        // signupRequest(form)
                    }}
                >
                    <Flex direction="column" gap="spacing3" marginBottom="spacing9">
                        <Flex direction="column" gap="spacing3" marginBottom="spacing4">
                            <Input
                                placeholderIntlKey="forms.email_placeholder"
                                control={control}
                                name="email"
                            />
                            <Input
                                placeholderIntlKey="forms.password_placeholder"
                                control={control}
                                name="password"
                                type="password"
                            />
                        </Flex>
                    </Flex>
                    <Button
                        label="messages.continue"
                        // loading={isLoading}
                        type="submit"
                        fullWidth
                    />
                </form>

                <Flex align="center" justify="center" gap="spacing2">
                    <Text as="p" intlKey="pages.signup.existing_account" color="dark80" />
                    <Link to="/shop">
                        <Text as="span" intlKey="pages.signup.login" color="purple100" />
                    </Link>
                </Flex>
            </Card>
        </Container>
    );
};

export default SignupPage;
