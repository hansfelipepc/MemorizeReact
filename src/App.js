import React, { Component } from 'react';
import Header from './Header';
import Board from './Board';
import './App.css';
import swal from 'sweetalert2'
import buildDeck from './utils/buildDeck';

const getInitialState = () => {
    const deck = buildDeck();
    return {
        deck,
        selectedPair: [],
        isComparing: false,
        attemptNum: 0
    }
};
class App extends Component {
  constructor(props){
      super(props);
      this.state = getInitialState();
  }

  render() {
    return (
      <div className="App">
        <Header
            attemptNum={this.state.attemptNum}
            resetGame={()=>this.resetGame()}
        />
        <Board
            deck={this.state.deck}
            selectedPair={this.state.selectedPair}
            selectCard={(card) => this.selectCard(card)}
        />
      </div>
    );
  }
  selectCard(card){
      if(
          this.state.isComparing ||
          this.state.selectedPair.indexOf(card) > -1 ||
          card.wasGuessed
      ){
        return;
      }
      const selectedPair = [...this.state.selectedPair, card];
      this.setState({
          selectedPair
      });
      if(selectedPair.length === 2){
          this.comparePair(selectedPair);
      }
  }
  comparePair(selectedPair){
      this.setState({isComparing: true});
      setTimeout(()=>{
          const [firstCard, secondCard] = selectedPair;
          let deck = this.state.deck;
          if(firstCard.icon === secondCard.icon){
              deck = deck.map((card)=>{
                  if(card.icon !== firstCard.icon){
                      return card;
                  }
                  return {...card, wasGuessed:true}
              });
          }
          this.verifyIfWinner(deck);
          this.setState({
              selectedPair: [],
              deck,
              isComparing: false,
              attemptNum: this.state.attemptNum + 1
          })
      }, 1000)
  }
  verifyIfWinner(deck){
      if(
          deck.filter((card)=> !card.wasGuessed).length === 0
      ){
          swal(
              'Good job!',
              `You won in ${this.state.attemptNum +1} attempts`,
              'success'
          );
      }
  }
  resetGame(){
      this.setState(
          getInitialState()
      );
  }

}

export default App;
