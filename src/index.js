import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CoinIcon } from './assets/coin.svg'
import DMActionModal from './modals/DMActionModal'
import DMSimpleModal from './modals/DMSimpleModal'
import DMToolTipModal from './modals/DMToolTipModal'
import DMShareModal from './modals/DMShareModal'
import DMModal from './modals/DMModal'
import DMProfilePic from './profile/DMProfilePic'

export {
  DMActionModal,
  DMSimpleModal,
  DMToolTipModal,
  DMShareModal,
  DMProfilePic,
  DMModal,
}
//------------------------------------------------------------------------
// Primary Buttons
//------------------------------------------------------------------------

const DecorButton = styled.button`
  user-select: none;
  text-decoration: none;
  text-align: center;
  padding: ${props => (props.size === 'sm' ? '7px 20px' : '8px 20px')};
  border-radius: 24px;
  font-weight: 700;
  font-size: ${props => (props.size === 'sm' ? '12px' : '14px')};
  white-space: nowrap;
  cursor: pointer;
  margin: 0;
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
`

const DecorDivButton = styled.div`
  user-select: none;
  text-decoration: none;
  text-align: center;
  padding: ${props => (props.size === 'sm' ? '7px 20px' : '8px 20px')};
  border-radius: 24px;
  font-weight: 700;
  font-size: ${props => (props.size === 'sm' ? '12px' : '14px')};
  white-space: nowrap;
  cursor: pointer;
  margin: 0;
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
`

const PrimeButton = styled(DecorButton)`
  color: white;
  background-color: #ff5e6d;
  border: 2px solid #ff5e6d;

  &:hover:enabled {
    /*background-color: transparent;*/
    /*color: #ff5e6d;*/
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),  #ff5e6d;
    border: 2px solid #c84e59;
  }

  &:hover:disabled {
    cursor: default;
  }

  &:focus:enabled {
    outline: none;
  }

  &:disabled {
    color: ${props => (props.scheme === 'dark' ? 'white' : '#555')};
    background-color: ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
    border: 2px solid ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
  }
`

const PrimeAltButton = styled(DecorButton)`
  background-color: transparent;
  
  color: ${props => (props.color ? props.color : '#ff5e6d')};
  border: 2px solid ${props => (props.color ? props.color : '#ff5e6d')};

  &:hover:enabled {
    background-color: #ff5e6d;
    color: white;
    border: 2px solid #ff5e6d;
  }

  &:hover:disabled {
    cursor: default;
  }

  &:focus:enabled {
    outline: none;
  }

  &:disabled {
    color: ${props => (props.scheme === 'dark' ? 'white' : '#555')};
    background-color: ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
    border: 2px solid ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
  }
`

const PrimeAltDivButton = styled(DecorDivButton)`
  color: #ff5e6d;
  background-color: transparent;
  border: 2px solid #ff5e6d;

  &:hover {
    background-color: #ff5e6d;
    color: white;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${props => (props.scheme === 'dark' ? '#555' : 'white')};
    background-color: ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
    border: 2px solid ${props => (props.scheme === 'dark' ? '#333' : '#f5f5f5')};
  }
`
export const DMPrimaryButton = ({ ...props }) => <PrimeButton {...props}>{props.children}</PrimeButton>

export const DMPrimaryAltButton = ({ ...props }) => <PrimeAltButton {...props}>{props.children}</PrimeAltButton>
export const DMPrimaryAltDivButton = ({ ...props }) => <PrimeAltDivButton {...props}>{props.children}</PrimeAltDivButton>
//------------------------------------------------------------------------
// Coin Balance
//------------------------------------------------------------------------

const CoinBalanceContainer = styled.div`
  margin-right: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: center;
  font-weight: bold;
  white-space: nowrap;
  font-size: ${props => (props.size === 'lg' ? '13' : '12')}px;
  cursor: pointer;
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
`

const Balance = styled.div`
  color: ${props => (props.scheme === 'dark' ? '#FFFFFF' : '#000000')};
`

const CoinContainer = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`

const Coin = styled(CoinIcon)`
  padding: 0;
  margin: 0;
  margin: 0 auto;
  display: block;
  width: ${props => (props.size === 'lg' ? '24' : '19')}px;
  height: ${props => (props.size === 'lg' ? '24' : '19')}px;
`

const Count = styled.div`
  background: transparent;
  color: ${props => (props.scheme === 'dark' ? '#FFFFFF' : '#000000')};
`

export const DMCoinBalance = ({ scheme, coins, onClick, size, ...props }) => {
  const formatMoney = (amount, decimalCount = 0, decimal = '.', thousands = ',') => {
    try {
      decimalCount = Math.abs(decimalCount)
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount

      const negativeSign = amount < 0 ? '-' : ''

      let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
      let j = i.length > 3 ? i.length % 3 : 0

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '')
      )
    } catch (e) {
      //console.log(e)
    }
  }
  return (
    <CoinBalanceContainer size={size} onClick={onClick}>
      <Balance scheme={scheme} {...props}>Coin Balance:</Balance>
      <CoinContainer>
        <Coin size={size}/>
      </CoinContainer>
      <Count scheme={scheme} {...props}>{formatMoney(coins)}</Count>
    </CoinBalanceContainer>
  )
}
