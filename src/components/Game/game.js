import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import GameResultView from '../GameResultView/GameResultView'

import {
  Container,
  ScoreContainer,
  Heading,
  Score,
  ScorePara,
  ResultPara,
  PlayingView,
  PopUpContainer,
  PlayAgainButton,
  RulesImg,
  RulesButton,
  RulesContainer,
  OneItem,
  Person,
  ScoreValueContainer,
  EachItem,
  ImageElement,
  CloseButton,
  ResultView,
  ResultContainer,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const EachGameItem = props => {
  const {item, clicked} = props
  const {id, imageUrl} = item
  let value
  switch (id) {
    case 'ROCK':
      value = 'rockButton'
      break
    case 'SCISSORS':
      value = 'scissorsButton'
      break
    case 'PAPER':
      value = 'paperButton'
      break
    default:
      break
  }

  const onClicked = () => {
    clicked(id)
    console.log(value)
  }
  return (
    <EachItem data-testid={value} type="button" onClick={onClicked}>
      <ImageElement src={imageUrl} alt={id} />
    </EachItem>
  )
}

class Game extends Component {
  state = {
    itemClicked: false,
    score: 0,
    random: choicesList[0],
    selected: choicesList[0],
  }

  clicked = id => {
    const {score} = this.state
    const selectedItem = choicesList.find(each => each.id === id)
    const r = Math.ceil(Math.random() * choicesList.length - 1)
    console.log(r)
    const randomItem = choicesList[r]
    console.log(selectedItem.id)
    console.log(randomItem.id)
    let result
    let newScore
    if (id === 'ROCK') {
      switch (randomItem.id) {
        case 'PAPER':
          result = 'YOU LOSE'
          newScore = score - 1
          break
        case 'SCISSORS':
          result = 'YOU WON'
          newScore = score + 1
          break
        default:
          result = 'IT IS DRAW'
          newScore = score
          break
      }
    }
    if (id === 'PAPER') {
      switch (randomItem.id) {
        case 'ROCK':
          result = 'YOU WON'
          newScore = score + 1
          break
        case 'SCISSORS':
          result = 'YOU LOSE'
          newScore = score - 1
          break
        default:
          result = 'IT IS DRAW'
          newScore = score
          break
      }
    }
    if (id === 'SCISSORS') {
      switch (randomItem.id) {
        case 'PAPER':
          result = 'YOU WON'
          newScore = score + 1
          break
        case 'ROCK':
          result = 'YOU LOSE'
          newScore = score - 1
          break
        default:
          result = 'IT IS DRAW'
          newScore = score
          break
      }
    }
    this.setState({
      itemClicked: true,
      random: randomItem,
      selected: selectedItem,
      result,
      score: newScore,
    })
  }

  playAgain = () => {
    this.setState({itemClicked: false})
  }

  render() {
    const {itemClicked, score, random, selected, result} = this.state
    return (
      <Container>
        <ScoreContainer>
          <div>
            <Heading>Rock Paper Scissors</Heading>
          </div>
          <ScoreValueContainer>
            <ScorePara inside>Score</ScorePara>
            <Score>{score}</Score>
          </ScoreValueContainer>
        </ScoreContainer>
        {itemClicked ? (
          <GameResultView
            selected={selected}
            random={random}
            result={result}
            playAgain={this.playAgain}
          />
        ) : (
          <PlayingView>
            {choicesList.map(each => (
              <EachGameItem item={each} key={each.id} clicked={this.clicked} />
            ))}
          </PlayingView>
        )}
        <RulesContainer>
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <RulesButton type="button" className="trigger-button">
                  Rules
                </RulesButton>
              }
            >
              {close => (
                <>
                  <PopUpContainer>
                    <CloseButton
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      .<RiCloseLine />
                    </CloseButton>
                    <RulesImg
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                    />
                  </PopUpContainer>
                </>
              )}
            </Popup>
          </div>
        </RulesContainer>
      </Container>
    )
  }
}

export default Game
