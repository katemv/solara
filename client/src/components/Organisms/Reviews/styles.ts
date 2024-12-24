import { css, styled } from "styled-components";
import Flex from "../../Atoms/Flex/Flex.component";

export const Container = styled(Flex)(({ theme }) => `
    background: ${theme.colors.dark95};
    border-radius: 10px;
    padding: ${theme.spacings.spacing5};
    min-width: 350px;
`);

export const ProgressContainer = styled.div(({ theme }) => css`
    background: ${theme.colors.dark90};
    width: 100%;
    height: 7px;
    border-radius: 5px;
`);
export const ProgressBar = styled.div<{ $percent: number }>(({ theme, $percent }) => css`
    background: ${theme.colors.warning};
    width: ${$percent}%;
    height: 7px;
    border-radius: 5px;
`);
