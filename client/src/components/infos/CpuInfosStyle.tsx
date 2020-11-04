import styled from 'styled-components';

export const Root = styled.div`
    display: flex;
    @media (max-width: 700px) {
        flex-direction: column;
        justify-content: stretch;
    }
    @media (min-width: 701px) {
        flex-direction: row;
    }
    justify-content: space-evenly;
    align-items: center;
    font-family: ForcedSquare;
    width: 100%;
    border-bottom: 3px solid black;
`;

export const InfosLabel = styled.span`
    font-size: 3em;
`;
export const LoadValue = styled.span`
    font-size: 7em;
`;
