import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as ExitIcon } from '../assets/exit.svg'
import useWindowResize from '../hooks/useWindowResize'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
    justify-content: center;
    align-items: ${props => props.isMinimized ? 'flex-start':'center'};
  }
`

const ModalPanelContainer = styled.div`
  position: relative;
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
  
  background-color: ${props => (props.scheme === 'dark' ? '#333' : 'white')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
  border-radius: 0;
  
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  
  width: 100%;
  max-height: 100%;

  overflow-y: auto;
  
  @media (min-width: 768px) {
    border-radius: 10px;
    width: ${props => (props.width ? props.width+'px' : '75%')};
    max-width: ${props => (props.maxWidth ? props.maxWidth+'px' : '700px')};
  }
`

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
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-weight: bold;
  font-size: 18px;
  padding: 5px 0 20px 5px;
  /*padding: 15px 18px;*/
`

const ModalPanelBody = styled.div`
  padding: 0 20px 20px 20px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const DMSimpleModal = forwardRef(({ onClose, overlayClose, children, title, width, maxWidth, scheme, show }, ref) => {
  const [isVisible, setVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [canOverlayClose, setCanOverlayClose] = useState(true)
  const overlay = useRef()
  const panel = useRef()
  const resize = useWindowResize()
  const BREAK_POINT_BUFFER = 100

  useEffect(() => {
    //console.log(resize.width, resize.height, panel.current.clientHeight)
    if(isVisible === false) return
    if(!panel.current) setIsMinimized(false)
    if(resize.height - BREAK_POINT_BUFFER <= panel.current.clientHeight) {
      setIsMinimized(true)
    } else setIsMinimized(false)
  },[resize])

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
    <ModalContainer ref={overlay} isMinimized={isMinimized} show={isVisible} onClick={handleOverlay}>
      <ModalPanelContainer ref={panel} scheme={scheme} width={width} maxWidth={maxWidth}>
        <ModalPanelCloseContainer>
          <Exit scheme={scheme} onClick={handleClose} />
        </ModalPanelCloseContainer>
        <ModalPanelTitle>{title && title}</ModalPanelTitle>
        <ModalPanelBody>{children}</ModalPanelBody>
      </ModalPanelContainer>
    </ModalContainer>
  )
})

export default DMSimpleModal
