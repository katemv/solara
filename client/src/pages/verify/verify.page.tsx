import { useState } from "react";

import { Container } from "../../components/Organisms/Auth/Container.component";
import Button from "../../components/Atoms/Button/Button.component";
import { Card } from "../../components/Organisms/Auth/Card.component";
import { Flex } from "../../components/Atoms/Flex/Flex.component";
import Input from "../../components/Atoms/Input/Input.component";
import Logo from "../../components/Molecules/Logo/Logo.component";
import Text from "../../components/Atoms/Text/Text.component";

const VerifyPage = () => {
    const [verificationCode, setVerificationCode] = useState("");

    return (
        <Container align="center" justify="center">
            <Card direction="column" gap="spacing3" justify="space-between">
                <Logo marginBottom="spacing6" />
                <Flex direction="column" gap="spacing3" marginBottom="spacing6">
                    <Text
                        as="h1"
                        intlKey="pages.verify.verification_code"
                        appearance="headline3"
                        textAlign="left"
                    />
                    <Text
                        as="p"
                        intlKey="pages.verify.verification_code_subtitle"
                        color="black60"
                        textAlign="left"
                    />
                    <Input
                        value={verificationCode}
                        onChange={setVerificationCode}
                        placeholderIntlKey="pages.verify.verification_code"
                    />
                </Flex>
                <Flex gap="spacing3">
                    <Button label="messages.resend" fullWidth type="ghost" />
                    <Button label="messages.confirm" fullWidth />
                </Flex>
            </Card>
        </Container>
    );
};

export default VerifyPage;
