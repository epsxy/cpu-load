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
    font-size: 1.2em;
    width: 100%;
    border-top: 3px solid black;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: ForcedSquare;
`;

export const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: ForcedSquare;
`;

export const InfosLabel = styled.span`
    font-size: 3em;
    text-shadow: 3px 3px #c992e0;
`;
export const InfosValue = styled.span`
    font-size: 2em;
    text-shadow: 3px 3px #c992e0;
`;

export const Table = styled.table`
    display: block;
    height: 150px;
    font-size: 1.2em;
    overflow-y: scroll;
    border-collapse: collapse;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    box-shadow: 5px 5px black;
    border: 2px solid black;
`;

export const TBody = styled.tbody``;

export const Tr = styled.tr`
    border-bottom: 2px solid black;
    background-color: white;
`;

export const Th = styled.td`
    position: sticky;
    top: 0;
    margin: 0em 1em;
    padding: 0.2em 0.5em;
    text-align: center;
    border-right: 2px solid black;
    background-color: white;
    &:last-of-type {
        border: none;
    }
    &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        bottom: -1px;
        border-bottom: 2px solid black;
    }
`;

export const Td = styled.td`
    margin: 0em 1em;
    padding: 5px;
    text-align: center;
    border-right: 2px solid black;
    &:last-of-type {
        border: none;
    }
`;
