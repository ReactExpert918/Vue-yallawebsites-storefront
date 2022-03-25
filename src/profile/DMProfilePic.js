import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Player } from '@lottiefiles/react-lottie-player'

import GradientSVG from './GradientSVG'
import animationData from './assets/level_glow_bg.json'

const Container = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  pointer-events: none;

  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;
`

const CenterContainer = styled.div`
  position: relative;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 148px;
  height: 148px;
  background-size: cover;
  border-radius: 50%;
  background-color: transparent;
  border: 0px !important;
  box-shadow: none;
  user-select: none;
  z-index: 2;
`

const ExpContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 172px;
  height: 172px;
  z-index: 3;
`

const PictureContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0;
  margin: 0;
  border: none;
  outline: 0;
  z-index: 4;
`

const Placeholder = styled.div`
  width: 172px;
  height: 172px;
`

const Picture = styled.div`
  width: 148px;
  height: 148px;
  background-size: cover;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: 0px !important;
  box-shadow: none;
  user-select: none;
`

const LevelTag = styled.div`
  position: absolute;
  width: 60px;
  height: 22px;
  margin: 0;

  bottom: 0;
  right: 0;

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 700;

  user-select: none;
  white-space: nowrap;
  overflow: hidden;

  color: ${props => (props.active === false ? '#f5f5f5' : 'white')};
  background-color: ${props => (props.active === false ? '#f5f5f5' : '#EF6971')};
`

const DMProfilePic = forwardRef(({ pic, level, startLevel, endLevel, autoPlay, showLevelBar }, ref) => {
  const rGlow = useRef()
  const rTimer = useRef()
  const rCurRev = useRef(0)
  const rRevolutions = useRef([])
  const [exp, setExp] = useState(0)
  const [animateExp, setAnimateExp] = useState(false)
  const [currentLevel, setCurrentLevel] = useState()

  const ExpStyle = {
    root: {},
    path: {
      stroke: `url(#grad-id)`,
      strokeLinecap: 'round',
      transition: animateExp === false ? 'stroke-dashoffset 0s ease 0s' : 'stroke-dashoffset 2.0s ease 0s',
      transformOrigin: 'center center',
      transform: 'rotate(0.42turn)'
    },
    trail: {
      stroke: '#F1F1F1',
      strokeLinecap: 'round',
      transformOrigin: 'center center',
      transform: 'rotate(0.42turn)'
    }
  }

  //---------------------------------------------

  const startRevolutions = useCallback(() => {
    clearTimeout(rTimer.current)

    if (rRevolutions.current.length === 0) return

    setAnimateExp(false)
    setExp(rRevolutions.current[rCurRev.current][0])

    rTimer.current = setTimeout(() => {
      setAnimateExp(true)
      setExp(rRevolutions.current[rCurRev.current][1])
      rTimer.current = setTimeout(() => {
        setCurrentLevel(rRevolutions.current[rCurRev.current][2])
        if (rRevolutions.current[rCurRev.current][1] === 100) {
          setAnimateExp(false)
          setExp(0)
          if(rGlow.current) {
            rGlow.current.stop()
            rGlow.current.play()
          }
        }
        rCurRev.current++
        if (!rRevolutions.current[rCurRev.current]) return
        else startRevolutions()
      }, 2000)
    }, 50)
  }, [])

  //---------------------------------------------

  const setExpToRevolutions = useCallback((start, end) => {
    rCurRev.current = 0
    const lvl = start.toString().split('.')
    setCurrentLevel(parseInt(lvl[0]))

    const slvl = start.toFixed(2).split('.')
    const elvl = end.toFixed(2).split('.')

    const sl = Math.trunc(start)
    const el = Math.trunc(end)

    const sexp = parseInt(slvl[1])
    const eexp = parseInt(elvl[1])

    if (sl === el) {
      rRevolutions.current = [[sexp, eexp, el]]
    } else {
      rRevolutions.current = []
      rRevolutions.current.push([sexp, 100, sl + 1])
      for (var i = sl + 1; i < el; i++) {
        rRevolutions.current.push([0, 100, i + 1])
      }
      rRevolutions.current.push([0, eexp, el])
    }
  }, [])

  useEffect(() => {
    return () => clearTimeout(rTimer.current)
  }, [])

  useEffect(() => {
    //if (level) setCurrentLevel(Math.floor(level))
    if(level === false) setCurrentLevel(false)
    else setCurrentLevel(Math.floor(level))
    if (!startLevel) return
    setExpToRevolutions(startLevel, endLevel)

    if (autoPlay && autoPlay === true) startRevolutions()
  }, [autoPlay, level, startLevel, endLevel, startRevolutions])

  useImperativeHandle(ref, () => ({
    play: () => {
      startRevolutions()
    },
    setAndPlay: (start, end) => {
      setExpToRevolutions(start, end)
      startRevolutions()
    }
  }))

  return (
    <>
      <Container>
        <CenterContainer>
          <Player ref={rGlow} src={animationData} style={{ height: '400px', width: '400px', position: 'absolute', top: '-114px', left: '-114px', zIndex: '1' }} />
          <Background />
          {showLevelBar && (
            <ExpContainer>
              <CircularProgressbar styles={ExpStyle} strokeWidth={4} circleRatio={0.945} value={exp} />
            </ExpContainer>
          )}
          <PictureContainer>
            <Picture style={{ backgroundImage: `url(${pic})` }} />
            <LevelTag active={currentLevel === false ? false : true}>Lv {currentLevel || 0}</LevelTag>
          </PictureContainer>
          <Placeholder />
        </CenterContainer>
      </Container>
      <GradientSVG startColor="#FF8171" endColor="#FF6A8E" idCSS="grad-id" rotation="90" />
    </>
  )
})

export default DMProfilePic
