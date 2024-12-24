import { Container } from "../../components/Pages/Auth/Container.component";
import Button from "../../components/Atoms/Button/Button.component";
import { Card } from "../../components/Pages/Auth/Card.component";
import Flex from "../../components/Atoms/Flex/Flex.component";
import Logo from "../../components/Molecules/Logo/Logo.component";
import Text from "../../components/Atoms/Text/Text.component";

const VerifyPage = () => {
    return (
        <Container align="center" justify="center">
            <Card direction="column" gap="spacing3" justify="space-between">
                <Logo marginBottom="spacing6" />
                <Flex direction="column" gap="spacing3" marginBottom="spacing6">
                    <Text
                        as="h1"
                        intlKey="pages.verify.verification_code"
                        appearance="headline3"
                    />
                    <Text
                        as="p"
                        intlKey="pages.verify.verification_code_subtitle"
                        color="dark80"
                    />
                </Flex>
                <Flex gap="spacing3">
                    <Button label="messages.resend" fullWidth appearance="secondary" />
                    <Button label="messages.confirm" fullWidth />
                </Flex>
            </Card>
        </Container>
    );
};

export default VerifyPage;
