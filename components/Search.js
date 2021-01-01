import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import * as React from "react";
import axios from "axios";

const SearchBar = () => {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const fetchMovieData = () => {
    axios
      .get(`http://www.omdbapi.com/?t=dark+knight&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`)
      .then((res) => {
        console.log(res);
      });
  };

  React.useEffect(() => {
      fetchMovieData()
  }, [value]);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input onChange={handleChange} type="text" placeholder="Search OMDB" />
    </InputGroup>
  );
};

export default SearchBar;
