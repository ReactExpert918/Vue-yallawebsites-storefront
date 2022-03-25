import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as ExitIcon } from '../assets/minus.svg'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 456;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  transition-property: background-color, border;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  user-select: none;
  transition: visibility 0.2s, opacity 0.2s linear;
  visibility: ${props => (props.show === true ? 'visible' : 'hidden')};
  opacity: ${props => (props.show === true ? 1 : 0)};

  @media (min-width: 768px) {
    /*justify-content: center;
    align-items: center;*/
  }
`

const ModalPanelContainer = styled.div`
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
  position: absolute;
  background-color: ${props => (props.scheme === 'dark' ? '#333' : 'white')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  /*padding: 20px;*/
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: stretch;
  border-radius: 0;
  width: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    border-radius: 5px;
    width: ${props => (props.width ? props.width+'px' : '435px')};
    max-width: ${props => (props.maxWidth ? props.maxWidth+'px' : '700px')};
    ${props => (props.top && 'top: ' + props.top+'px')};
    ${props => (props.bottom && 'bottom: ' + props.bottom+'px')};
    ${props => (props.left && 'left: ' + props.left+'px')};
    ${props => (props.right && 'right: ' + props.right+'px')};
  }
`
/*

border-radius: 10px;
  width: 100%;

  */
const ModalPanelCloseContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`

const Exit = styled(ExitIcon)`
  padding: 0;
  margin: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  fill: ${props => (props.scheme === 'dark' ? 'white' : '#828282')};
`

const ModalPanelTitle = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  font-weight: bold;
  font-size: 13px;
  height: 36px;
  background-color: ${props => (props.scheme === 'dark' ? '#464646' : '#C6C6C6')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
`

const Title = styled.div`
  width: 100%;
  text-align: center;
`

const ModalPanelBody = styled.div`
  padding: 13px 20px 20px 20px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.scheme === 'dark' ? 'back' : 'white')};
  font-size: 13px;
`

const DMToolTipModal = forwardRef(({ onClose, overlayClose, children, title, width, maxWidth, scheme, show, ...props }, ref) => {
  const [isVisible, setVisible] = useState(false)
  const [canOverlayClose, setCanOverlayClose] = useState(true)
  const overlay = useRef()

  useEffect(() => {
    if (typeof overlayClose !== 'undefined') setCanOverlayClose(overlayClose)
  }, [overlayClose])

  useEffect(() => {
    if(typeof show !== 'undefined') {
      setVisible(show)
    }
  }, [show])

  const handleClose = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    },
    visible: () => {
      return isVisible
    }
  }))

  const handleOverlay = e => {
    if (overlay.current === e.target) {
      if (canOverlayClose === true) handleClose()
    }
  }

  return (
    <ModalContainer ref={overlay} show={isVisible} onClick={handleOverlay}>
      <ModalPanelContainer scheme={scheme} width={width} maxWidth={maxWidth} {...props}>
        <ModalPanelCloseContainer>
          <Exit scheme={scheme} onClick={handleClose} />
        </ModalPanelCloseContainer>
        <ModalPanelTitle scheme={scheme}><Title>{title && title}</Title></ModalPanelTitle>
        <ModalPanelBody scheme={scheme}>{children}</ModalPanelBody>
      </ModalPanelContainer>
    </ModalContainer>
  )
})

export default DMToolTipModal
