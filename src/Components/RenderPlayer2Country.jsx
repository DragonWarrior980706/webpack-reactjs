import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import flag from '../img/flags/default-flag.png';

function RenderPlayer2Country(props) {
  const
    [countryP1, updateCountryP1] = useState(''),
    [countryP2, updateCountryP2] = useState(''),
    [swapPlace, updateSwapPlace] = useState(true),
    socket = io.connect(props.mode);

  const renderCountryOfPlayer = (cP1, cP2) => {
    if (swapPlace) {
      if (cP2 === '' || cP2 === 'Player-2' || cP2 === undefined) {
        return <img className="img-p2 default-flag" src={`${flag}`} alt="flag" />
      }
      return (
        <img className="img-p2" src={`${cP2}`} alt="Country flag P2" />
      )
    }
    else if (swapPlace === false) {
      if (cP1 === '' || cP1 === 'Player-1' || cP1 === undefined) {
        return <img className="img-p1 swaped" src={`${flag}`} alt="flag" />
      }
      return (
        <img className="img-p1 swaped" src={`${cP1}`} alt="Country flag P1" />
      )
    }
  }


  useEffect(() => {
    socket.on("swap-place", (swap) => {
      updateSwapPlace(swap)
    })

    socket.on("player1country", (country) => {
      updateCountryP1(country)
    })

    socket.on("player2country", (country) => {
      updateCountryP2(country)
    })
  }, []);

  return (
    <div className="P2-country">
      {/* <div className="shape hex"> */}
        {renderCountryOfPlayer(countryP1, countryP2)}
      {/* </div> */}
    </div>
  );
}

export default RenderPlayer2Country;