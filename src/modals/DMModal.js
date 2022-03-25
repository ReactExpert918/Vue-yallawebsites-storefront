import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as ExitIcon } from '../assets/exit.svg'

export const MODAL_SIZE_FULLSCREEN = 'fullscreen'
export const MODAL_SIZE_CONTENT = 'content'
export const MODAL_SIZE_PERCENTAGE = 'percentage'

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  transition: opacity 0.3s ease-out;
  opacity: ${props => (props.animate === 'true' ? '1' : '0')};
  visibility: ${props => (props.visibility === 'true' ? 'visible' : 'hidden')};
`

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 101;
  display: flex;
  pointer-events: none;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  visibility: ${props => (props.visibility === 'true' ? 'visible' : 'hidden')};
`

const ExitButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  margin: 0;
  padding: 0;
  background: none;
  cursor: pointer;
`

const Exit = styled(ExitIcon)`
  fill: ${props => (props.scheme === 'dark' ? 'white' : '#828282')};
`
//justify-content: flex-start;

const Panel = styled.div`
  background-color: white;

  position: relative;
  pointer-events: auto;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  
  width: 95%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '640')}px;
  
  background-color: ${props => (props.scheme === 'dark' ? '#333' : 'white')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};

  ${props => props.size === MODAL_SIZE_PERCENTAGE && `height: ` + (props.percentage ? props.percentage : `100`) + `%;`}

  top: ${props => (props.animate === 'true' ? '0%' : '100%')};

  transition-property: top, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  justify-content: center;
  border-radius: ${props => (props.rounded === 'true' ? `10` : `0`)}px;
  ${props => props.size === MODAL_SIZE_PERCENTAGE && `height: auto;`}

  ${props => {
    if (props.animate === 'true')
      return `
        top: 0%;
        opacity: 1;
        `
    else
      return `
      top: 5%;
      opacity: 0;
      `
  }}
`

const PanelTitle = styled.div`
  flex: 0 0 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  
  align-items: center;
  font-weight: bold;

  justify-content: ${props => (props.left === 'true' ? `flex-start` : `center`)};
  margin-left: ${props => (props.left === 'true' ? `12` : `0`)}px;
`

const PanelBody = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
`

const DMModal = ({ show, scheme, size = MODAL_SIZE_FULLSCREEN, title, children, percentage, maxWidth, notRounded, titleLeft, onClose, noClose, noOverlayClose, stayFloat }) => {
  const [visibility, setVisibility] = useState(false)
  const [animate, setAnimate] = useState(false)

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    const display = async () => {
      if (show) {
        setVisibility(true)
        setAnimate(true)
      } else {
        setAnimate(false)
        await sleep(300)
        setVisibility(false)
      }
    }
    display()
  }, [show])

  const handleClose = e => {
    e.preventDefault()
    if (onClose) onClose()
  }

  const handleOverlayClick = e => {
    e.preventDefault()
    if (noOverlayClose) return
    if (onClose) onClose()
  }

  return (
    <>
      <Overlay animate={animate.toString()} visibility={visibility.toString()} onClick={handleOverlayClick} />
      <Container size={size} visibility={visibility.toString()}>
        <Panel scheme={scheme} size={size} percentage={percentage} animate={animate.toString()} visibility={visibility.toString()} rounded={notRounded ? 'false' : 'true'} maxWidth={maxWidth} stayFloat={stayFloat ? 'true' : 'false'}>
          {!noClose && (
            <ExitButton onClick={handleClose} aria-label="Close Modal">
              <Exit scheme={scheme} />
            </ExitButton>
          )}
          <PanelTitle left={titleLeft ? 'true' : 'false'}>{title}</PanelTitle>
          <PanelBody>{children}</PanelBody>
        </Panel>
      </Container>
    </>
  )
}

export default DMModal
