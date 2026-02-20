import React, { useEffect, useState } from "react";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";

import { Player } from "./CustomTypes";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function SearchPlayer() {
  const [searchInput, setSearchInput] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}v2/api/players/`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();
        const player_data = backendData.players;
        setPlayers(player_data);
        console.log(players);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSelectItem = (item: Player) => {
    setSearchInput("");
    navigate(`/profile/${encodeURIComponent(String(item.name))}`);
  };

  const filteredItems = players.filter((playerList) =>
    playerList.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setOpen(true); //Keep dropdown open while typing
  };

  return (
    <span style={{ marginTop: "15px", maxWidth: "200px", minWidth: "150px" }}>
      <Dropdown show={open} onToggle={(isOpen) => setOpen(isOpen)}>
        <InputGroup>
          <FormControl
            placeholder="Search Players..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filteredItems.length > 0 || filteredItems === undefined ? (
            filteredItems.map((item) => (
              <Dropdown.Item
                key={item.id}
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No Players Found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </span>
  );
}

export default SearchPlayer;
