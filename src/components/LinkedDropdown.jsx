import { useState } from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import data from "./Data/useList";

function LinkedDropdown() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [village, setVillage] = useState("");

  const uniqueCountries = [...new Set(data.map((item) => item.Country))];
  const filteredStates = country
    ? [
        ...new Set(
          data
            .filter((item) => item.Country === country)
            .map((item) => item.State)
        ),
      ]
    : [];
  const filteredDistricts = state
    ? [
        ...new Set(
          data
            .filter((item) => item.State === state && item.Country === country)
            .map((item) => item.District)
        ),
      ]
    : [];
  const filteredSubDistricts = district
    ? [
        ...new Set(
          data
            .filter(
              (item) => item.District === district && item.State === state
            )
            .map((item) => item["Sub District"])
        ),
      ]
    : [];
  const filteredVillages = subDistrict
    ? data
        .filter(
          (item) =>
            item["Sub District"] === subDistrict && item.District === district
        )
        .map((item) => item.Village)
    : [];

  return (
    <div style={{ width: "320px" }}>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          label="Country"
          onChange={(event) => setCountry(event.target.value)}
        >
          {uniqueCountries.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {country && (
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={state}
            label="State"
            onChange={(event) => setState(event.target.value)}
          >
            {filteredStates.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {state && (
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel>District</InputLabel>
          <Select
            value={district}
            label="District"
            onChange={(event) => setDistrict(event.target.value)}
          >
            {filteredDistricts.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {district && (
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel>Sub District</InputLabel>
          <Select
            value={subDistrict}
            label="Sub District"
            onChange={(event) => setSubDistrict(event.target.value)}
          >
            {filteredSubDistricts.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {subDistrict && (
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel>Village</InputLabel>
          <Select
            value={village}
            label="Village"
            onChange={(event) => setVillage(event.target.value)}
            MenuProps={{
              classes: { paper: "hide-scrollbar" },
            }}
          >
            {filteredVillages.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default LinkedDropdown;
