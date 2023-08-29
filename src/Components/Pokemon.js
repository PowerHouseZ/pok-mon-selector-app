import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Pokémons.css";

const Pokémons = () => {
  const [num, setNum] = useState(1);
  const [name, setName] = useState("");
  const [moves, setMoves] = useState(0);
  const [sprite, setSprite] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
        setName(res.data.name);
        setMoves(res.data.moves.length);
        setSprite(res.data.sprites.front_default);

        const speciesResponse = await axios.get(res.data.species.url);
        const englishEntry = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setBio(englishEntry.flavor_text);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [num]);

  return (
    <div
      className="pokemon-container"
      style={{ background: "blue", height: "auto", width: "auto" }}
    >
      <div className="pokemon-content">
        <h1 className="pokemon-title">Pokémon Selector</h1>
        <div
          className="pokemon-info"
          style={{ background: "yellow", height: "auto", width: "auto" }}
        >
          <h2>
            You chose Pokémon number:{" "}
            <span className="pokemon-number">{num}</span>
          </h2>
          <h2>
            You've welcomed <span className="pokemon-name">{name}</span> into
            your party.
          </h2>
          <h2>
            <span className="pokemon-ability">{name}</span> has{" "}
            <span className="pokemon-moves">{moves} abilities.</span>
          </h2>
        </div>
        <select
          className="pokemon-dropdown"
          value={num}
          onChange={(event) => {
            setNum(event.target.value);
          }}
        >
          {Array.from({ length: 898 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        {sprite && (
          <div className="pokemon-picture">
            <img src={sprite} alt={`Sprite of ${name}`} />
          </div>
        )}
        {bio && <p className="pokemon-bio">{bio}</p>}
      </div>
    </div>
  );
};

export default Pokémons;
