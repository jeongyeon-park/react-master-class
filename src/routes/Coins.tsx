import {useState, useEffect} from "react";
import { useQuery } from "react-query";
import {Link} from "react-router-dom"
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div `
  padding: 10px 10px;
`;

const Header = styled.header `
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px ;
`;

const CoinsList = styled.ul ``;

const Coin = styled.li `
  background-color: white ;
  color: ${ (props) => props.theme.textColor};
  border-radius: 15px ;
  margin-bottom: 10px ;

  a{
    display: flex ;
    padding: 20px ;
    transition: color 0.2s ease-in;
    align-items: center ;
  }
  &:hover{
    a {
      color:${props => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1 `
  font-size:48px;
  color: ${props => props.theme.accentColor}
`;

const Loader = styled.span`
  text-align: center ;
  display: block ;
`

const Img = styled.img`
  width: 35px;
  height: 35px ;
  margin-right: 10px ;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

interface ICoinsProps {
  toggleDark : () => void;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom);

  return (
      <Container>
        <Header>
        <Helmet>
          <Title>코인</Title>
        </Helmet>
            <Title>코인</Title>
            <button onClick={()=>setterFn(current => !current)}>Toggle Mode</button>
        </Header>
        {
          isLoading ? (
            <Loader>Loading...</Loader>
            ) : (
              <CoinsList>
            {
              data?.slice(0,100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} 
                              state={{
                                name: coin.name
                              }}>
                         <Img 
                            src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} 
                          />
                            {coin.name}
                            &rarr;
                        </Link>
                    </Coin>
                ))
            }
              </CoinsList>
          )
          
        }
    </Container>
    );
}

export default Coins;