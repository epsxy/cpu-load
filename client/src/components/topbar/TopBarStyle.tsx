import styled from 'styled-components';

export const Root = styled.div`
    width: 100%;
    background-color: black;
    color: white;
    font-family: ForcedSquare;
    font-size: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-right: 1em;
`;

export const TopBarElement = styled.a`
    margin: 0em 0.5em;
    color: white;
    text-decoration: none;
    &:hover {
        color: #ffe440;
        text-shadow: 5px 5px rebeccapurple;
    }
`;
