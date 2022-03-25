import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as ExitIcon } from '../assets/exit.svg'
import { ReactComponent as CopyLinkIcon } from '../assets/copylink.svg'
import { PinterestShareButton, PinterestIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import { ReactComponent as PinIcon } from '../assets/social/pins.svg'
import { ReactComponent as FBIcon } from '../assets/social/fb.svg'
import { ReactComponent as TwitIcon } from '../assets/social/twitter.svg'

const ModalPanelContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  visibility: ${props => (props.show === true ? 'visible' : 'hidden')};
  background-color: ${props => (props.scheme === 'dark' ? '#333' : 'white')};
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};

  z-index: 9;
  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;

  @media (min-width: 768px) {
    border-radius: 10px;
    width: auto;
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
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
  font-size: 24px;
  padding: 5px 0 20px 5px;
`

const ModalPanelBody = styled.div`
  padding: 0 50px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const ShareContainer = styled.div`
  padding: 40px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  font-weight: 500;
  color: #333;
  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`

const CopyLink = styled(CopyLinkIcon)`
  fill: #ff5e6d;
  width: 30px;
`

const Circle = styled.div`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.15);
  }
`

const DMShareModal = forwardRef(({ onClose, scheme }, ref) => {
  const [isVisible, setVisible] = useState(false)

  const [shareUrl, setShareUrl] = useState('https://www.decormatters.com')
  const [imgUrl, setImgUrl] = useState('https://www.decormatters.com')
  const [quote, setQuote] = useState('DecorMatters')
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  const rContainer = useRef()

  const OFFSETX = 20

  const handleClose = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  const useOutsideAlerter = (ref, onClose) => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
  }

  useOutsideAlerter(rContainer, handleClose)

  const positionAndShow = position => {
    if (!position) {
      setVisible(false)
      return
    }

    var toX = position.x + OFFSETX
    var toY = position.y + OFFSETX

    if (rContainer.current.clientWidth + position.x > window.innerWidth) toX = position.x - rContainer.current.clientWidth - OFFSETX

    const body = document.body
    const html = document.documentElement
    const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

    if (rContainer.current.clientHeight + position.y > pageHeight) toY = position.y - rContainer.current.clientHeight - OFFSETX

    setPosX(toX)
    setPosY(toY)

    setVisible(true)
  }

  useImperativeHandle(ref, () => ({
    show: (lnk, ttl, img, pos) => {
      setShareUrl(lnk)
      setImgUrl(img)
      setQuote(ttl)
      positionAndShow(pos)
    },
    hide: () => {
      setVisible(false)
    },
    visible: () => {
      return isVisible
    }
  }))

  const shareClick = e => {
    e.stopPropagation()

    const newClipboard = document.createElement('textarea')
    newClipboard.value = shareUrl
    document.body.appendChild(newClipboard)
    newClipboard.select()
    document.execCommand('copy')
    document.body.removeChild(newClipboard)
    alert('Url is copied to clipboard! Feel free to share this inspiration to others!')
  }

  return (
    <ModalPanelContainer ref={rContainer} scheme={scheme} left={posX + 'px'} top={posY + 'px'} show={isVisible}>
      <ModalPanelCloseContainer>
        <Exit scheme={scheme} onClick={handleClose} />
      </ModalPanelCloseContainer>
      <ModalPanelTitle>Share This Design</ModalPanelTitle>
      <ModalPanelBody>
        <ShareContainer>
          <PinterestShareButton url={shareUrl} media={imgUrl}>
            <Circle>
              <PinIcon />
            </Circle>
          </PinterestShareButton>
          Pinterest
        </ShareContainer>
        <ShareContainer>
          <TwitterShareButton url={shareUrl} title={quote}>
            <Circle>
              <TwitIcon />
            </Circle>
          </TwitterShareButton>
          Twitter
        </ShareContainer>
        <ShareContainer>
          <FacebookShareButton url={shareUrl} quote={quote}>
            <Circle>
              <FBIcon />
            </Circle>
          </FacebookShareButton>
          Facebook
        </ShareContainer>
        <ShareContainer>
          <Circle onClick={shareClick}>
            <CopyLink />
          </Circle>
          Copy Link
        </ShareContainer>
      </ModalPanelBody>
    </ModalPanelContainer>
  )
})

export default DMShareModal
